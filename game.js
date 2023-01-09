var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var started=false;
var level=0;


$(document).keydown(function(){
    if(started==false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var selectColor=$("#"+randomChosenColor);
    selectColor.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor){
    var currentChoosenColor=$("#"+currentColor);
    currentChoosenColor.addClass("pressed");
    setTimeout(function(){
        currentChoosenColor.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        var lostAudio=new Audio("sounds/wrong.mp3");
        lostAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        console.log("Wrong");
        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
