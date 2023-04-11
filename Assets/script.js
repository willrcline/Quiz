// ? Create data structure with the questions, options, and correct answers
const quizData = [
    {
        question: "Who is known as the 'Father of Computers'?",
        options: ["Charles Babbage", "Alan Turing", "John von Neumann", "Ada Lovelace"],
        answer: "Charles Babbage"
    },
    {
        question: "Who is considered the first computer programmer?",
        options: ["Charles Babbage", "Grace Hopper", "Ada Lovelace", "Alan Turing"],
        answer: "Ada Lovelace"
    },
    {
        question: "What was the first electronic general-purpose computer called?",
        options: ["UNIVAC", "ENIAC", "EDVAC", "IBM 701"],
        answer: "ENIAC"
    },
    {
        question: "In what year was the World Wide Web invented?",
        options: ["1989", "1990", "1991", "1992"],
        answer: "1989"
    },
    {
        question: "What was the first commercially successful graphical user interface (GUI) computer?",
        options: ["Apple Lisa", "IBM PC", "Xerox Alto", "Apple Macintosh"],
        answer: "Apple Macintosh"
    }
];


// ? timer
var timer
var timerCount = 90
var userScore = 0
var questionNumber = 0
var percentageScore

var mainEl = document.querySelector('main')
var isAnswerCorrectEl = document.querySelector('#is-answer-correct')
//* var highestPossibleScore = questionsOptionsAnswers.length

renderStartScreen()

// ? renderStartScreen 
//* dynamically insert start button on page load (create, decorate, append)
function renderStartScreen() {
    var h1El = document.createElement('h1')
    var startButtonEl = document.createElement("button")

    h1El.innerHTML = "Welcome to the Quiz"
    startButtonEl.id = "start-button"
    startButtonEl.innerHTML = "Get Started"
    
    mainEl.appendChild(h1El)
    mainEl.appendChild(startButtonEl)
    
}

function clearMain() {
    while (mainEl.firstChild) {
        mainEl.removeChild(mainEl.firstChild);
    }
}


// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score



//? timer
//* create interval
//* decrement count var  
//* update on screen 
//* clear interval
    // if (timerCount === 0) {
    //     // Clears interval
    //     clearInterval(timer);
    //     endQuiz();
    // }







//?renderNextQuestion
//* create, decorate append
//* increment questionNumber var
function renderNextQuestion() {

    var questionEl = document.createElement("h2")
    var optionsEl = document.createElement('ol')
    questionEl.innerHTML = quizData[questionNumber].question
    mainEl.appendChild(questionEl)
    mainEl.appendChild(optionsEl)

    for (i = 0; i < 4; i++) {
        var liEl = document.createElement('li')
        var optionEl = document.createElement('button')
        optionEl.innerHTML = quizData[questionNumber].options[i]
        liEl.append(optionEl)
        optionsEl.append(liEl)
        optionEl.addEventListener('click', submitAnswer)
    }


    questionNumber ++
}



//?renderHighscore
//* localStorage.get()
//* dynamically render list items

//? endTimer
//* clearInterval
//* set timerCount to 0 and update on render

//? endQuiz
// * get score and show it (calculateScore)
//* dynamically present input box for initials
//* present submit button
function endQuiz() {
    calculatePercentageScore()
    clearMain()
    renderEndScreen()
}

//? calculateScore
//* return (userScore / highestPossibleScore ) * 100
function calculatePercentageScore() {
    percentageScore = (userScore / quizData.length ) * 100
    return percentageScore
}

function renderEndScreen() {
    var allDoneH2El = document.createElement("h2")
    var scoreEl = document.createElement("h3")
    var labelForInitialsInputEl = document.createElement("label")
    var initialsInputEl = document.createElement("input")
    var submitButtonEl = document.createElement("button")
    allDoneH2El.innerHTML = "All Done!"
    scoreEl.innerHTML = "Your score: " + percentageScore
    initialsInputEl.id = 'initials-input'
    labelForInitialsInputEl.for = "initials-input"
    labelForInitialsInputEl.innerHTML = "Enter Initials:"
    submitButtonEl.innerHTML = "Submit"
    submitButtonEl.addEventListener('click', handleEndScreenSubmit)

    mainEl.append(allDoneH2El)
    mainEl.append(scoreEl)
    mainEl.append(labelForInitialsInputEl)
    mainEl.append(initialsInputEl)
    mainEl.append(submitButtonEl)
}

