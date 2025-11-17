const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Cookr backend running on port ${PORT}`));
