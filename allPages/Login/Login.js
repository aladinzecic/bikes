const hash = (text) =>
{
    const hashObj = new jsSHA("SHA-512","TEXT",{numRounds: 1});
    hashObj.update(text);
    const hash = hashObj.getHash("HEX");
    return hash;
}



const usernameEl = document.getElementById('username');
let usernameValue = '';

usernameEl.addEventListener('input', () => {
    usernameValue = usernameEl.value;
  
  });
  const usernameValidationMessageDiv  = document.getElementById('usernameValidationMessage');


  const passwordEl = document.getElementById('password');
  let passwordValue = '';

  passwordEl.addEventListener('input', () => {
    passwordValue = passwordEl.value;
  });
  const passwordValidationMessageDiv  = document.getElementById('passwordValidationMessage');

  const btn=document.getElementById('btn')
  btn.addEventListener('click',()=>{
      if(!localStorage.getItem(usernameValue)){
        usernameValidationMessageDiv.innerText=""
        const newh4 = document.createElement("h4");
        newh4.style.color='red'
        newh4.style.fontSize='16px'
      newh4.style.textAlign='start'
      newh4.style.marginTop='0px'
      newh4.innerText = `This username doesn't exists`;
      usernameValidationMessageDiv.appendChild(newh4);
    }
    else if(hash(passwordValue)!==localStorage.getItem(usernameValue)){
        usernameValidationMessageDiv.innerText=""
        passwordValidationMessageDiv.innerText=""
        const newh4 = document.createElement("h4");
        newh4.style.color='red'
        newh4.style.fontSize='16px'
        newh4.style.textAlign='start'
      newh4.style.marginTop='0px'
      newh4.innerText = `Invalid password`;
      passwordValidationMessageDiv.appendChild(newh4);
    }
    else{
        passwordValidationMessageDiv.innerText=""
        usernameValidationMessageDiv.innerText=""
        localStorage.setItem("loggedInUser", usernameValue);
        document.location.href='../MainPage/MainPage.html'
    }
})