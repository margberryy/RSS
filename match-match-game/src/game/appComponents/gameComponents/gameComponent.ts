import {CardComponent} from './cardComponent';
import {Timer} from './timer';
import {State} from '../../State';
import {Card} from '../../Card';
import {f} from '../../../dom';

export { GameComponent as default };
 export class GameComponent {
    private cards: CardComponent[] = [];
    
    render(): HTMLElement {
        this.cards = [];

        const parent = document.createElement('div');

        new Timer(parent).startTimer();

         const cardsWrap = f.create(parent, 'div', 'cards_wrapper');
         const d = State.instance().difficulty;
        if (d === '6 х 6') {
            cardsWrap.style.width = '100%';
        }
        State.instance().cards
            .map(card => new CardComponent(card.image, card.index))
            .forEach(cardComponent => {
                this.cards.push(cardComponent);
                cardComponent.onClick((index: number) => State.instance().handleCardClick(index));
                cardsWrap.appendChild(cardComponent.render());
            });

        State.instance().subscribeOn(State.Events.CardFlipped,
            (cardState: Card) =>
                this.cards.filter(c => c.index === cardState.index).forEach(c => c.update(cardState)));

        State.instance().subscribeOn(State.Events.CardGuessed,
            (cardState: Card) =>
                this.cards.filter(c => c.index === cardState.index).forEach(c => c.highlightAsGuess()));

        State.instance().subscribeOn(State.Events.CardMisGuessed,
            (cardState: Card) =>
                this.cards.filter(c => c.index === cardState.index).forEach(c => c.highlightAsWrongGuess()));

        return parent;
    }

}
