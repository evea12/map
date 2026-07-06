var RADIUS = 50;
var map = null;
var markers = [];
var sounds = [];
var playable = true;

initAudio();

if (!mapboxgl.supported()) alert("Your browser does not support Mapbox GL");
mapboxgl.accessToken = "pk.eyJ1IjoiZXZlYTEyIiwiYSI6ImNtcjdzYXY5MTBocnEyeXFvYTRqamo4YTUifQ.xzMb4LxFvFWK7NVWI_tNLg";
const map = new mapboxgl.Map({
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

map.addControl(new mapboxgl.NavigationControl({
    showCompass: false
}), "top-left");

map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
}), "bottom-right");

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
}).on('geolocate', function (e) {
    console.log("Geolocated: " + e.coords.longitude + "," + e.coords.latitude);
    activate(e.coords.longitude, e.coords.latitude);
}), "top-left");

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
}

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
script.src = "markers.js?v=" + Math.floor(Math.random() * Math.floor(10000));
document.body.appendChild(script);
