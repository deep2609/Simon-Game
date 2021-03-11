

var name = prompt("Enter player name");
$("#Name").text("Player : "+name);


//        Assigning indices to colors
var buttoncolors = ["green", "red", "yellow", "blue"];

var gamePattern = []; // Pattern of the game

var userClickedPattern = []; // User clicks so far

var started = false;
var level = 0;

 var bestScore = 0;
// Press any key to start the game
$(document).keypress(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Listens out for any clicks
$(".btn").click(function() {
  var userChosencolor = $(this).attr("id");
  userClickedPattern.push(userChosencolor);
  playSound(userChosencolor);
  buttonAnimation(userChosencolor);
  checkAnswer(userClickedPattern.length - 1);
});

// Matches the sequence so far with the Game Sequence
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    bestScore=Math.max(bestScore,level);
    $("#Score").text("Best Score : "+bestScore);
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Score : " + level+ "! Press Any Key to Restart!");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// Generates a new sequence or if a sequence exists, pushes a new color to the existing sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosencolor = buttoncolors[randomNumber];
  gamePattern.push(randomChosencolor);
  $("#" + randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosencolor);
}

// Animates the button

function buttonAnimation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Plays Sound

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Restart game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
