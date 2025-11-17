const express = require("express");
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ------------------------
// AWS CONFIG
// ------------------------
AWS.config.update({
  region: "us-east-2",   // Use your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE = "CookrUsers";

// ------------------------
// TEST ROUTE
// ------------------------
app.get("/", (req, res) => {
  res.send("Cookr Backend Running 🚀");
});

// ------------------------
// CREATE USER
// ------------------------
app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, phone, username, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const params = {
      TableName: TABLE,
      Item: {
        userId,
        fullName,
        email,
        phone,
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      }
    };

    await dynamoDB.put(params).promise();

    res.json({ message: "User created", userId });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// ------------------------
// LOGIN
// ------------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const params = {
      TableName: TABLE,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email
      }
    };

    const result = await dynamoDB.query(params).promise();
    const user = result.Items[0];

    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({ userId: user.userId }, "cookr_secret", {
      expiresIn: "7d"
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// ------------------------
// START SERVER
// ------------------------
app.listen(5000, () => console.log("🚀 Cookr backend running on port 5000"));
