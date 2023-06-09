function setup() {
  canvas = createCanvas(300,300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelLoaded);
}

function draw(){
  image(
    video , 0 , 0 , 300,300
  )
  classifier.classify(video,gotResult);
}
var previous_result = " ";

function modelLoaded(){
  console.log("model is loaded");
}

function gotResult(error,results){
if(error){
  console.error("error");
}
else{
if((results[0].confidence > 0.5) && (previous_result = ! results[0].label)){
 console.log("results");
 previous_result = results[0].label ;
 var synth = window.speechSynthesis;
 speak_data='object detected - ' +  previous_result;
 var utterThis = new SpeechRecognitionAlternative(speak_data);
 synth.speak(utterThis);

 document.getElementById("object").innerHTML = results[0].label;

 document.getElementById("Accuracy").innerHTML = results[0].confidence.fixedto(3);
}
}
}