//?

//?event listener for submitInitials
//? submitInitials
//* .get() then add to highscores object in local storage (localstorage.set(list))
//* renderHighscore()
function handleEndScreenSubmit() {
    var userInitials = document.querySelector("#initials-input").value
    userScoreObj = createObjectOfUserScore(userInitials)
    addScoreToLocalStorage(userScoreObj)
    clearMain()
    renderHighScoreScreen() 
}

function renderHighScoreScreen() {
    var h3El = document.createElement("h3")
    var olEl = document.createElement('ol')
    var restartButtonEl = document.createElement('button')
    var clearHighScoresButtonEl = document.createElement('button')
    
    h3El.innerHTML = "High Scores"
    restartButtonEl.innerHTML = "Play Again"
    restartButtonEl.id = 'restart-quiz-button'
    restartButtonEl.addEventListener("click", function () {
        clearMain()
        renderStartScreen()
    })
    clearHighScoresButtonEl.innerHTML = "Clear High Scores"
    clearHighScoresButtonEl.id = "clear-high-scores-button"
    clearHighScoresButtonEl.addEventListener('click', function () {
        renderHighScoreScreen()
        localStorageKey = "highScores"
        localStorage.setItem(localStorageKey, []);
    })

    mainEl.append(h3El)
    mainEl.append(olEl)
    mainEl.append(restartButtonEl)
    mainEl.append(clearHighScoresButtonEl)

    var highScoresData = getHighScoresFromLocalStorage
    console.log(highScoresData.type)
    for (scoreEntry of highScoresData) {
        var ulEl = document.createElement("ul")
        var initialsliEl = document.createElement('li')
        var scoreliEl = document.createElement('li')

        initialsliEl.innerHTML = scoreEntry.initials
        scoreliEl.innerHTML = scoreEntry.percentageScore
        
        ulEl.append(initialsliEl)
        ulEl.append(scoreliEl)
        olEl.append(ulEl)
    }

}


function createObjectOfUserScore(userInitials) {
    var userScoreObj = {
        "initials": userInitials,
        "percentageScore": percentageScore
    }
    return userScoreObj
}

function getHighScoresFromLocalStorage() {
    var localStorageKey = "highScores"
    const highScoresJSON = localStorage.getItem(localStorageKey);
    let highScoresData = highScoresJSON ? JSON.parse(highScoresJSON) : [];

    return highScoresData
}

function addScoreToLocalStorage(score) {
    var localStorageKey = "highScores"
    highScoresData = getHighScoresFromLocalStorage()
    highScoresData.push(score);
    localStorage.setItem(localStorageKey, JSON.stringify(highScoresData));
}


//? submitAnswer
//* compare selected option to right answer
// * if wrong answer inputted then momentarily insert "wrong" using setTimeout()
// setTimeout(() => {
//     hideCode();
//   }, 3000);
//* and subtract time from timer
//* if right answer, 
//* increment userSore and insert "correct answer"
//* if the question index doesn't exceed the length of the quiz
//*render next question
//* otherwise, endQuiz()
function submitAnswer(e) {
    var chosenOption = e.currentTarget.innerHTML
    if (questionNumber < quizData.length) {
        if (chosenOption == quizData[questionNumber -1].answer) {
            userScore ++
            renderWhetherAnswerIsCorrect(true)
        } else {
            timerCount -= 5
            renderWhetherAnswerIsCorrect(false)
        }
        clearMain()
        renderNextQuestion()
    } else {
        clearMain()
        endQuiz()
    }


}

function renderWhetherAnswerIsCorrect(answerIsCorrect) {
    if (answerIsCorrect) {
        isAnswerCorrectEl.innerHTML = "Correct!"
    } else {
        isAnswerCorrectEl.innerHTML = "Wrong answer"
    }
    setTimeout(() => {
        isAnswerCorrectEl.innerHTML = ""
        isAnswerCorrectEl.style
    }, 3000);
}


// ? event listener for start button
// ? startQuiz function
// * set vars to initial state
// * start timer()
//* renderNextQuestion

document.querySelector('#start-button').addEventListener('click', () => {
    clearMain()
    renderNextQuestion()
})