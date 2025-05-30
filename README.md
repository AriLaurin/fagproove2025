# Compare Texts

A web-app project for my final exam 2025

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

## Features

- Compare two text inputs and visualize differences
- Highlight added and removed text
- Save comparisons to database
- Load saved comparisons
- Delete saved comparisons
- Export comparisons to PDF
- Responsive design
- Secure data storage with encryption

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

## How It Works

### Text Comparison
1. Users enter two texts in the input fields
2. The application uses the `diff` library to compare the texts
3. Differences are highlighted:
   - Added text: Green background
   - Removed text: Red background
   - Unchanged text: Normal styling

### Saving Comparisons
1. Users can save their comparisons to the database
2. Each comparison stores:
   - Original text
   - Compared text
   - Creation timestamp
   - Encrypted data for security

### Managing Saved Comparisons
1. Users can view all saved comparisons
2. Click on a saved comparison to load it into the input fields
3. Delete unwanted comparisons
4. Export comparisons to PDF

## API Endpoints

- `GET /api/comparisons`: Get all saved comparisons
- `POST /api/comparisons`: Create a new comparison
- `DELETE /api/comparisons/:id`: Delete a comparison

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Start the backend server:
   ```bash
   bun run server
   ```
4. Start the frontend development server:
   ```bash
   bun dev
   ```
5. Open http://localhost:3000 in your browser

## Environment Variables

Create a `.env` file in the root directory with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
ENCRYPTION_KEY=your_encryption_key
```

## Development

The project uses Bun as the JavaScript runtime and package manager. Key development commands:

- `bun dev`: Start development server with hot reloading
- `bun run server`: Start backend server
- `bun run build`: Build for production
- `bun run start`: Start production server

## Security

- All stored text comparisons are encrypted using CryptoJS
- Environment variables are used for sensitive configuration
- API endpoints are protected with proper error handling
- XSS Prevention:
  - Input sanitization for all text fields
  - HTML tag stripping
  - Removal of dangerous JavaScript protocols (javascript:, data:, vbscript:)
  - Removal of event handlers (on* attributes)
  - Special character escaping (&, <, >, ", ', /)
  - Real-time sanitization as users type