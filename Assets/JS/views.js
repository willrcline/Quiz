// ? renderStartScreen 
//* dynamically insert start button on page load (create, decorate, append)
function renderStartScreen() {
    var h1El = document.createElement('h1')
    var startButtonEl = document.createElement("button")

    h1El.innerHTML = "Welcome to the Quiz"
    startButtonEl.innerHTML = "Get Started"
    startButtonEl.addEventListener('click', handleStartButton)
    
    mainEl.appendChild(h1El)
    mainEl.appendChild(startButtonEl)
    
}

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
        localStorageKey = "highScores"
        localStorage.setItem(localStorageKey, []);
        clearMain()
        renderHighScoreScreen()
    })

    mainEl.append(h3El)
    mainEl.append(olEl)
    mainEl.append(restartButtonEl)
    mainEl.append(clearHighScoresButtonEl)

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
