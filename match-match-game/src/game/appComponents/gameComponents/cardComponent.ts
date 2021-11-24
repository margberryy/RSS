import {f} from '../../../dom';
import {Component} from './component';
import {Card} from '../../Card';

export { CardComponent as default };
 export class CardComponent extends Component {
    element: HTMLElement;
    
    index: number;
    
    imageUrl: string;
    
    cardFront: HTMLElement;

    constructor(imageUrl: string, index: number) {
        super('div', 'card_container');
        this.index = index;
        this.imageUrl = imageUrl;

        const card = f.create(this.element, 'div', 'card');
        this.cardFront = f.create(card, 'div', 'card_front');
        this.cardFront.style.backgroundImage = `url('./assets/${imageUrl}`;
        f.create(card, 'div', 'card_back');
    }

    render(): HTMLElement {
        return this.element;
    }

    update(state: Card): void {
        if (state.isOpened) {
            this.flipToFront();
        } else {
            this.flipToBack();
        }
    }

    highlightAsGuess(): void {
        this.cardFront.classList.add('guessed');
    }

    highlightAsWrongGuess(): void {
        this.cardFront.classList.add('error');
        setTimeout(() => this.cardFront.classList.remove('error'), 500);
    }


    flipToBack(): void {
        this.element.firstElementChild.classList.remove('flipped');
    }

    flipToFront(): void {
        this.element.firstElementChild.classList.add('flipped');
    }

    onClick(handler: (i: number) => void): void {
        this.element.addEventListener('click', () => {
            console.log(`onClick ${  this.index}`);

            handler(this.index);
        });
    }
}