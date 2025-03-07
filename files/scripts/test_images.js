var fs = require('fs');
var files = fs.readdirSync('files\\images');

function loadAllImages() {
    console.log("Test" + files);
}

// window.onload = loadAllImages;