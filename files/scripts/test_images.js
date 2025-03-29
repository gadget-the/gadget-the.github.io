var directory = 'files\\images\\';
var xmlHttp = new XMLHttpRequest();

xmlHttp.open('GET', directory, true); // false for synchronous request
xmlHttp.send(null);

var ret = xmlHttp.responseText;
var fileList = ret.split('\n');

function loadAllImages() {
    for (let i = 0; i < fileList.length; i++) {
        console.log(fileList[i]);
    }
}

// window.onload = loadAllImages;