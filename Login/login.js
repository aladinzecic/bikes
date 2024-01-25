const usernameEl = document.getElementById('username');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const usernameValidationMessageDiv  = document.getElementById('usernameValidationMessage');
let isEmailFocused = false;
let usernameValue = '';
usernameEl.addEventListener('input', () => {
  usernameValue = usernameEl.value;

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

  
    passwordEl.addEventListener('input', () => {
    passwordValue = passwordEl.value;
  });
  

  const btn=document.getElementById('btn')
  btn.addEventListener('click',()=>{
    usernameValidationMessageDiv.innerHTML = '';
    if (!lengthRegex.test(usernameValue)) {
      const newh4 = document.createElement("h4");
      newh4.style.color='red'
      newh4.style.fontSize='16px'
      newh4.innerText = 'Username must be longer than 5 characters';
      usernameValidationMessageDiv.appendChild(newh4);
    }
    else if(localStorage.getItem(usernameValue)){
      const newh4 = document.createElement("h4");
      newh4.style.color='red'
      newh4.style.fontSize='16px'
      newh4.innerText = 'This username already exists';
      usernameValidationMessageDiv.appendChild(newh4);
    }

    const msgs=validatePassword(passwordValue)
    passwordValidationMessageDiv.innerHTML = '';
    if (msgs.length) {
      const newh4 = document.createElement("h4");
      newh4.style.color='red'
      newh4.style.fontSize='16px'
      newh4.innerText =msgs[0]? msgs[0]:'';
      passwordValidationMessageDiv.appendChild(newh4);
    }
    if(!msgs.length&&passwordValue!==""&&lengthRegex.test(usernameValue)&&!localStorage.getItem(usernameValue)){
      localStorage.setItem(usernameValue,JSON.stringify({
        username:usernameValue,
        password:passwordValue
      }))
    }
  })

  console.log(localStorage.getItem('asdfghj'))