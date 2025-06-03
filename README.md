# Compare Texts

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0.0-orange)](https://bun.sh/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)

Built as a final exam project for 2025, this tool helps users identify, visualize, and manage text comparisons with features like difference highlighting, PDF export, and secure storage.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Security](#security)

## Features

- ✨ Compare two text inputs with real-time difference visualization
- 🎨 Highlight added (green) and removed (red) text
- 💾 Save and load comparisons from database
- 📄 Export comparisons to PDF
- 🔒 Secure data storage with encryption
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **TypeScript**: For type-safe code
- **Bun**: JavaScript runtime and package manager
- **diff**: Library for text comparison and difference highlighting
- **html2pdf.js**: For PDF export functionality
- **CSS**: For styling and layout

### Backend
- **Bun**: Runtime environment
- **Express**: Web framework for handling HTTP requests
- **MongoDB**: NoSQL database for storing text comparisons
- **Mongoose**: MongoDB object modeling tool
- **CryptoJS**: For data encryption

## Project Structure

```
src/
├── components/           # React components
│   ├── TextInput.tsx    # Text input component
│   ├── DiffView.tsx     # Text comparison visualization
│   └── SavedComparisons.tsx  # Saved comparisons list
├── services/            # API services
│   └── api.ts          # API client
├── backend/            # Backend server
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions (encryption, etc.)
├── types/              # TypeScript type definitions
└── TextComparator.tsx  # Main application component
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ENCRYPTION_KEY=your_encryption_key
   ```
4. Start the backend server:
   ```bash
   bun run server
   ```
5. Start the frontend development server:
   ```bash
   bun dev
   ```
6. Open http://localhost:3000 in your browser

## How It Works

### Text Comparison
1. Users enter two texts in the input fields
2. The application uses the `diff` library to compare the texts
3. Differences are highlighted:
   - Added text: Green background
   - Removed text: Red background
   - Unchanged text: Normal styling

### Managing Comparisons
1. Save comparisons to the database with encryption
2. View and load saved comparisons
3. Delete unwanted comparisons
4. Export comparisons to PDF

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/comparisons` | Get all saved comparisons |
| POST   | `/api/comparisons` | Create a new comparison |
| DELETE | `/api/comparisons/:id` | Delete a comparison |

## Development

The project uses Bun as the JavaScript runtime and package manager. Key development commands:

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with hot reloading |
| `bun run server` | Start backend server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |

## Security

- 🔐 All stored text comparisons are encrypted using CryptoJS
- 🔑 Environment variables for sensitive configuration
- 🛡️ Protected API endpoints with proper error handling
- 🚫 XSS Prevention:
  - Input sanitization for all text fields
  - HTML tag stripping
  - Removal of dangerous JavaScript protocols
  - Removal of event handlers
  - Special character escaping
  - Real-time sanitization