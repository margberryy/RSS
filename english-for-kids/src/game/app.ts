import {Header} from "./Header/Header";
import {GameField} from "./GameField/GameField";
import Location from "../location";
import {create} from "../util";
import {flipCard} from "../redux/actions";
import {CardWord} from "./GameField/Cards/CardWord/CardWord";
import {State} from "../State";

export class App extends Location {
    private body: HTMLBodyElement;
    state = State.instance();
    theme = this.state.CardsTheme;
    store = this.state.store;
    currentCard: HTMLElement;
    wrapper = create('main', 'main');

    constructor() {
        super();
        this.body = document.querySelector('body');
        this.body.append(new Header().render());
        this.registerRoute(Location.Locations.MainPage,
            () => {
                this.cleanField();
                this.body.append(this.wrapper);
                this.wrapper.append(GameField.instance().renderThemes());
            });
        this.registerRoute(Location.Locations.Words,
            () => {
                const className = this.store.getState().mode.value;
                this.body.append(this.wrapper);
                const themeNum = this.theme.indexOf(this.state.actualTheme);
                this.cleanField();
                this.wrapper.append(GameField.instance().renderCards(themeNum, className));
            });

    }

    cleanField(): HTMLElement {
        while (this.wrapper.firstChild) {
            this.wrapper.removeChild(this.wrapper.firstChild);
        }

        return this.wrapper;
    }

    render(): void {

        this.body.append(this.wrapper);

        window.addEventListener('DOMContentLoaded', () => {
            window.location.hash = '/';

            this.wrapper.append(GameField.instance().renderThemes());

        });

        this.wrapper.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            const category = target.closest(".category");
            this.currentCard = target.closest(".card");


            if (category) {
                const themeNum = this.theme.indexOf(category.id);
                this.state.actualTheme = category.id;
                this.cleanField();
                const className = this.store.getState().mode.value;
                this.wrapper.append(GameField.instance().renderCards(themeNum, className));
            }

        });
        this.wrapper.addEventListener("transitionend", () => {
            this.store.dispatch(flipCard(true));
        });
        this.wrapper.addEventListener("mouseout", (event) => {
            const state = this.store.getState();
            if (state.flipped.value) {
                let relatedTarget: Node & ParentNode = event.relatedTarget as HTMLElement;

                while (relatedTarget) {
                    if (relatedTarget == this.currentCard) return;
                    relatedTarget = relatedTarget.parentNode;

                }

                new CardWord().flipToFront(this.currentCard);
                this.store.dispatch(flipCard(false));

            }
        });

    }

}