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

