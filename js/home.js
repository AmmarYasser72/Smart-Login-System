var username = JSON.parse(localStorage.getItem('WelcomeUsername'))
if (username) {
    document.getElementById('username').innerHTML = `Welcome ${username}`;
}

function logout() {
    localStorage.removeItem('WelcomeUsername')
}