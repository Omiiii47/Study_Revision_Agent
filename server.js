const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import fetch for Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '' || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.error('❌ GEMINI_API_KEY environment variable is required');
    console.error('Please check your .env file and ensure it contains a valid Gemini API key');
    process.exit(1);
}

console.log('✅ Gemini API key loaded successfully');

// Gemini API proxy endpoint
app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API Error:', response.status, errorData);
            return res.status(response.status).json({ 
                error: `Gemini API Error: ${response.status} ${response.statusText}` 
            });
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            return res.status(500).json({ error: 'Invalid response from Gemini API' });
        }

        const generatedText = data.candidates[0].content.parts[0].text;
        res.json({ response: generatedText });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'AI Revision Assistant Backend is running' });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ai-revision-assistant.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 AI Revision Assistant Backend running on http://localhost:${PORT}`);
    console.log(`📝 Frontend available at http://localhost:${PORT}`);
});
