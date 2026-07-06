var RADIUS = 50;
var map = null;
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

// Creates a new scale control to measure the map
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 120, // the max pixel width of the scale bar to be rendered on the map (default is 100 pixels)
        unit: 'imperial' // The type of measurement displayed, options are: 'imperial', 'metric', 'nautical' (default it metric)
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
        }))
