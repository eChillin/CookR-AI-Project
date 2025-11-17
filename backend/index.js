require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// AWS CONFIG
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = "CookrUsers";


// ======================================================================
// SIGNUP REQUEST (CREATE USER + SEND 6 DIGIT VERIFICATION CODE)
// ======================================================================
app.post("/signup/request", async (req, res) => {
  const { email, fullName, phone, username, password } = req.body;

  if (!email || !fullName || !phone || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const newUser = {
    userId: email, // PRIMARY KEY
    fullName,
    phone,
    username,
    password,
    verified: false,
    verifyCode: code,
    createdAt: Date.now()
  };

  try {
    await dynamo
      .put({
        TableName: TABLE,
        Item: newUser,
        ConditionExpression: "attribute_not_exists(userId)"
      })
      .promise();

    console.log(`Signup code for ${email}: ${code}`);
    res.json({ success: true, message: "Verification code sent" });

  } catch (err) {
    if (err.code === "ConditionalCheckFailedException") {
      return res.status(400).json({ error: "User already exists" });
    }
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Could not create user" });
  }
});


// ======================================================================
// VERIFY SIGNUP CODE
// ======================================================================
app.post("/signup/verify", async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await dynamo
      .get({
        TableName: TABLE,
        Key: { userId: email }
      })
      .promise();

    if (!result.Item)
      return res.status(404).json({ error: "User not found" });

    if (result.Item.verifyCode !== code)
      return res.status(400).json({ error: "Incorrect verification code" });

    await dynamo
      .update({
        TableName: TABLE,
        Key: { userId: email },
        UpdateExpression: "SET verified = :v REMOVE verifyCode",
        ExpressionAttributeValues: { ":v": true }
      })
      .promise();

    res.json({ success: true });

  } catch (err) {
    console.error("Verify Signup Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ======================================================================
// LOGIN
// ======================================================================
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await dynamo
      .get({
        TableName: TABLE,
        Key: { userId: email }
      })
      .promise();

    if (!result.Item)
      return res.status(404).json({ error: "User does not exist" });

    if (!result.Item.verified)
      return res.status(400).json({ error: "User not verified" });

    if (result.Item.password !== password)
      return res.status(400).json({ error: "Incorrect password" });

    res.json({ success: true });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ======================================================================
// FORGOT PASSWORD — SEND RESET CODE
// ======================================================================
app.post("/auth/send-reset", async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ error: "Email is required" });

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await dynamo
      .update({
        TableName: TABLE,
        Key: { userId: email },
        UpdateExpression: "SET resetCode = :c",
        ExpressionAttributeValues: { ":c": resetCode }
      })
      .promise();

    console.log(`Reset code for ${email}: ${resetCode}`);

    res.json({ success: true, message: "Reset code sent" });

  } catch (err) {
    if (err.code === "ValidationException")
      return res.status(404).json({ error: "User not found" });

    console.error("Send Reset Error:", err);
    res.status(500).json({ error: "Failed to send code" });
  }
});


// ======================================================================
// VERIFY RESET CODE
// ======================================================================
app.post("/auth/verify-reset", async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await dynamo
      .get({
        TableName: TABLE,
        Key: { userId: email }
      })
      .promise();

    if (!result.Item)
      return res.status(404).json({ error: "User not found" });

    if (result.Item.resetCode !== code)
      return res.status(400).json({ error: "Incorrect reset code" });

    res.json({ success: true });

  } catch (err) {
    console.error("Verify Reset Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ======================================================================
// RESET PASSWORD
// ======================================================================
app.post("/auth/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    await dynamo
      .update({
        TableName: TABLE,
        Key: { userId: email },
        UpdateExpression: "SET password = :p REMOVE resetCode",
        ExpressionAttributeValues: { ":p": newPassword }
      })
      .promise();

    res.json({ success: true });

  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ======================================================================
// FORGOT USERNAME — SEARCH BY PHONE
// ======================================================================
app.post("/auth/forgot-username", async (req, res) => {
  const { phone } = req.body;

  if (!phone)
    return res.status(400).json({ error: "Phone is required" });

  try {
    const result = await dynamo
      .scan({
        TableName: TABLE,
        FilterExpression: "phone = :p",
        ExpressionAttributeValues: { ":p": phone }
      })
      .promise();

    if (result.Items.length === 0)
      return res.status(404).json({ error: "No account found" });

    res.json({ success: true, username: result.Items[0].username });

  } catch (err) {
    console.error("Forgot Username Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ======================================================================
// START SERVER
// ======================================================================
app.listen(4000, () => {
  console.log("Cookr backend running on port 4000");
});
