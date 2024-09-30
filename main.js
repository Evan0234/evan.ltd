// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOQKCzqkdDMlLdIpoUyd9Nnd-Z21vuZho",
    authDomain: "evanltd1.firebaseapp.com",
    projectId: "evanltd1",
    storageBucket: "evanltd1.appspot.com",
    messagingSenderId: "700870615513",
    appId: "1:700870615513:web:16d8e42ad88c1b89d7b9c8",
    measurementId: "G-P5NMF5Z2N3"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully.");
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to validate the token in Firestore
async function validateToken(token) {
    const db = firebase.firestore();
    try {
        const doc = await db.collection('verify_tokens').doc(token).get();
        const exists = doc.exists;
        console.log(`Token validation for ${token}: ${exists}`);
        return exists;  // Returns true if the token exists in Firestore
    } catch (error) {
        console.error("Error checking token in Firestore:", error);
        return false;  // Return false if there's an error
    }
}

// Main function for token verification
async function handleTokenVerification() {
    console.log("Starting token verification process...");

    const tokenFromCookie = getCookie('verify_token'); // Ensure consistency
    console.log(`Checking token from cookie: ${tokenFromCookie}`);

    if (tokenFromCookie) {
        const isValid = await validateToken(tokenFromCookie);
        if (isValid) {
            console.log('Valid token found, user is authenticated.');
            // User is authenticated, do nothing or display user content
        } else {
            console.log('Invalid token found. Redirecting to auth.evan.ltd...');
            window.location.href = 'https://auth.evan.ltd';  // Redirect back to auth.evan.ltd
        }
    } else {
        console.log('No token found in cookie. Redirecting to auth.evan.ltd...');
        window.location.href = 'https://auth.evan.ltd';  // Redirect to auth.evan.ltd
    }
}

// Trigger token verification on page load
window.onload = handleTokenVerification;
