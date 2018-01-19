function SaySomething(thingToSay) {
    utterance = new SpeechSynthesisUtterance(thingToSay);
    utterance.voice = speechSynthesis.getVoices()[1];
    speechSynthesis.speak(utterance);

    if (speechSynthesis.paused) { /* unpause/resume narration */
        speechSynthesis.resume();
    }
}