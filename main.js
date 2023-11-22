var alarm;
var objects = [];
document.getElementById("status").innerHTML = "Status: Detecting...";

function preload() {
    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(1000, 800);
    canvas.parent("webcam");
    video = createCapture(VIDEO);
    video.size(1000, 800);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
    console.log("Model is loaded.");
}

function draw() {
    image(video, 0, 0, 1000, 800);
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
        if (objects[i].label == "person") {
            document.getElementById("found").innerHTML = "Baby Found";
            document.getElementById("found").outerHTML = "<button class='btn btn-warning' id='found'>Baby Found</button>";
            alarm.stop();
            break;
        } else if (objects[i].label != "person") {
            document.getElementById("found").innerHTML = "Baby Not Found";
            document.getElementById("found").outerHTML = "<button class='btn btn-danger' id='found'>Baby Not Found</button>";
            if (alarm.isPlaying() == false) {
                alarm.play();
            }
        }
    }
    if (objects.length < 1) {
        document.getElementById("found").innerHTML = "Baby Not Found";
        document.getElementById("found").outerHTML = "<button class='btn btn-danger' id='found'>Baby Not Found</button>";
        if (alarm.isPlaying() == false) {
            alarm.play();
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("status").innerHTML = "Status: Detection complete.";
        objects = results;
    }
}
