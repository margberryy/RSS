import {CARD_FLIPPED, CARD_MODE, CHANGE_THEME, CHECKED_ANSWER, GAME_OVER, START_GAME} from "./types";
import {combineReducers} from "redux";


const initialThemeState = {
    value: '',
    disabled: false
}
const initialCardState = {
    value: false,
    disabled: false
}
const initialModeGame = {
    value: '',
    disabled: false
}
const initialAnswer = {
    value: '',
    disabled: false
}
const initialStateGame = {
    value: false,
    disabled: false
}
const initialEndGame = {
    value: false,
    disabled: false
}

function themeReducer(state = initialThemeState, action: { type: string, payload: string }) {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}

        default:
            return state
    }
}

function changeMode(state = initialModeGame, action: { type: string, payload: string }) {
    switch (action.type) {
        case CARD_MODE:
            return {...state, value: action.payload}

        default:
            return state
    }
}

function flipCard(state = initialCardState, action: { type: string, payload: string }) {
    switch (action.type) {
        case CARD_FLIPPED:
            return {...state, value: action.payload}

        default:
            return state
    }
}

function checkAnswer(state = initialAnswer, action: { type: string, payload: string }) {
    switch (action.type) {
        case CHECKED_ANSWER:
            return {...state, value: action.payload}

        default:
            return state
    }
}

function startGame(state = initialStateGame, action: { type: string, payload: boolean }) {
    switch (action.type) {
        case START_GAME:
            return {...state, value: action.payload}

        default:
            return state
    }
}

function gameOver(state = initialEndGame, action: { type: string, payload: boolean }){
    switch (action.type) {
        case GAME_OVER:
            return {...state, value: action.payload}

        default:
            return state
    }
}

export const rootReducer = combineReducers({
    flipped: flipCard,
    theme: themeReducer,
    mode: changeMode,
    answer: checkAnswer,
    startGame: startGame,
    endGame: gameOver,
})