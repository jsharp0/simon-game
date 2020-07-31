var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//Creates Sequence
function nextSequence() {
  var randomNumber = Math.floor(((Math.random())*4));
  var randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  level += 1;
  $("h1").text("Level " + level);
}
//Detects which button the user clicked
$(".btn").click(function(btnClicked) {
  var userChosenColor = btnClicked.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  var userColorIndex = (userClickedPattern.length)-1;
  checkAnswer(userColorIndex);
});

//Plays sounds for buttons in sequence or that user has clicked
function playSound(name) {
  var colorSound = new Audio("sounds/" + name + ".mp3");
  colorSound.play();
}

//Animates button when user clicks it
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Start the game when key is pressed
$(document).keydown(function() {
  if (level == 0) {
    nextSequence();
}
});

//Check user's answer for length and correctness
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 900);
      userClickedPattern.length = 0;
    }
  }
  else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press any key to restart");
    startOver();
  }
}

//Resets stats so game can start over
function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}
