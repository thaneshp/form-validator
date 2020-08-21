const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_check = document.getElementById('password2');

//Determine whether user has clicked submit.
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();
});

//Function to check all input fields.
function checkInputs() {
    //Store user inputs.
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const password_checkVal = password_check.value.trim();

    //Variables to check success of input.
    var isUsername = false;
    var isEmail = false;
    var isPassword = false;
    var isPasswordCheck = false;

    //Check whether username input is valid.
    if (usernameVal === '') isUsername = setError(username, "Username cannot be blank.");
    else isUsername = setSuccess(username);

    //Check whether email input is valid.
    if (emailVal === '') isEmail = setError(email, "Email field cannot be blank.");
    else if (!checkEmail(emailVal)) isEmail = setError(email, "Please enter a valid email.");
    else isEmail = setSuccess(email);

    //Check whether password input is valid.
    if (passwordVal === '') isPassword = setError(password, "Password field cannot be blank.");
    else if (passwordVal.length < 6) isPassword = setError(password, "Password length is too short.");
    else isPassword = setSuccess(password);

    //Check whether re-entered password is valid.
    if (password_checkVal === '') isPaswordCheck = setError(password_check, "Passwords do not match.");
    else if (password_checkVal !== passwordVal) isPasswordCheck = setError(password_check, "Passwords do not match.")
    else if (isPassword !== true) isPasswordCheck = setError(password_check, "Please re-check your password.");
    else isPasswordCheck = setSuccess(password_check);

    isAllInputValid(isUsername, isEmail, isPassword, isPasswordCheck);
}

//Function to display error message for invalid input.
function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerHTML = message;
    formControl.className = 'form-control error';

    return false;
}

//Function to display success message for valid input.
function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

    return true;
}

//Function to check email from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript.
function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Check whether all input is valid.
function isAllInputValid(usernameValid, emailValid, passwordValid, passwordCheckValid) {
    if (usernameValid && emailValid && passwordValid && passwordCheckValid) {
        const success_message = document.getElementById("success-message");

        //Pause execution to show sucess of inputs.
        setTimeout(function(){
            form.className = 'form hide';
            success_message.className = 'display';
        }, 1000);
    }
}