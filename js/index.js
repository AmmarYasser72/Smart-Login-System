// DOM Elements
const signinEmail = document.getElementById('signinEmail');
const signinPassword = document.getElementById('signinPassword');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const usernameDisplay = document.getElementById('username');

// User data management
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Check if user is logged in (for home page)
function checkLoggedIn() {
    if (typeof usernameDisplay !== 'undefined' && usernameDisplay !== null) {
        const username = JSON.parse(localStorage.getItem('WelcomeUsername'));
        if (username) {
            usernameDisplay.innerHTML = `Welcome ${username}`;
        }
    }
}

// Login function
function login() {
    const email = signinEmail.value;
    const password = signinPassword.value;

    if (!email || !password) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    const user = users.find(u => u.Email === email && u.Password === password);
    
    if (user) {
        localStorage.setItem('WelcomeUsername', JSON.stringify(user.Name));
        location.replace("home.html");
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

// Signup function
function signUp() {
    const newUser = {
        Name: signupName.value,
        Email: signupEmail.value,
        Password: signupPassword.value,
    };

    // Validation
    if (signupEmail.classList.contains("is-invalid") || 
        signupName.classList.contains("is-invalid") || 
        !newUser.Email || !newUser.Name || !newUser.Password) {
        document.getElementById('exist').innerHTML = '<span class="text-danger mt-2">All inputs are required</span>';
        return;
    }

    if (isEmailExist(newUser.Email)) {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        resetSignupForm();
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
        setTimeout(() => location.replace("index.html"), 1500);
    } else {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-2">Email already exists</span>';
    }
}

// Check if email exists
function isEmailExist(email) {
    return !users.some(user => user.Email === email);
}

// Form validation
function validateForm(ele) {
    const regex = {
        signupEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        signupName: /^[a-z0-9_-]{3,15}$/,
    };

    if (regex[ele.id] && regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
        return true;
    } else {
        ele.classList.remove('is-valid');
        ele.classList.add('is-invalid');
        return false;
    }
}

// Clear forms
function clearForm() {
    if (signinEmail) signinEmail.value = '';
    if (signinPassword) signinPassword.value = '';
    if (signupEmail) signupEmail.value = '';
    if (signupPassword) signupPassword.value = '';
    if (signupName) signupName.value = '';
}

// Reset signup form classes
function resetSignupForm() {
    if (signupEmail) {
        signupEmail.classList.remove("is-valid");
        signupEmail.classList.remove("is-invalid");
    }
    if (signupName) {
        signupName.classList.remove("is-valid");
        signupName.classList.remove("is-invalid");
    }
}

// Logout function
function logout() {
    localStorage.removeItem('WelcomeUsername');
    location.replace("index.html");
}

// Initialize on page load
checkLoggedIn();