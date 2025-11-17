const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { putUser, getUserByEmail, updateUser } = require('../services/dynamo');
const sendVerificationEmail = require('../services/email');
const generateCode = require('../utils/generateCode');

/**
 * SIGNUP - Step 1 (Email Only)
 */
router.post('/start-signup', async (req, res) => {
    const { email } = req.body;

    const existing = await getUserByEmail(email);
    if (existing) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    return res.json({ message: 'Proceed to signup details' });
});


/**
 * SIGNUP - Step 2 (Full Details)
 */
router.post('/complete-signup', async (req, res) => {
    const { fullName, phone, email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const verificationCode = generateCode();

    const user = {
        userId,
        fullName,
        phone,
        email,
        username,
        password: hashedPassword,
        verified: false,
        verificationCode,
    };

    await putUser(user);

    // Send the verification code
    await sendVerificationEmail(email, verificationCode);

    return res.json({ message: 'Account created. Verification code sent.', userId });
});


/**
 * VERIFY CODE
 */
router.post('/verify', async (req, res) => {
    const { userId, code } = req.body;

    const user = await getUserByEmail(userId, true);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.verificationCode !== code) {
        return res.status(400).json({ message: 'Wrong code' });
    }

    await updateUser(userId, { verified: true });

    return res.json({ message: 'Verification successful' });
});


/**
 * LOGIN
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) return res.status(400).json({ message: 'Wrong password' });

    return res.json({ message: 'Login successful', user });
});

module.exports = router;
