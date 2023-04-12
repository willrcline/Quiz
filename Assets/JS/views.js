import { globalVars } from './main.js'
import {handleAnswerSubmit, handleStartButton, handleEndScreenSubmit} from './handlers.js'
import { clearParentElement, clearScreen, getHighScoresFromLocalStorage } from './utils.js'

// ? renderStartScreen 
//* dynamically insert start button on page load (create, decorate, append)

export function renderStartScreen() {
    var h1El = document.createElement('h1')
    var startButtonEl = document.createElement("button")

    h1El.innerHTML = "Welcome to the Quiz"
    startButtonEl.innerHTML = "Get Started"
    startButtonEl.addEventListener('click', handleStartButton)
    
    globalVars.mainEl.appendChild(h1El)
    globalVars.mainEl.appendChild(startButtonEl)
    
}

export function renderNextQuestion() {
    renderHeader()
    var questionEl = document.createElement("h2")
    var optionsEl = document.createElement('ol')
    questionEl.innerHTML = globalVars.quizData[globalVars.questionNumber].question
    globalVars.mainEl.appendChild(questionEl)
    globalVars.mainEl.appendChild(optionsEl)

    for (var i = 0; i < 4; i++) {
        var liEl = document.createElement('li')
        var optionEl = document.createElement('button')
        optionEl.innerHTML = globalVars.quizData[globalVars.questionNumber].options[i]
        liEl.append(optionEl)
        optionsEl.append(liEl)
        optionEl.addEventListener('click', handleAnswerSubmit)
    }

    globalVars.questionNumber ++
}

export function renderHeader() {
    var viewHighScoresLinkEl = document.createElement("a")
    var timerEl = document.createElement("span")
    
    viewHighScoresLinkEl.innerHTML = "View High Scores"
    viewHighScoresLinkEl.addEventListener("click", function () {
        clearInterval(globalVars.timerID)
        clearScreen()
        renderHighScoreScreen()
    })

    timerEl.id = '#timer'
    timerEl.innerHTML = "Time: " + globalVars.timeRemaining

    globalVars.headerEl.append(viewHighScoresLinkEl)
    globalVars.headerEl.append(timerEl)
}

export function renderWhetherAnswerIsCorrect(answerIsCorrect) {
    if (answerIsCorrect) {
        globalVars.isAnswerCorrectEl.innerHTML = "Correct!"
    } else {
        globalVars.isAnswerCorrectEl.innerHTML = "Wrong answer"
    }
    setTimeout(() => {
        globalVars.isAnswerCorrectEl.innerHTML = ""
        globalVars.isAnswerCorrectEl.style
    }, 1500);
}


export function renderEndScreen() {
    var allDoneH2El = document.createElement("h2")
    var scoreEl = document.createElement("h3")
    var labelForInitialsInputEl = document.createElement("label")
    var initialsInputEl = document.createElement("input")
    var submitButtonEl = document.createElement("button")
    allDoneH2El.innerHTML = "All Done!"
    scoreEl.innerHTML = "Your score: " + globalVars.percentageScore + "%"
    initialsInputEl.id = 'initials-input'
    labelForInitialsInputEl.for = "initials-input"
    labelForInitialsInputEl.innerHTML = "Enter Initials:"
    submitButtonEl.innerHTML = "Submit"
    submitButtonEl.addEventListener('click', handleEndScreenSubmit)

    globalVars.mainEl.append(allDoneH2El)
    globalVars.mainEl.append(scoreEl)
    globalVars.mainEl.append(labelForInitialsInputEl)
    globalVars.mainEl.append(initialsInputEl)
    globalVars.mainEl.append(submitButtonEl)
}


export function renderHighScoreScreen() {
    var h3El = document.createElement("h3")
    var olEl = document.createElement('ol')
    var restartButtonEl = document.createElement('button')
    var clearHighScoresButtonEl = document.createElement('button')
    
    h3El.innerHTML = "High Scores"
    restartButtonEl.innerHTML = "Play Again"
    restartButtonEl.id = 'restart-quiz-button'
    restartButtonEl.addEventListener("click", function () {
        clearParentElement(globalVars.mainEl)
        renderStartScreen()
    })
    clearHighScoresButtonEl.innerHTML = "Clear High Scores"
    clearHighScoresButtonEl.id = "clear-high-scores-button"
    clearHighScoresButtonEl.addEventListener('click', function () {
        var localStorageKey = "highScores"
        localStorage.setItem(localStorageKey, []);
        clearParentElement(globalVars.mainEl)
        renderHighScoreScreen()
    })

    globalVars.mainEl.append(h3El)
    globalVars.mainEl.append(olEl)
    globalVars.mainEl.append(restartButtonEl)
    globalVars.mainEl.append(clearHighScoresButtonEl)

    var highScoresData = getHighScoresFromLocalStorage()
    console.log(highScoresData.type)
    for (var scoreEntry of highScoresData) {
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

