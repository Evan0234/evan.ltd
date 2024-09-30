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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Initialize Firestore

// Function to get the value of a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to check if a token exists in Firestore
async function validateToken(token) {
    try {
        const doc = await db.collection('verify_tokens').doc(token).get();
        if (doc.exists) {
            console.log('Token is valid in Firestore.');
            return true;
        } else {
            console.log('Token not found in Firestore.');
            return false;
        }
    } catch (error) {
        console.error('Error checking token in Firestore:', error);
        return false;
    }
}

// Main function to validate token and redirect if necessary
async function handleVerification() {
    console.log("Starting verification process...");

    // Check for the token in cookies
    const token = getCookie('verify_token');
    if (!token) {
        console.log('No token found in cookies. Redirecting to auth.evan.ltd...');
        window.location.href = 'https://auth.evan.ltd';  // Redirect to auth.evan.ltd
        return;
    }

    console.log(`Token found: ${token}`);

    // Validate the token in Firestore
    const isValid = await validateToken(token);
    if (isValid) {
        console.log('Token is valid. Proceeding...');
        // Do nothing and proceed to the site
    } else {
        console.log('Token is invalid. Redirecting to auth.evan.ltd...');
        window.location.href = 'https://auth.evan.ltd';  // Redirect to auth.evan.ltd
    }
}

// Trigger the verification process when the page loads
window.onload = handleVerification;
