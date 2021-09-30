leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
sound=""
scoreleftWrist=0
scorerightWrist=0
function preload()
{
sound=loadSound("music.mp3")
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center(); 
    video=createCapture(VIDEO)
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function draw()
{
    image(video,0,0,600,500)
    fill('#ff0000')
    stroke('#ff0000')
    if(scorerightWrist>0.2)
    {
    circle(rightWristX,rightWristY,20)
    if(rightWristY>0&&rightWristY<=100)
    {
   document.getElementById("speed").innerHTML="speed=0.5x"
   sound.rate(0.5)
    }

    else if(rightWristY>100&&rightWristY<=200)
    {
   document.getElementById("speed").innerHTML="speed=1x"
   sound.rate(1)
    }

   else if(rightWristY>200&&rightWristY<=300)
    {
   document.getElementById("speed").innerHTML="speed=1.5x"
   sound.rate(1.5)
    }

    else if(rightWristY>300&&rightWristY<=400)
    {
   document.getElementById("speed").innerHTML="speed=2x"
   sound.rate(2)
    }

    else if(rightWristY>400&&rightWristY<=500)
    {
   document.getElementById("speed").innerHTML="speed=2.5x"
   sound.rate(2.5)
    }
    }
    if(scoreleftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20)
    numberleftWristY=Number(leftWristY)
    removeDecimals=floor(numberleftWristY)
    volume=removeDecimals/500
    document.getElementById("Volume").innerHTML="Volume"+volume
    sound.setVolume(volume)
    }
}
function play()
{
    sound.play();
    sound.setVolume(1)
    sound.rate(1)
}
function modelLoaded()
{
    console.log("model is loaded")
}
function gotPoses(results){
if(results.length>0){
    console.log(results)
    scoreleftWrist=results[0].pose.keypoints[9].score
    scorerightWrist=results[0].pose.keypoints[10].score
    leftWristX=results[0].pose.leftWrist.x
    leftWristY=results[0].pose.leftWrist.y
    rightWristX=results[0].pose.rightWrist.x
    rightWristY=results[0].pose.rightWrist.y
    console.log("the x position of left wrist is"+ leftWristX)
    console.log("the y position of left wrist is"+ leftWristY)
    console.log("the x position of right wrist is"+ rightWristX)
    console.log("the y position of right wrist is"+ rightWristY)
}
}