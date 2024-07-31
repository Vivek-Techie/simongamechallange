var buttonColor = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    // return userChosenColor;  
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
})

$(document).keypress(function(){
    nextSequence();
})

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
        userClickedPattern= [];

      }

    } else {

        var wrongSound=new Audio("sounds/wrong.mp3")
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");  
        startOver(); 
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function nextSequence(){
    level++;
    $("h1").html("Level "+level+"");
    var randomNumber = Math.floor(Math.random()*3+1);
    // return randomNumber;
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
} 



function playSound(name){

    switch (name) {
        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;
        
        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;

        case "red":
            var redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;

        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;
        
        default:
            var wrongSound=new Audio("sounds/wrong.mp3")
            wrongSound.play();
            break;
    }

}