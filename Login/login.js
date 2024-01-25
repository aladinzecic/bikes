const emailEl = document.getElementById('email');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const emailValidationMessageDiv  = document.getElementById('emailValidationMessage');
let isEmailFocused = false;
let emailValue = '';

emailEl.addEventListener('focus', () => {
    isEmailFocused = true;
});

emailEl.addEventListener('blur', () => {
    isEmailFocused = false;
  emailValidationMessageDiv.innerHTML = '';

  if (!emailRegex.test(emailValue) && !isEmailFocused&&emailValue!="") {
    const newh4 = document.createElement("h4");
    newh4.style.color='red'
    newh4.style.fontSize='16px'
    newh4.innerText = 'The entered email address is not valid';
    emailValidationMessageDiv.appendChild(newh4);
  }
  });

emailEl.addEventListener('input', () => {
  emailValue = emailEl.value;

});



const passwordEl = document.getElementById('password');
const passwordValidationMessageDiv  = document.getElementById('passwordValidationMessage');
let isPasswordFocused = false;
let passwordValue = '';
const lengthRegex = /^.{6,}$/;
const uppercaseRegex = /[A-Z]/;
const specialCharacterRegex = /[!@#$%^&*]/;

function validatePassword(password) {
  const messages = [];

  if (!lengthRegex.test(password)) {
    messages.push('Password must be longer than 5 characters');
  }

  if (!uppercaseRegex.test(password)) {
    messages.push('Password must contain an uppercase letter');
  }

  if (!specialCharacterRegex.test(password)) {
    messages.push('Password must contain an special character (!@#$%^&*).');
  }

  return messages;
}


const validationMessages = validatePassword(passwordValue);

if (validationMessages.length !== 0) {
  console.log("Lozinka nije validna.");
}



passwordEl.addEventListener('focus', () => {
    isFocused = true;
  });
  
  passwordEl.addEventListener('blur', () => {
    const msgs=validatePassword(passwordValue)
    isFocused = false;
    passwordValidationMessageDiv.innerHTML = '';
    if (msgs && !isPasswordFocused) {
      const newh4 = document.createElement("h4");
      newh4.style.color='red'
      newh4.style.fontSize='16px'
      newh4.innerText =msgs[0]? msgs[0]:'';
      passwordValidationMessageDiv.appendChild(newh4);
    }
    });
  
    passwordEl.addEventListener('input', () => {
    passwordValue = passwordEl.value;
  });
  