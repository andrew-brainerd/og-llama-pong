var leftPointCounter = 0;
var rightPointCounter = 0;
var left = 0;
var right = 1;
var server;
var gameStarted = false;
var gameEnded = false;

$(".point-counter").text(0);

$("#leftPointCount").click(function() {
    if (!gameStarted) {
        StartTheGame(left);
    } else {
        IncrementLeftScore();
    }
});

$("#rightPointCount").click(function () {
    if (!gameStarted) {
        StartTheGame(left);
    } else {
        IncrementLeftScore();
    }
});

$(document).keydown(function (e) {
    if (e.which == 37) { // left
        if (!gameStarted) {
            StartTheGame(left);
        } else {
            IncrementLeftScore();
        }
        
    }
    else if (e.which == 39) { // right
        if (!gameStarted) {
            StartTheGame(left);
        } else {
            IncrementRightScore();
        }
    }
});

if (annyang) {
    SaySomething("Welcome to laama Pong. Let's get started");
    SaySomething("Who is serving first, left or right?");

    var commands = {
        "left": function() {
            if (!gameStarted) {
                StartTheGame(left);
            }  
        },
        "right": function() {
            if (!gameStarted) {
                StartTheGame(left);
            }  
        },
        "point left": function() {
            if (gameStarted && !gameEnded) {
                IncrementLeftScore();
            }
        },
        "point right": function() {
            if (gameStarted && !gameEnded) {
                IncrementRightScore();
            }
        }
    };
    annyang.debug();
    annyang.addCallback('error', function() {
        console.error("Annyang error");
    });
    annyang.addCallback('resultMatch', function(heardText) {
        console.log(heardText);
    });
    annyang.addCommands(commands);
    annyang.start({ autoRestart: true, continuous: true });
} else page.css("background", "#001E3D");

function StartTheGame(startingServer, ele, message) {
    server = startingServer;
    var side = (server == left) ? "left" : "right";

    $("#" + side + "PointCount").addClass("serving");
    SaySomething(side + "is serving first. Let's start the game.");
    gameStarted = true;
}

function IncrementRightScore() {
    rightPointCounter++;
    $("#rightPointCount").text(rightPointCounter);
    ProcessScore(leftPointCounter, rightPointCounter);
}

function IncrementLeftScore() {
    leftPointCounter++;
    $("#leftPointCount").text(leftPointCounter);
    ProcessScore(leftPointCounter, rightPointCounter);
}

function ProcessScore(leftScore, rightScore) {
    isMultipleOfFive = (leftScore + rightScore) % 5 == 0;
    isGreaterThanZero = (leftScore + rightScore) > 0;
    iSOverTwentyOne = (leftScore >= 21 || rightScore >= 21);

    if (iSOverTwentyOne) {
        var greaterScore = (leftScore > rightScore) ? leftScore : rightScore;
        var lesserScore = (greaterScore == leftScore) ? rightScore : leftScore;

        if ((greaterScore - lesserScore) >= 2) {
            if (greaterScore == leftScore) {
                player = "Left";
            } else {
                player = "Right";
            }

            gameEnded = true;
            $("body").empty().append("<h1>" + player + " is the winner!</h1>");
            return;
        }
    }

    if (isMultipleOfFive && isGreaterThanZero) {
        server = !server;
        $(".point-counter").toggleClass("serving");
        SaySomething("Switch server");    
    }

    if (server == left) {
        serverScore = leftPointCounter;
        receiverScore = rightPointCounter;
    } else {
        serverScore = rightPointCounter;
        receiverScore = leftPointCounter;
    }

    SaySomething("The score is now " + serverScore + " serving " + receiverScore);   
}