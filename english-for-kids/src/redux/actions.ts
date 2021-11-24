import {CARD_FLIPPED, CARD_MODE, CHANGE_THEME, CHECKED_ANSWER, GAME_OVER, START_GAME,} from "./types";

export function changeTheme(newTheme: string) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}

export function changeMode(modeGame: string) {
    return {
        type: CARD_MODE,
        payload: modeGame
    }
}

export function flipCard(flipCard: boolean) {
    return {
        type: CARD_FLIPPED,
        payload: flipCard
    }
}

export function checkAnswer(checkAnswer: string) {
    return {
        type: CHECKED_ANSWER,
        payload: checkAnswer
    }
}

export function startGame(startGame: boolean) {
    return {
        type: START_GAME,
        payload: startGame
    }
}

export function gameOver(gameOver: boolean) {
    return {
        type: GAME_OVER,
        payload: gameOver
    }
}