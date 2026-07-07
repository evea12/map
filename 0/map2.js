var RADIUS = 50;
var markers = [];
var sounds = [];
var playable = true;

initAudio();

//10.15332,56.16728
const testa = [9.97038888, 53.55922]
const train = [9.97684,53.55819];
const wind= [9.97920,53.56170];
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
        center: [10.15719,56.16976],
    zoom: 16
});

 //POPUPS
    //testA
    const popuptesta = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + "For Angelo" + '</h3><p>' + "Be my guinea pig" + '</p><p>' + "Get closer to play recording" + '</p>');
    //Train
    const popuptrain = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + "U-Bahn" + '</h3><p>' + "Recorded 7.7.26 in the Messehallen U-Bahn station" + '</p><p>' + "Get closer to play recording" + '</p>');
    //Wind
    const popupwind = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + "Wind" + '</h3><p>' + "Recorded 3.7.26 in Planten un Blomen" + '</p><p>' + "Get closer to play recording" + '</p>');

    // create DOM element for the marker
    const eltesta = document.createElement('div');
    eltesta.id = 'marker';
    const eltrain = document.createElement('div');
    eltrain.id = 'marker';
    const elwind = document.createElement('div');
    elwind.id = 'marker';

    // create the marker
    new mapboxgl.Marker(eltesta)
        .setLngLat(testa)
        .setPopup(popuptesta) // sets a popup on this marker
        .addTo(map);
    new mapboxgl.Marker(eltrain)
        .setLngLat(train)
        .setPopup(popuptrain) // sets a popup on this marker
        .addTo(map);
    new mapboxgl.Marker(elwind)
        .setLngLat(wind)
        .setPopup(popupwind) // sets a popup on this marker
        .addTo(map);

var canvas = map.getCanvasContainer();

// Creates a new scale control to measure the map
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 100, // the max pixel width of the scale bar to be rendered on the map (default is 100 pixels)
        unit: 'metric' // The type of measurement displayed, options are: 'imperial', 'metric', 'nautical' (default it metric)
    });
// Adds the new scale control to the map
    map.addControl(scale);

 // Add geolocate control to the map.
   const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        });

// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when a geolocate event occurs.
geolocate.on('geolocate', function (e) {
    console.log("Geolocated: " + e.coords.longitude + "," + e.coords.latitude);
    var position = [e.coords.longitude, e.coords.latitude];
    var units = { units: "meters" };
    var distancetrain = turf.distance(position, train, units);
    if (distancetrain < 50){const popuptrain = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + "U-Bahn" + '</h3><p>' + "Recorded 7.7.26 in the Messehallen U-Bahn station" + '</p>' +
            '<audio controls><source src="' + "Train.mp3" + '" type="audio/mpeg"></audio>');const eltrain = document.createElement('div');
    eltrain.id = 'marker';new mapboxgl.Marker(eltrain)
        .setLngLat(train)
        .setPopup(popuptrain) // sets a popup on this marker
        .addTo(map)}
    var distancewind = turf.distance(position, wind, units);
    if (distancewind < 50){const popupwind = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + "Wind" + '</h3><p>' + "Recorded 3.7.26 in Planten un Blomen" + '</p>' +
            '<audio controls><source src="' + "wind.mp3" + '" type="audio/mpeg"></audio>');const elwind = document.createElement('div');
    elwind.id = 'marker';new mapboxgl.Marker(elwind)
        .setLngLat(wind)
        .setPopup(popupwind) // sets a popup on this marker
        .addTo(map)};
    var distanceangelo = turf.distance(position, testa, units);
    if (distanceangelo < 100){const popuptesta = new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>' + "For Angelo" + '</h3><p>' + "Surprise!" + '</p>' +
            '<audio controls><source src="' + "angelo.mp3" + '" type="audio/mpeg"></audio>');const eltesta = document.createElement('div');
    eltesta.id = 'marker';new mapboxgl.Marker(eltesta)
        .setLngLat(testa)
        .setPopup(popuptesta) // sets a popup on this marker
        .addTo(map)}
});

 map.on('click', (e) => {
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
};
