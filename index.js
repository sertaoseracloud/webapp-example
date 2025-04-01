const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Hello, Azure Web App!');
});

// Example API route
app.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example API endpoint.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});