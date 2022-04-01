video = "";
status1 = "";
objects = [];

function preload(){
   video = createVideo('video.mp4'); 
   video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
image(video,0,0,480,380);
if(status1!=""){
    objectdetected.detect(video,gotresults);
    for(var i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="status: objects detected";
        document.getElementById("NumofObjs").innerHTML="# of objs detected are "+objects.length;
        fill("red");
        percent = floor(objects[i].confidence*100);
        Text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15)
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}

function gotresults(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
    objects = results;
}
}

function start(){
    objectdetected=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}

function modelloaded(){
    console.log("cocossd model has been loaded successfully")
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}