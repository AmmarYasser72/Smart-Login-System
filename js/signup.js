var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')

var signUpArray = []
if (localStorage.getItem('users') !== null) {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}

function isEmailExist(signupUsers) {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].Email === signupUsers.Email) {
            return false
        }
    }
    return true
}

function signUp() {
    var signupUsers = {
        Name: signupName.value,
        Email: signupEmail.value,
        Password: signupPassword.value,
    }
    if(signupEmail.classList.contains("is-invalid") || signupName.classList.contains("is-invalid") || signupEmail.value == "" || signupName.value == "" || signupPassword.value == ""){
          document.getElementById('exist').innerHTML = '<span class="text-danger mt-2">All inputs is required</span>'
    }

    else {
        if (signupEmail.classList.contains("is-valid") && signupName.classList.contains("is-valid") && signupPassword !== "") {
            if (isEmailExist(signupUsers)) {
                
                signUpArray.push(signupUsers)
                localStorage.setItem('users', JSON.stringify(signUpArray))
                signupEmail.classList.remove("is-valid");
                signupName.classList.remove("is-valid");
                document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
                location.replace("index.html");
               
            }
            else {  
                 document.getElementById('exist').innerHTML = '<span class="text-danger m-2">email already exists</span>' 
            }
        }
      
    }

}

function validateForm(ele) {
    var regex = {
        signupEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        signupName: /^[a-z0-9_-]{3,15}$/,
    }
    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid')
        ele.classList.add('is-valid')
        return true
    }
    else {
        ele.classList.remove('is-valid')
        ele.classList.add('is-invalid')
        return false
    }
}

function clearForm() {
    signinEmail.value = null;
    signinPassword.value = null;
    signupEmail.value = null;
    signupPassword.value = null;
    signupName.value = null;
}
