// Define addHoverPopup function
function addHoverPopup(marker, content) {
    marker.bindTooltip(content, {
        sticky: true
    }).openTooltip();
}

var map = L.map('map').setView([51.1657, 10.4515], 4);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png',
    id: 'mapbox-outdoors',
    accessToken:'sk.eyJ1IjoiaXFhcmNobGkiLCJhIjoiY2pqZTN1OTNxMGNubDNwbXNhbDNka2J4ZiJ9.UKoT12YRTSSUEnIGHyiScQ'
}).addTo(map);

let locations;
let circles = []; // Promenljiva za čuvanje referenci na krugove

async function getText(file) {
    let x = await fetch(file);
    let y = await x.json();
    locations = y.networks;
    console.log(locations[0].company[0]);

    // Create an array to store circle references
    circles = locations.map(el => {
        var circle = L.circle([el.location.latitude, el.location.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 2000
        });

        // Bind popup to circle
        circle.bindPopup(`${el.location.city}, ${el.location.country}`);

        // Create circle markers and add tooltips
        var marker = L.circleMarker([el.location.latitude, el.location.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 2
        });

        // Add tooltip to marker
        addHoverPopup(marker, `${el.location.city}, ${el.location.country}`);
        // Set up click event to zoom to marker location and remove circle
        marker.on('click', () => {
            map.setView([el.location.latitude, el.location.longitude], 13);

            // Remove the corresponding big circle on click
            const correspondingCircle = circles.find(c => c.getLatLng().equals([el.location.latitude, el.location.longitude]));
            if (correspondingCircle) {
                map.removeLayer(correspondingCircle);
            }
        });

        // Add circles and markers to map
        circle.addTo(map);
        marker.addTo(map);

        return circle;
    });

    return circles;
}

// Create and add circles to the map
const circlesPromise = getText("http://api.citybik.es/v2/networks");

// Set up zoomend event to re-add circles when zooming out
map.on('zoomend', () => {
    const currentZoom = map.getZoom();

    // Check if zoom level is less than a specific value (e.g., 8) to re-add circles
    circlesPromise.then(circles => {
        if (currentZoom < 8) {
            circles.forEach(circle => {
                if (!map.hasLayer(circle)) {
                    map.addLayer(circle);
                }
            });
        }
    });
});

const filtered = [];

const input = document.getElementById('search');
const span=document.getElementById('span')

const searchDiv = document.getElementById('texts');
span.addEventListener('click',()=>{
       input.value=""
  filtered.length=0
  searchDiv.innerHTML = '';

})
input.addEventListener('input', () => {
    const value = input.value.trim();
    console.log(value);

    filtered.length = 0;


    // Dodata provera da li postoji searchDiv pre dodavanja novih div-ova
    if (searchDiv) {
        // Ukoliko postoji, očisti ga
        searchDiv.innerHTML = '';

        locations.forEach((el, index) => {
            if (el.location.city.toLowerCase().includes(value.toLowerCase()) && value) {
                filtered.push(el);

                const newDiv = document.createElement('div');
                const newHr = document.createElement('hr');
                newDiv.classList.add('textDiv');
                newHr.classList.add('hr');
                // Ispravljena linija za spajanje stringova
                newDiv.innerText = `${el.company[0]}, ${el.location.city}`;
                newDiv.addEventListener('click', () => {
                    map.setView([el.location.latitude, el.location.longitude], 13);

                    // Remove the corresponding big circle on click
                    const correspondingCircle = circles[index];
                    if (correspondingCircle) {
                        map.removeLayer(correspondingCircle);
                    }
                });
                searchDiv.append(newDiv);
                searchDiv.append(newHr);
            }
        });
    }
});




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