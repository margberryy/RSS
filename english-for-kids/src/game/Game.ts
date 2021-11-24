import {State} from "../State";
import {checkAnswer, startGame} from "../redux/actions";
import {makeRandomArr, playSound} from "../util";
import {GameField} from "./GameField/GameField";

export class Game {
    state = State.instance();
    private chosenCard: HTMLElement;
    indexWord = 0;
    error=0;
    randomCards = this.getCurrentTheme().sort(makeRandomArr);
    private static createdInstance: Game;


    public static instance(): Game {

        if (!Game.createdInstance) {
            Game.createdInstance = new Game();
        }
        return Game.createdInstance;

    }

    startGame():void {
        this.playWord(this.indexWord);

            this.state.currentCards.map(card =>
                card.addEventListener('click', () => {
                    console.log('card: ' + card.id)
                    this.checkAnswer(card);
                })
            );

        this.state.store.dispatch(startGame(false));
    }

    playGame(): void {
        if(this.indexWord === this.randomCards.length){

            this.stopGame();
        }else {
            this.playWord(this.indexWord);
        }

    }
    stopGame():void{
        GameField.instance().renderGameOver(this.error);
    }

    checkAnswer(card: any):void {
        this.chosenCard = card;
         if (this.chosenCard.id === this.randomCards[this.indexWord].word) {
            this.chosenCard.classList.add('guessed');
            playSound('assets/music/right.mp3');
            this.state.store.dispatch(checkAnswer('correct'));
            this.indexWord++;
            this.playGame();

        } else {
            this.chosenCard.classList.add('error');
             playSound('assets/music/fail.mp3');
            this.state.store.dispatch(checkAnswer('wrong'));
            this.error++;
            setTimeout(() => this.chosenCard.classList.remove('error'), 500);
        }

    }

    getCurrentTheme():{ image: string; audioSrc: string; translation: string; word: string }[] {
        const actualTheme = this.state.actualTheme;
        const numActualTheme = this.state.CardsTheme.indexOf(actualTheme);
        return this.state.Cards[numActualTheme];
    }

    playWord(indexWord: number): void {
        playSound(this.randomCards[indexWord].audioSrc);
    }

}