import { globalVars } from "./main.js"

export function resetGlobalQuizVars() {
    globalVars.timerCount = 90
    globalVars.userScore = 0
    globalVars.questionNumber = 0
    globalVars.percentageScore = 0
}

export function clearMain() {
    while (globalVars.mainEl.firstChild) {
        globalVars.mainEl.removeChild(globalVars.mainEl.firstChild);
    }
}

export function calculatePercentageScore() {
    globalVars.percentageScore = (globalVars.userScore / globalVars.quizData.length ) * 100
    return globalVars.percentageScore
}


export function createObjectOfUserScore(userInitials) {
    var userScoreObj = {
        "initials": userInitials,
        "percentageScore": globalVars.percentageScore
    }
    return userScoreObj
}

export function getHighScoresFromLocalStorage() {
    var localStorageKey = "highScores"
    const highScoresJSON = localStorage.getItem(localStorageKey);
    let highScoresData = highScoresJSON ? JSON.parse(highScoresJSON) : [];

    return highScoresData
}

export function addScoreToLocalStorage(score) {
    var localStorageKey = "highScores"
    var highScoresData = getHighScoresFromLocalStorage()
    highScoresData.push(score);
    highScoresData.sort(sortingComparisonfunction)
    console.log(highScoresData)
    localStorage.setItem(localStorageKey, JSON.stringify(highScoresData));
}

export function sortingComparisonfunction(a, b) {
    if (a.percentageScore > b.percentageScore) {
        return -1;
    }
    if (a.percentageScore < b.percentageScore) {
        return 1;
    }
    return 0;
}