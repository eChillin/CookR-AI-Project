// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure OpenAI (using environment variable)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST endpoint for recipe suggestions
app.post("/api/recipe", async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: "No ingredients provided" });
        }

        const prompt = `Given these ingredients: ${ingredients}.
    Suggest a recipe in clear step-by-step instructions under 200 words.`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 275,
        });

        const recipe = response.choices[0].message.content;
        res.json({ recipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate recipe" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
