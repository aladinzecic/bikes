
const hash = (text) =>
{
    const hashObj = new jsSHA("SHA-512","TEXT",{numRounds: 1});
    hashObj.update(text);
    const hash = hashObj.getHash("HEX");
    return hash;
}

const usernameEl = document.getElementById('username');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const usernameValidationMessageDiv  = document.getElementById('usernameValidationMessage');
let usernameValue = '';
usernameEl.addEventListener('input', () => {
  usernameValue = usernameEl.value;

});



const passwordEl = document.getElementById('password');
const passwordValidationMessageDiv  = document.getElementById('passwordValidationMessage');
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
      localStorage.setItem(usernameValue,hash(passwordValue))
      passwordEl.value=""
      usernameEl.value=""
      Toastify({
        text: "Account created succesfully",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#12b7d4",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      setInterval(()=>{
window.location.href = '../Login/Login.html';
      },2000)
    }
  })

