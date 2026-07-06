# Audio Maps

This code is a template for creating location-based audio tours that can be viewed (and listened to) on a computer or on a phone. Like any website, it consists of HTML and Javascript. It uses a recent Javascript library that let us do advanced things with maps called [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) and open source map tiles from [OpenMapTiles](https://openmaptiles.org/styles/).

By editing `markers.js`, you can assign longitude and latitude coordinates to an audio file that you upload. This will then appear on the map as a marker. If you click the marker, the sound will play. Furthermore, if you are on your phone, the sound will play when you are physically present at that location (the hotspot is a 50ft radius around the point you specify -- but you can change this). 

This map is running at 

---

To log in to make changes:
1. Go to `https://github.com/login` and sign in with username `lclarkmaps` and password `*****`.
1. Click on `lclarkmaps.github.io` under "Your Repositories."
1. Click on your folder (a number)
1. Open your map in another tab or on your phone

To record audio:
1. Open "QuickTime Player" in the Applications folder
1. Under "File", choose "New Audio Recording"
1. Keep it under 30 seconds
1. After recording, choose "Edit > Trim..." and adjust so that there is no extraneous audio
1. Save the file on the desktop. This will be a file ending in "m4a"
1. The file needs to be converted to a "wav" file -- you can use (https://online-audio-converter.com/)[https://online-audio-converter.com/] (save it with CD Quality, and when you download the result, fix the title)
1. Your wav file is now ready

To upload audio:
1. Click "Upload Files"
1. Drag your wav file to the browser
1. Make sure to "Commit changes"

To create and edit markers:
1. Click on `markers.js`
1. Click the edit icon (a pencil)
1. Edit the file. Make sure your quotes, parens, and semi-colons are formatted correctly
    Example: `addMarker(-71.39694, 41.82453, "my_audio_file.wav");`
1. Click "Commit Changes" to save
1. Now reload your map and test -- you may have to wait a couple seconds and/or reload several times until the changes take effect

To change map styles:
1. Open `map.js`
2. Delete the "//" (comment symbol) in front of the style you want to see -- make sure there is a "//" in front of the others.

