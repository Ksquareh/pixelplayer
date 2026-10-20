PIXELPLAYER — LOCAL VIDEO PLAYER

PixelPlayer is a browser-local website for playing videos you choose from your device.
Open the GitHub Pages site and choose a video. Files stay in the browser tab; no account or upload is required.

Compatibility notes
- MP4/H.264 is the most broadly supported format. MKV support depends on the browser and the codecs inside the file.
- The website cannot keep local video files after a reload because browsers do not allow a site to silently retain file access.
- Resume points are saved locally as an opaque bounded cache; file names are not written to localStorage.
- The site includes subtitles, subtitle delay, audio-track selection where the browser exposes it, and a downloadable static website ZIP.
- Install metadata and PNG icons are included for supported Android browsers and iOS Home Screen shortcuts. Browser install behaviour varies by platform.
- The included website ZIP is a static website bundle, not a native Mac application.

Included files
- index.html — the website
- manifest.json — install metadata
- pixelplayer-icon.svg, apple-touch-icon.png, icon-192.png, icon-512.png — app icons
- sw.js — cache and update handling
- pixelplayer-website.zip — downloadable website bundle

Made by a young prodigy
