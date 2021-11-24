import './GameField.css';
import {create, makeRandomArr, playSound} from "../../util";
import {CardTheme} from "./Cards/CardTheme/CardTheme";
import {CardWord} from "./Cards/CardWord/CardWord";
import {State} from "../../State";
import {changeMode, changeTheme, gameOver, startGame} from "../../redux/actions";
import {Game} from "../Game";

export class GameField {
    state = State.instance();

    app = create('div', 'main');
    private static createdInstance: GameField;


    public static instance(): GameField {

        if (!GameField.createdInstance) {
            GameField.createdInstance = new GameField();
        }
        return GameField.createdInstance;

    }

    cleanCardField() {
        while (this.app.firstChild) {
            this.app.removeChild(this.app.firstChild);
        }

        return this.app;
    }

    renderThemes(): HTMLElement {
        this.cleanCardField();
        this.state.CardsTheme.map(cardName => new CardTheme(cardName))
            .forEach(currentCard => {
                this.app.insertAdjacentHTML('afterbegin', currentCard.card);
            });

        return this.app;
    }


    renderCards(index: number, className: string) {
        this.cleanCardField();
        const cards = this.state.Cards[index];
        cards.map(element => {

            const card = new CardWord().render(element.image, element.word, element.translation, className);
            this.app.append(card);
            this.state.currentCards.push(card);
        });
        const btnStartGame = create('button', 'btn_start', 'start');
        this.app.append(btnStartGame);

        const btnRepeatWord = create('button', 'btn_repeat', '');
        const img = create('img') as HTMLImageElement;
        img.src = 'assets/play.png';
        btnRepeatWord.textContent = '';
        btnRepeatWord.append(img);
        this.app.append(btnRepeatWord);

        btnStartGame.addEventListener('click', this.startNewGame.bind(this));

        btnRepeatWord.addEventListener('click', () => Game.instance().playGame());

        this.state.store.subscribe(() => {
            const state = this.state.store.getState();
            if (state.mode.value === 'play') {
                btnStartGame.style.display = 'none';
                btnRepeatWord.style.display = 'block';
            }
            if(state.endGame.value === true){
                btnRepeatWord.style.display = 'none';
                btnStartGame.style.display = 'block';

            }

        })
        return this.app;
    }
    renderGameOver(countOfErrors:number):void{
            this.cleanCardField();

            if (countOfErrors > 0) {
                const failedImg = create('img', 'img_fail') as HTMLImageElement;
                failedImg.src = 'assets/failedGame.png';
                const text = create('div', 'count_errors', `you have made ${countOfErrors} errors. try again!`);
                this.app.append(text);
                this.app.append(failedImg);
                playSound('assets/music/failedGame.mp3');
            } else {
                const winnerImg = create('img', 'img_fail') as HTMLImageElement;
                winnerImg.src = 'assets/winGame.png';
                const text = create('div', 'count_errors', `Good job!`);
                this.app.append(text);
                this.app.append(winnerImg);
                playSound('assets/music/clapping.mp3');

            }
            setTimeout(() => {
                this.cleanCardField();
                this.renderThemes();
                this.state.store.dispatch(gameOver(true));
                this.state.store.dispatch(changeMode('train'));
            }, 3000);
    }
    startNewGame() {
        this.state.store.dispatch(changeTheme('dark'));
        this.state.store.dispatch(changeMode('play'));
        this.state.store.dispatch(startGame(true));
        Game.instance().error = 0;
        Game.instance().indexWord =0;
        Game.instance().randomCards =  Game.instance().getCurrentTheme().sort(makeRandomArr);
        Game.instance().startGame();

    }


}

