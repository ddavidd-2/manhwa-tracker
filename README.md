# Manhwa Tracker Chrome Extension

Chrome extension to track manhwa titles and chapters read online on specific scanlation sites.

This extension uses React and Indexed DB API

Icon is from [Twemoji](https://twemoji.twitter.com/).

### How to install

First, switch to the webapp directory and run the following:

```
npm install
npm run build
```
Then switch back to the outermost directory ```manhwa-tracker/``` and run: 
```
mv webapp/build extension/build
```
Then, go to your [chrome extensions page](chrome://extensions/), turn on Developer Mode, and click load unpacked.

Load only the extension directory into Chrome.

### Features

Tracks various information of manhwa titles:
- Title
- Chapter
- Last Read
- Scanlation Site

Search for specific manhwa based on title.

Sort manhwa by title or time read.
