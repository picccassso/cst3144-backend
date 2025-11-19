// Express.js Backend Server
// This will be implemented in later phases

const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Placeholder route
app.get('/', (req, res) => {
    res.send('After School Classes API - Coming Soon');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
