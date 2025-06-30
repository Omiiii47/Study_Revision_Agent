# AI Revision Assistant

A secure, full-stack AI-powered study companion that helps with exam preparation through study planning, quiz generation, and note summarization using Google's Gemini AI.

## Features

- 📚 **AI Study Planner**: Generate personalized study schedules based on your exam date and weak topics
- 🧠 **Quiz Generator**: Create custom quizzes with multiple difficulty levels
- 📝 **Notes Summarizer**: Transform your notes into key points, brief summaries, or flashcards
- 📊 **Progress Tracker**: Monitor your study progress and quiz performance
- 🔒 **Secure API Integration**: API keys are stored securely on the backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Install dependencies**:
   ```cmd
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env`:
     ```cmd
     copy .env.example .env
     ```
   - Edit `.env` and add your Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```

3. **Start the server**:
   ```cmd
   npm start
   ```

4. **Open your browser** and go to: http://localhost:3000

### Development Mode

For development with auto-restart:
```cmd
npm run dev
```

## Architecture

- **Frontend**: Single-page HTML application with modular design
- **Backend**: Express.js server that securely handles API requests
- **Security**: API keys are stored server-side and never exposed to the client

## API Endpoints

- `GET /`: Serves the main application
- `GET /api/health`: Backend health check
- `POST /api/gemini`: Proxies requests to Gemini AI (requires prompt in body)

## Usage

1. **Study Planner**: Enter your subject, exam date, weak topics, and daily study hours
2. **Quiz Generator**: Select a topic, difficulty level, and number of questions
3. **Notes Summarizer**: Paste your notes and choose a summary type
4. **Progress Tracker**: View your study statistics and reset progress if needed

## Security Features

- API keys are never exposed to the frontend
- All AI requests are proxied through the secure backend
- CORS protection and request validation
- Environment variable configuration

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - see LICENSE file for details
