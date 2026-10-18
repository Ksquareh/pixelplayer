PIXELPLAYER — LOCAL VIDEO PLAYER

Open index.html in a browser, then choose or drop a video file. MKV files are
accepted and identified, but browser playback depends on the codecs inside the
MKV container. If PixelPlayer reports that an MKV needs conversion, convert it to
MP4/H.264 and add the converted file.

For installable-app behavior and offline caching, serve this folder over localhost
or any HTTPS host. The included manifest and service worker provide the app name,
theme, icon, and cached shell.

Files:
- index.html      player interface and controls
- prism-icon.svg  favicon, app icon, and touch icon
- manifest.json   installable web-app metadata
- sw.js           offline shell cache

MAC APP PACKAGE

The Mac launcher is a plain executable bundle and does not use AppleScript or AppleScriptObjC. This prevents the OSAID selector error from the previous wrapper. The current downloadable package is built as PixelPlayer.app and opens the player in a dedicated Chrome app window.

If macOS blocks the app on first launch, right-click PixelPlayer.app, choose Open, then choose Open again.