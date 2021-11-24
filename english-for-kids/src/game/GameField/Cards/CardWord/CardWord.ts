import './CardWord.css';

import {create, playSound} from "../../../../util";


export class CardWord {


    render(src: string, nameEng: string, nameRus: string, className:string): HTMLElement {
        const cardContainer = create('div', `card_container ${className}`);
        const card = create('div', 'card');
        cardContainer.id = `${nameEng}`;
        const cardFront = create('div', 'card_front');
        const cardFBack = create('div', 'card_back');
        const cardImgBack = create('img', 'card__img') as HTMLImageElement;
        cardImgBack.src = `${src}`;
        cardImgBack.setAttribute('alt', `${nameEng}`);
        const cardImgFront = create('img', 'card__img') as HTMLImageElement;
        cardImgFront.src = `${src}`;
        cardImgFront.setAttribute('alt', `${nameEng}`);
        const cardNameEng = create('div', 'card__name', `${nameEng}`);
        const cardNameRus = create('div', 'card__name', `${nameRus}`);
        const cardTurn = create('img', 'card__turn') as HTMLImageElement;
        cardTurn.src = 'assets/Vector.png';
        cardTurn.setAttribute('alt', 'cardTurn');

        cardContainer.append(card);
        card.append(cardFront);
        cardFront.append(cardImgFront);
        cardFront.append(cardNameEng);
        cardNameEng.append(cardTurn);


        card.append(cardFBack);
        cardFBack.append(cardImgBack);
        cardFBack.append(cardNameRus);

        cardTurn.addEventListener('click', () => {
            playSound(`https://wooordhunt.ru/data/sound/sow/uk/${cardContainer.id}.mp3`)
            this.flipToBack(card);
        });

        return cardContainer;
    }

    flipToFront(card: Element): void {
        card.classList.remove('flipped');

    }

    flipToBack(card: Element): void {
        card.classList.add('flipped');
    }


}