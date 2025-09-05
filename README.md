# Blue Carbon MRV Prototype

A prototype application for Blue Carbon Monitoring, Reporting, and Verification (MRV) system that uses AI to analyze coastal areas and estimate carbon credits.

## Features

- **AI-Powered Analysis**: Upload images of coastal areas to get AI analysis of mangrove coverage and carbon credit estimates
- **Project Management**: Submit and track blue carbon projects
- **Admin Dashboard**: Review and approve projects for carbon credit minting
- **Wallet Integration**: Connect wallet for blockchain transactions
- **Real-time Updates**: Track project status and minted credits

## Prerequisites

- Node.js (version 16 or higher)
- Google Gemini API key

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   
   **Important:** Replace `your_actual_gemini_api_key_here` with your real API key from: https://makersuite.google.com/app/apikey
   
   **Troubleshooting:** If you get a 403 error when using AI analysis, make sure:
   - Your API key is valid and active
   - The `.env.local` file is in the root directory (same level as package.json)
   - You've restarted the development server after adding the API key

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   **Alternative (Windows):** Double-click `start-dev.bat` to automatically stop any existing processes and start the server.

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

**Troubleshooting Port Issues:**
- If you get port conflicts, the `start-dev.bat` script will automatically kill existing Node.js processes
- The server is configured to use port 3000 strictly - if it's busy, kill the process using the script

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Icons**: Custom SVG components

## Project Structure

```
├── components/          # React components
├── types.ts            # TypeScript type definitions
├── constants.ts        # Application constants
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── vite.config.ts     # Vite configuration
```

## Usage

1. **Client View**: Upload project images, get AI analysis, and submit projects for approval
2. **Admin View**: Review submitted projects and approve them to mint carbon credits
3. **Wallet Connection**: Connect your wallet to interact with the blockchain

## Note

This is a prototype application for demonstration purposes only.
# Blockchain-Blue-Carbon-Prototype
