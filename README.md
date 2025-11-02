# Campaign Spark 🎯

A lightweight, swipe-based campaign idea generator for B2B marketers. Answer a short quiz and get instant, personalized campaign ideas.

## Features

- **5-Question Diagnostic Quiz** - Quick assessment of your marketing needs
- **Swipeable Campaign Cards** - Tinder-like UX for browsing ideas
- **AI-Powered Generation** - Optional OpenAI integration for custom campaigns
- **Export Options** - Copy campaign ideas to clipboard
- **Mobile-First Design** - Dark mode, minimalist interface
- **No Login Required** - Works immediately, no signup needed

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Environment Variables (Optional)

Create a `.env` file with:

```
VITE_OPENAI_API_KEY=your_key_here
VITE_MEETING_URL=https://meetings.hubspot.com/stanislas-berteloot (optional - defaults to HubSpot link)
```

## Features

### Quiz
- 5 multiple-choice questions about your marketing goals
- Progress tracking
- Smooth transitions

### Campaign Cards
- Swipe right to save
- Swipe left to skip
- Tap to expand and see full details
- Copy to clipboard

### AI Integration
- Generate new campaign ideas on-demand
- Uses GPT-4o for personalized suggestions
- Falls back gracefully if API key not set

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- OpenAI API (optional)

