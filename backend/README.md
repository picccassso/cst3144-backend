# After School Classes - Backend API

Backend REST API for the After School Classes application built with **Express.js** and **MongoDB**.

## Tech Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Native MongoDB Driver** - Database connection (no Mongoose)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB
Follow the instructions in [MONGODB_SETUP.md](MONGODB_SETUP.md) to:
- Create MongoDB Atlas account
- Set up database cluster
- Get connection string

### 3. Environment Variables
Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=3000
```

See `.env.example` for template.

### 4. Start Server
Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Root
- **GET** `/` - API information

### Health Check
- **GET** `/health` - Server and database status

### Images (Static Files)
- **GET** `/images/:filename` - Serve lesson images
- Returns 404 JSON if image not found

## Middleware

### 1. Logger Middleware
Logs all HTTP requests to console:
```
[2024-01-15T10:30:00.000Z] GET /lessons - IP: ::1
[2024-01-15T10:30:00.000Z] GET /lessons - Status: 200
```

### 2. Static File Middleware
Serves images from `public/images/` directory:
- Success: Returns image file
- Failure: Returns 404 JSON error message

### 3. CORS
Allows cross-origin requests from frontend

### 4. JSON Parser
Parses incoming JSON request bodies

## Testing

### Test Logger Middleware
```bash
curl http://localhost:3000/
```
Check console for log output

### Test Static File Middleware
Existing image:
```bash
curl http://localhost:3000/images/math.jpg
```

Non-existent image:
```bash
curl http://localhost:3000/images/notfound.jpg
```
Should return JSON error

### Test MongoDB Connection
```bash
curl http://localhost:3000/health
```

## Project Structure
```
backend/
├── server.js           # Main Express server
├── package.json        # Dependencies
├── .env               # Environment variables (not committed)
├── .env.example       # Environment template
├── .gitignore         # Git ignore rules
├── MONGODB_SETUP.md   # MongoDB setup guide
├── data/
│   └── lessons.json   # Sample lesson data
└── public/
    └── images/        # Lesson images
        └── README.md
```

## MongoDB Collections

### `lessons`
```json
{
    "subject": "Math",
    "location": "London",
    "price": 100,
    "spaces": 5,
    "image": "math.jpg"
}
```

### `orders`
```json
{
    "name": "John Doe",
    "phone": "1234567890",
    "lessonIDs": ["ObjectId1", "ObjectId2"],
    "numberOfSpaces": 2,
    "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Next Steps
- Phase 5: Add GET `/lessons` endpoint
- Phase 6: Add POST `/orders` endpoint
- Phase 7: Add PUT `/lessons/:id` endpoint
- Phase 8: Connect frontend to backend
- Phase 9: Deploy to Render.com or AWS Lambda

## Requirements Compliance
✅ Using **Express.js** (required)
✅ Using **Native MongoDB Driver** (no Mongoose)
✅ Using **MongoDB Atlas** (cloud database)
✅ Using **Node.js** server (not Apache/XAMPP)
✅ Logger middleware implemented
✅ Static file middleware implemented

## Notes
- Following CST3144 module requirements exactly
- Ready for REST API implementation
- Middleware fully functional and testable
