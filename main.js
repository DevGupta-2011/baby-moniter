status = "";
objects = [];
function setup() {
    canvas = createCanvas(550, 420);
    canvas.center();
    objectdetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status = detecting objects";
    img = createCapture(VIDEO)
    img.hide()
}
function modelloaded() {
    console.log("modelloaded!")
    status = true;
}
function got_result(error, results) {
    if (error == true) {
        console.error(error)
    }
    else {
        objects = results;
        console.log(results)
    }
}
function preload(){
    alarm = loadSound("alarm.wav")
}
function draw() {
    image(img, 0, 0, 550, 420);
 if(status != ""){
    objectdetector.detect(img, got_result)
     for(i=0 ;i<objects.length; i++){
         if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "status = baby found"; 
            alarm.stop()
         }
         else{
            document.getElementById("status").innerHTML = "status = baby not found";
            if(alarm.isPlaying()==false){
                alarm.play()
            }
         }
        percent = floor(objects[i].confidence*100)
        stroke("red");
        text(objects[i].label+" "+percent+"%",objects[i].x +15,objects[i].y +15);
        noFill();
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);  
     }
 }
}