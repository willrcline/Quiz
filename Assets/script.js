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

var mainEl = document.querySelector('main')
var isAnswerCorrectEl = document.querySelector('#is-answer-correct')
//* var highestPossibleScore = questionsOptionsAnswers.length

displayStartScreen()

// ? displayStartScreen 
//* dynamically insert start button on page load (create, decorate, append)
function displayStartScreen() {
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



//? calculateScore
//* return (userScore / highestPossibleScore ) * 100



//?displayNextQuestion
//* create, decorate append
//* increment questionNumber var
function displayNextQuestion() {

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



//?displayHighscore
//* localStorage.get()
//* dynamically display list items

//? endTimer
//* clearInterval
//* set timerCount to 0 and update on display

//? endQuiz
// * get score and show it (calculateScore)
//* dynamically present input box for initials
//* present submit button
function endQuiz() {
    var inputEl = document.createElement("input")
    var submitButtonEl = document.createElement("button")
}

//?

//?event listener for submitInitials
//? submitInitials
//* .get() then add to highscores object in local storage (localstorage.set(list))
//* displayHighscore()


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
//*display next question
//* otherwise, endQuiz()
function submitAnswer(e) {
    var chosenOption = e.currentTarget.innerHTML
    if (questionNumber < quizData.length) {
        if (chosenOption == quizData[questionNumber -1].answer) {
            userScore ++
            displayWhetherAnswerIsCorrect(true)
        } else {
            timerCount -= 5
            displayWhetherAnswerIsCorrect(false)
        }
        clearMain()
        displayNextQuestion()
    } else {
        clearMain()
        endQuiz()
    }


}

function displayWhetherAnswerIsCorrect(answerIsCorrect) {
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
//* displayNextQuestion

document.querySelector('#start-button').addEventListener('click', () => {
    clearMain()
    displayNextQuestion()
})