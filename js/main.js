var leftPointCounter = 0;
var rightPointCounter = 0;
var left = 0;
var right = 1;
var server;
var gameStarted = false;
var gameEnded = false;

$("#leftPointCount").click(function() {
    IncrementLeftScore();
});

$("#rightPointCount").click(function () {
    IncrementRightScore();
});

if (annyang) {
    //SaySomething("Welcome to LLama Pong. Voice commands are enabled. Let's get started");
    SaySomething("Who is serving first, left or right?");

    var commands = {
        "left": function() {
            if (!gameStarted) {
                server = left;
                gameStarted = true;
                $("#leftPointCount").addClass("serving");
                SaySomething("Left is serving first. Let's start the game");
            }  
        },
        "right": function() {
            if (!gameStarted) {
                server = right;
                gameStarted = true;
                $("#rightPointCount").addClass("serving");
                SaySomething("Right is serving first. Let's start the game");
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

    if (isMultipleOfFive && isGreaterThanZero) {
        server = !server;
        if (server == left) {
            $("#rightPointCount").removeClass("serving");
            $("#leftPointCount").addClass("serving");
        } else {
            $("#leftPointCount").removeClass("serving");
            $("#rightPointCount").addClass("serving");
        }
        SaySomething("Switch server");    
    }

    if (server == left) {
        serverScore = leftPointCounter;
        receiverScore = rightPointCounter;
    } else {
        serverScore = rightPointCounter;
        receiverScore = leftPointCounter;
    }

    //SaySomething("The score is now " + serverScore + " serving " + receiverScore);

    if (leftScore == 21 || rightScore == 21) {
        if (leftScore == 21) {
            player = "Left";
        } else {
            player = "Right";
        }

        gameEnded = true;
        $("body").empty().append("<h1>" + player + " is the winner!</h1>");
    }
}