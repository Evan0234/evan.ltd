// server.js (for evan.ltd)

// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Simple verification route for evan.ltd
app.get('/', (req, res) => {
    const verifyCookie = req.cookies.verify_cookie;

    if (!verifyCookie) {
        // If the verify_cookie is not found, redirect back to auth.evan.ltd
        return res.redirect('https://auth.evan.ltd');
    }

    // Here you could have a more advanced verification mechanism for the token
    if (verifyCookie.length !== 50) {
        // If the cookie is invalid, redirect back to the verification page
        return res.redirect('https://auth.evan.ltd');
    }

    // If the cookie is valid, proceed to the main page
    res.send('<h1>Welcome to Evan Ltd!</h1>');
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
