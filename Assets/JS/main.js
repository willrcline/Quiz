// import {timer} from "./globalVars"
import {renderStartScreen, renderEndScreen, renderHeader} from './views.js'
import {calculatePercentageScore, clearParentElement, clearScreen} from './utils.js'

export var globalVars = {
    timerID: null,
    timeRemaining: 90,
    userScore: 0,
    questionNumber: 0,
    percentageScore: 0,
    mainEl: document.querySelector('main'),
    isAnswerCorrectEl: document.querySelector('#is-answer-correct'),
    headerEl: document.querySelector("header"),
    quizData: [
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
    ]
}


export function setTimerInterval() {
    globalVars.timerID = setInterval(function timerIncrement() {
        if (globalVars.timeRemaining >= 0) {
            clearParentElement(globalVars.headerEl)
            renderHeader()
            // ToDO: instead of running renderHeader() over and over, just change the innerHTML of the timer display
            // var timerEl = document.querySelector("#timer")
            // timerEl.innerHTML = "Time: " + globalVars.timeRemaining
        } else {
            clearInterval(globalVars.timerID)
            endQuiz()
        }
        globalVars.timeRemaining --
    }, 1000);
}

export function endQuiz() {
    clearInterval(globalVars.timerID)
    calculatePercentageScore()
    clearScreen()
    renderEndScreen()
}

renderStartScreen()





