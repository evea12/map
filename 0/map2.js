var RADIUS = 50;
var markers = [];
var sounds = [];
var playable = true;

initAudio();

const map = new mapboxgl.Map({
    accessToken: 'pk.eyJ1IjoiZXZlYTEyIiwiYSI6ImNtcjdzYXY5MTBocnEyeXFvYTRqamo4YTUifQ.xzMb4LxFvFWK7NVWI_tNLg',
    container: "map",
    style: 'mapbox://styles/mapbox/standard',
    // style: "https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json",
    // style: "https://openmaptiles.github.io/positron-gl-style/style-cdn.json",
    // style: "https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json",            
    // style: "https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json",
    // style: "https://openmaptiles.github.io/klokantech-terrain-gl-style/style-cdn.json",            
    // style: "https://openmaptiles.github.io/klokantech-3d-gl-style/style-cdn.json",                        
    // style: "https://openmaptiles.github.io/fiord-color-gl-style/style-cdn.json",
    // style: "https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json",
     // center: [9.97038888, 53.55922],
        center: [9.97038888, 53.55922],
    zoom: 16
});

var canvas = map.getCanvasContainer();

// Creates a new scale control to measure the map
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 100, // the max pixel width of the scale bar to be rendered on the map (default is 100 pixels)
        unit: 'metric' // The type of measurement displayed, options are: 'imperial', 'metric', 'nautical' (default it metric)
    });
// Adds the new scale control to the map
    map.addControl(scale);

 // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        })
    );

map.on(('geolocate', function (e) {
    console.log("Geolocated: " + e.coords.longitude + "," + e.coords.latitude);
    activate(e.coords.longitude, e.coords.latitude);
}), "top-left");

 map.on('mousemove', (e) => {
        document.getElementById('info').innerHTML =
            // `e.point` is the x, y coordinates of the `mousemove` event
            // relative to the top-left corner of the map.
            JSON.stringify(e.point) +
            '<br />' +
            // `e.lngLat` is the longitude, latitude geographical position of the event.
            JSON.stringify(e.lngLat.wrap());
    });

map.on('mousemove', function(e) {
    canvas.style.cursor = 'default';            
    for (var m in markers) {
        var marker = markers[m];
        var lngLat = marker.getLngLat();
        var distance = getDistance(lngLat.lng, lngLat.lat, e.lngLat.lng, e.lngLat.lat);
        if (distance < RADIUS) {
            canvas.style.cursor = 'pointer';
            break;
        }
    }
});

map.on('click', function(e) {            
    activate(e.lngLat.lng, e.lngLat.lat);
});

function addMarker (lng, lat, path) {
    markers.push(new mapboxgl.Marker()
        .setLngLat([lng,lat])
        .addTo(map)
        );
    var id = markers.length.toString();
    loadSound(id, path);
    sounds.push(id);
};

function getDistance (lng1, lat1, lng2, lat2) {
    var from = turf.point([lng1, lat1]);
    var to = turf.point([lng2, lat2]);
    var distance = turf.distance(from, to, 'miles') * 5280;
    return distance;
}

function activate (lng, lat) {
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5);            
    for (var m in markers) {
        var marker = markers[m];
        var lngLat = marker.getLngLat();
        var distance = getDistance(lng, lat, lngLat.lng, lngLat.lat);
        if (distance < RADIUS) {
            if (playable) {
                playable = false;
                playSound(sounds[m], 0.0, 1.0, 0.0);
                setTimeout(function (e) {
                    playable = true;
                }, duration(sounds[m]) * 1000);
            }
        }
    }
}

var script = document.createElement("script"); 
script.src = "markers.js" + Math.floor(Math.random() * Math.floor(10000));
document.body.appendChild(script);

