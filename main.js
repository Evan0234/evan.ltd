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
    alert('Firebase initialization failed.');
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
        return doc.exists;  // Returns true if the token exists in Firestore
    } catch (error) {
        console.error("Error checking token in Firestore:", error);
        return false;  // Return false if there's an error
    }
}

// Main function for token validation
async function handleTokenValidation() {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = window.location.pathname.split('/').pop(); // Get the token from the URL path
    const cookieToken = getCookie('verify_cookie'); // Get the token from cookie

    console.log(`Token from URL: ${tokenFromUrl}`);
    console.log(`Token from cookie: ${cookieToken}`);

    // Check if token is valid
    if (tokenFromUrl && (tokenFromUrl === cookieToken)) {
        // Validate the token in Firestore
        const isValid = await validateToken(tokenFromUrl);
        
        if (isValid) {
            console.log('Token is valid. User is authorized.');
            // Do nothing, stay on the page
            return;
        }
    }

    // If token is invalid or not found, redirect to auth.evan.ltd
    console.log('Token is invalid. Redirecting to auth.evan.ltd...');
    window.location.href = 'https://auth.evan.ltd';
}

// Trigger token validation on page load
window.onload = handleTokenValidation;
