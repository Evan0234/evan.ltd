// server.js

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(cookieParser());

// Serve static files (like HTML, CSS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle the verification
app.get('/', (req, res) => {
    const verifyCookie = req.cookies.verify_cookie;

    // Check if the verify_cookie is set
    if (!verifyCookie) {
        return res.redirect('https://auth.evan.ltd');
    }

    // Basic validation of the cookie (it should be exactly 50 characters long)
    if (verifyCookie.length !== 50) {
        return res.redirect('https://auth.evan.ltd');
    }

    // If cookie is valid, send the main content
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
