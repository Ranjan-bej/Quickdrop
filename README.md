# QuickDrop

QuickDrop is a simple and efficient file sharing application that allows users to upload files and retrieve them using a unique code. Files are automatically deleted after 7 hours to ensure privacy and strict storage management.

## Features

- **File Upload**: Easily upload files to the server.
- **Code Generation**: Get a unique code for each uploaded file.
- **File Retrieval**: Download files using the generated code.
- **Automatic Expiry**: Files and their metadata are automatically deleted 7 hours after upload.
  - **Database Cleanup**: MongoDB TTL index handles metadata deletion.
  - **Storage Cleanup**: A cron job runs hourly to remove physical files from the server.

## Tech Stack

### Frontend
- **React** (Vite)
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Axios** for API requests

### Backend
- **Node.js** & **Express**
- **MongoDB** (Mongoose) for database
- **Busboy** for handling file uploads
- **Node-Cron** for scheduled cleanup tasks

## Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas connection string)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd quickdrop-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `quickdrop-backend` directory and add your variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   BACKENDURL=http://localhost:3000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd quickdrop-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the frontend application in your browser.
2. Upload a file to receive a unique download code.
3. Share the code with anyone who needs the file.
4. Enter the code in the "Download" section to retrieve the file.
5. The file will expire and be deleted after 7 hours.
