
const btn=document.getElementById('nav-mobile')
const divv=document.getElementById('login-menu')
const shorter=document.querySelector(".shorter")
const longer=document.querySelector(".longer")
var isMenuOn = false;

btn.addEventListener('click',()=>{
    if(!isMenuOn){
        divv.style.marginLeft="0px"
        shorter.style.width="90%"
        shorter.style.rotate="-45deg"
        longer.style.rotate="45deg"
        shorter.style.marginTop="-3vh"
        longer.style.marginTop="2vh"
    }
    else{
        divv.style.marginLeft="100%"
        shorter.style.width="60%"
        shorter.style.rotate="0deg"
        longer.style.rotate="0deg"
        shorter.style.marginTop="0vh"
        longer.style.marginTop="0vh"
    }
    isMenuOn=!isMenuOn
    console.log(111)
})



const remove = document.getElementById("login-remove");
const remove1 = document.getElementById("login-remove1");

function updateNavigation() {
    if (localStorage.getItem('loggedInUser')) {
        remove.style.display = 'none';
        remove1.style.display = 'none';
    } else {
        remove.style.display = 'inline-block';
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === 'loggedInUser') {
        updateNavigation();
    }
});

updateNavigation();
