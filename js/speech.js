function SayTheScore(serverScore, receiverScore) {
    if (!flag){
        flag = true;
        var synth = speechSynthesis;
        utterance = new SpeechSynthesisUtterance(
              "The score is now " + serverScore + " to " + receiverScore
            );
        utterance.voice = synth.getVoices()[0];
        utterance.onend = function(){
            flag = false;
        };
        synth.speak(utterance);
    }
    if (synth.paused) { /* unpause/resume narration */
        synth.resume();
    }
}