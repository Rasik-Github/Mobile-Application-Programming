// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVcDiZoYMU34VwA2Rdri8IQVxOBBJRR2w",
  authDomain: "signup-page-48312.firebaseapp.com",
  projectId: "signup-page-48312",
  storageBucket: "signup-page-48312.firebasestorage.app",
  messagingSenderId: "641092772855",
  appId: "1:641092772855:web:87a9df0fe62141498104f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Reference to auth and firestore
const auth = firebase.auth();
const db = firebase.firestore();

// DOM elements
const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('toggle-password');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '🔒';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️';
    }
});

// Handle form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    try {
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Add user data to Firestore
        await db.collection('users').doc(user.uid).set({
            username: username,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Clear form
        signupForm.reset();
        
        // Show success message
        alert('Account created successfully! You can now login.');
        
        // Redirect to login page (you would add the actual URL)
        // window.location.href = 'login.html';
        
    } catch (error) {
        console.error('Error during signup:', error);
        alert(`Signup failed: ${error.message}`);
    }
});

// Simple form validation (you can expand this)
function validateForm() {
    let isValid = true;
    
    // Username validation
    if (usernameInput.value.trim().length < 3) {
        isValid = false;
        alert('Username must be at least 3 characters');
    }
    
    // Password validation
    if (passwordInput.value.length < 6) {
        isValid = false;
        alert('Password must be at least 6 characters');
    }
    
    return isValid;
}