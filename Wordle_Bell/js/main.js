document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    let word;
    let mean;
    let isFinished = 0;
    getNewWord();

    let guessedWords = [[]];
    let availableSpace = 1;
    
    let guessedWordCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');

    function getNewWord() {
        const Wordlist = ["diary","water","woman"];
        const Meanlist = ["다이어리","물","여성"];
        let random = Math.floor(Math.random()*3);
        word = Wordlist[random];
        mean = Meanlist[random];
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !==5) {
            window.alert("Word must be 5 letters");
            return;
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });


        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert(`Congratulations! The Meaning of "${word}" is "${mean}"`);
            isFinished = 1;
        }

        else if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses! The word is ${word}. The Meaning of "${word}" is "${mean}"`);
            isFinished = 1;
        }

        guessedWords.push([]);
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        
        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            if (isFinished == 0) {
                const letter = target.getAttribute("data-key");  

                if (letter === 'enter') {
                    handleSubmitWord();
                    return;
                }

                if (letter === 'del') {
                    if ((guessedWordCount == 0 && availableSpace == 1) || (guessedWordCount == 1 && availableSpace == 6) || (guessedWordCount == 2 && availableSpace == 11) || (guessedWordCount == 3 && availableSpace == 16) || (guessedWordCount == 4 && availableSpace == 21) || (guessedWordCount == 5 && availableSpace == 26)) {
                        return;
                    }
                    handleDeleteLetter();
                    return;
                }
                updateGuessedWords(letter);
            }
            
            
        };
    }

});