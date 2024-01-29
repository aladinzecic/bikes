function initMap() {
    // Styles a map in night mode.
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.674, lng: -73.945 },
      zoom: 12,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    });
  }
  
  window.initMap = initMap;







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



function validateForm() {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  const fullNamePattern = /^[a-zA-Z\s]+$/;
  const emailPattern = /^.+@.+\.[a-zA-Z]{2,4}$/;

  const fullNameValid = fullNamePattern.test(fullName);
  const emailValid = emailPattern.test(email);
  const messageValid = message !== "";

  document.getElementById("fullNameError").textContent = fullNameValid ? "" : "You can't enter speacial characters";
  document.getElementById("emailError").textContent = emailValid ? "" : "Please enter a valid email";
  document.getElementById("messageError").textContent = messageValid ? "" : "Please enter a message";

  if(fullNameValid && emailValid && messageValid) {
    fullNameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    Toastify({
      text: "Message sent successfully",
      duration: 3000,
      gravity: "bottom", 
      position: "right", 
      backgroundColor: "#12b7d4", 
    }).showToast();
    
  }

  return fullNameValid && emailValid && messageValid;
}


// Event listener za provjeru forme kada se klikne na gumb
document.getElementById('btn1').addEventListener('click', () => {
  validateForm();
});
