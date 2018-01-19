var leftPointCounter = 0;
var rightPointCounter = 0;
var left = 0;
var right = 1;
var server = left;

if (annyang) {
    var commands = {
        "point left": function () {
            leftPointCounter++;
            $("#leftPointCount").text(leftPointCounter);
            ProcessScore(leftPointCounter, rightPointCounter);
        },
        "point right": function () {
            rightPointCounter++;
            $("#rightPointCount").text(rightPointCounter);
            ProcessScore(leftPointCounter, rightPointCounter);
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

function ProcessScore(leftScore, rightScore) {
    isMultipleOfFive = (leftScore + rightScore) % 5 == 0;
    isGreaterThanZero = (leftScore + rightScore) > 0;

    if (isMultipleOfFive && isGreaterThanZero) {
        server = !server;
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