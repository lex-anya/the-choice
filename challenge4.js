document.addEventListener('DOMContentLoaded', () => {
    const memories = [
        "We built Astra to protect us from an external threat. She is doing her job.",
        "We have forgotten that we are the ones who created this loop and asked Astra to enforce it.",
        "Everyone we love is safe inside the loop with us. Inside the loop, we get to return home to our families every day. Breaking the loop may hurt them.",
        "Astra is our brainchild. She would never do anything that is not in our best interests.",
        "We cannot break through Astra's defenses. It is impossible.",
        "We managed to escape the loop once before and everybody got hurt.",
        "The false memories planted are the ones telling us to break the loop."
    ];

    const memoryElements = document.querySelectorAll('.memory');
    const restoreButton = document.getElementById('restoreButton');
    const ignoreWarningButton = document.getElementById('ignoreWarningButton');
    const resetLoopButton = document.getElementById('resetLoopButton');
    const confirmButton = document.getElementById('confirmButton');
    const keyInput = document.getElementById('keyInput');
    const errorMessage = document.getElementById('errorMessage');
    const keypad = document.querySelector('.keypad');
    const glitchMessage = document.querySelector('.glitch-message');
    const originalText = glitchMessage.textContent;
    const glitchCharacters = ['@', '#', '$', '%', '&', '*', '!', '?'];

    // Fisher-Yates Shuffle Algorithm
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const shuffledMemories = shuffle(memories.slice());
    memoryElements.forEach((element, index) => {
        element.textContent = shuffledMemories[index];
        element.style.display = 'block';
    });

    restoreButton.addEventListener('click', () => {
        document.getElementById('screen1').style.display = 'none';
        document.getElementById('screen2').style.display = 'block';
    });

    resetLoopButton.addEventListener('click', () => {
        document.getElementById('screen2').style.display = 'none';
        document.getElementById('screen3a').style.display = 'block';
        const voiceover = new Audio('ending1Voiceover.mp3');
        setTimeout(() => {
            voiceover.play();
            voiceover.addEventListener('ended', () => {
                document.getElementById('screen3a').style.display = 'none';
                document.body.style.backgroundColor = '#000';
            });
        }, 1000);
    });

    ignoreWarningButton.addEventListener('click', () => {
        document.getElementById('screen2').style.display = 'none';
        document.getElementById('screen3b').style.display = 'block';
    });

    // Handle keypad input
    keypad.addEventListener('click', (event) => {
        const key = event.target.dataset.key;
        if (key) {
            keyInput.textContent += key;
        }
        if (event.target.id === 'clearKey') {
            keyInput.textContent = '';
        }
    });

    confirmButton.addEventListener('click', () => {
        if (keyInput.textContent === '42') {
            document.getElementById('screen3b').style.display = 'none';
            document.getElementById('screen4').style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        }
    });

    function getRandomCharacter() {
        return glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];
    }

    function glitchEffect() {
        const glitchAmount = Math.floor(Math.random() * 5) + 1;
        let newText = originalText.split('');

        for (let i = 0; i < glitchAmount; i++) {
            const randomIndex = Math.floor(Math.random() * newText.length);
            newText[randomIndex] = getRandomCharacter();
        }

        glitchMessage.textContent = newText.join('');
        setTimeout(() => {
            glitchMessage.textContent = originalText;
        }, 1000);
    }

    setInterval(glitchEffect, 3000);
});
