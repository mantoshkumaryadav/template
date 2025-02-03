const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // To use environment variables

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allow frontend to connect to backend
app.use(bodyParser.json()); // Parse incoming JSON requests

// Load API Key from environment variable
const COHERE_API_KEY = process.env.COHERE_API_KEY; // Store API key in .env file
const COHERE_MODEL_URL = 'https://api.cohere.ai/generate';

// Endpoint to generate template
app.post('/generate', async (req, res) => {
    const { goal, tone, templateType } = req.body;

    if (!goal || !tone || !templateType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = `Create a ${templateType} template for the goal '${goal}' with a tone of '${tone}'.`;

    try {
        const response = await axios.post(
            COHERE_MODEL_URL,
            {
                prompt: prompt,
                model: 'xlarge',
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${COHERE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const generatedText = response.data.generations[0].text; // Corrected data structure

        res.json({ template: generatedText });
    } catch (error) {
        console.error('Error generating template:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate template' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
