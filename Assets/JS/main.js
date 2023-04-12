// import {timer} from "./globalVars"
import {renderStartScreen, renderEndScreen} from './views.js'
import {calculatePercentageScore, clearMain} from './utils.js'

export var globalVars = {
    timerCount: 90,
    userScore: 0,
    questionNumber: 0,
    percentageScore: 0,
    mainEl: document.querySelector('main'),
    isAnswerCorrectEl: document.querySelector('#is-answer-correct'),
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

//? endTimer
//* clearInterval
//* set timerCount to 0 and update on render




//? endQuiz
// * get score and show it (calculateScore)
//* dynamically present input box for initials
//* present submit button
export function endQuiz() {
    calculatePercentageScore()
    clearMain()
    renderEndScreen()
}

renderStartScreen()





