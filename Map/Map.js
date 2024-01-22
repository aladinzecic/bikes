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
    ext: 'png'
}).addTo(map);

let locations;

async function getText(file) {
    let x = await fetch(file);
    let y = await x.json();
    locations = y.networks;
    console.log(locations);

    // Create an array to store circle references
    const circles = [];

    // Create circles and bind popups
    locations.forEach((el) => {
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
            map.removeLayer(circle); // Remove the circle layer
        });

        // Add circles and markers to map
        circle.addTo(map);
        marker.addTo(map);

        // Push circle reference to the array
        circles.push(circle);
    });

    return circles;
}

// Call getText and handle the asynchronous operation
getText("http://api.citybik.es/v2/networks").then((circles) => {
    // Set up zoomend event to re-add circles when zooming out
    map.on('zoomend', () => {
        const currentZoom = map.getZoom();
        
        // Check if zoom level is less than a specific value (e.g., 8) to re-add circles
        if (currentZoom < 8) {
            circles.forEach(circle => {
                if (!map.hasLayer(circle)) {
                    map.addLayer(circle);
                }
            });
        }
    });
});
