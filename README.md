## About the project

The app is a video streaming service 'clone', simulating an application that could be used to watch selected movies. It utilises a pre-trained LLM model provided through Hugging Face, available at microsoft/DialoGPT-medium, to provide an AI chatbot interface that can be perform tasks such as suggesting movies or providing additional information about a genre. The app is built primarily using React, Node.js and Python, and uses a MongoDB database to provide log-in functionality.

## Getting Started

### First, run the development server:
```bash
cd mj-entertainment/itemo-frontend
npm i
npm run dev
```

### To set up the back-end:
```bash
cd mj-entertainment/itemo-backend
npm i 
node server.js
```

### To set up the chatbot:
```bash
cd mj-entertainment/Mj-ai-chatbot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

