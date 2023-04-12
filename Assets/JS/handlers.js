import {globalVars, endQuiz} from './main.js'
import { clearMain, resetGlobalQuizVars, createObjectOfUserScore, addScoreToLocalStorage } from "./utils.js"
import { renderNextQuestion, renderHighScoreScreen, renderWhetherAnswerIsCorrect} from './views.js'

export function handleStartButton() {
    clearMain()
    resetGlobalQuizVars()
    renderNextQuestion()
}

export function handleEndScreenSubmit() {
    var userInitials = document.querySelector("#initials-input").value
    var userScoreObj = createObjectOfUserScore(userInitials)
    addScoreToLocalStorage(userScoreObj)
    clearMain()
    renderHighScoreScreen() 
}

export function handleAnswerSubmit(e) {
    var chosenOption = e.currentTarget.innerHTML
    if (globalVars.questionNumber < globalVars.quizData.length) {
        if (chosenOption == globalVars.quizData[globalVars.questionNumber -1].answer) {
            globalVars.userScore ++
            renderWhetherAnswerIsCorrect(true)
        } else {
            globalVars.timerCount -= 5
            renderWhetherAnswerIsCorrect(false)
        }
        clearMain()
        renderNextQuestion()
    } else {
        clearMain()
        endQuiz()
    }
}