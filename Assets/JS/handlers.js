import {globalVars, endQuiz, setTimerInterval} from './main.js'
import { clearScreen, resetGlobalQuizVars, createObjectOfUserScore, addScoreToLocalStorage, clearParentElement } from "./utils.js"
import { renderNextQuestion, renderHighScoreScreen, renderWhetherAnswerIsCorrect} from './views.js'

export function handleStartButton() {
    clearParentElement(globalVars.mainEl)
    resetGlobalQuizVars()
    setTimerInterval()
    renderNextQuestion()
}

export function handleEndScreenSubmit() {
    var userInitials = document.querySelector("#initials-input").value
    var userScoreObj = createObjectOfUserScore(userInitials)
    addScoreToLocalStorage(userScoreObj)
    clearParentElement(globalVars.mainEl)
    renderHighScoreScreen() 
}

export function handleAnswerSubmit(e) {
    var chosenOption = e.currentTarget.innerHTML
    if (globalVars.questionNumber < globalVars.quizData.length) {
        if (chosenOption == globalVars.quizData[globalVars.questionNumber -1].answer) {
            globalVars.userScore ++
            renderWhetherAnswerIsCorrect(true)
        } else {
            globalVars.timeRemaining -= 5
            renderWhetherAnswerIsCorrect(false)
        }
        clearScreen()
        renderNextQuestion()
    } else {
        clearScreen()
        endQuiz()
    }
}