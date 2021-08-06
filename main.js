Webcam.set({
  width:350,
  height:300,
  image_format : 'png',
  png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot()
{
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xcswRPa45/',modelLoaded);
function modelLoaded() {
    console.log('Model Loaded!');
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    utterThis.rate=0.5;
    synth.speak(utterThis);
}
function gotResult(error,result) {
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_hand_name").innerHTML = results[0].label;
        document.getElementById("result_hand_name2").innerHTML = result[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "V")
        {
            document.getElementById("update_hand").innerHTML = "&#128522;";
        }
        if(results[0].label == "Okay")
        {
            document.getElementById("update_hand").innerHTML = "&#128532;";
        }
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_hand").innerHTML = "&#128548;";
        }

        if(results[1].label == "V")
        {
            document.getElementById("update_hand").innerHTML = "&#128522;";
        }
        if(results[1].label == "Okay")
        {
            document.getElementById("update_hand").innerHTML = "&#128532;";
        }
        if(results[1].label == "Thumbs Up")
        {
            document.getElementById("update_hand").innerHTML = "&#128548;";
        }
    }
}