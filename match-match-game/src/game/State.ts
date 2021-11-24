import { Card } from './Card';


enum Events {
    CardFlipped = 'CardFlipped',
    CardGuessed = 'CardGuessed',
    CardMisGuessed = 'CardMisGuessed',
    userRegistered = 'userRegistered'
}

export { State as default };
export class State {
    public difficulty = '4 x 4';

    public typeCards = 'Animal';

    public gameActive = false;

    public gameLocked = false;

    public cards: Card[];

    private eventsHandlers = new Map<string, ((data: unknown) => void)[]>();

    static readonly Events = Events;

    private static createdInstance: State;

    public static instance(): State {

        if (!State.createdInstance) {
            State.createdInstance = new State();
        }
        return State.createdInstance;

    }

    private imagesUrl: string[] = [];

    public startGame(): void {

        if (this.typeCards === 'Animal') {
            this.imagesUrl = [
                '/animals/elephant.png', '/animals/snake.png', '/animals/turtle.png', '/animals/squid.png',
                '/animals/parrot.png', '/animals/chicken.png', '/animals/deer.png', '/animals/stingray.png',
                '/animals/giraffe.png', '/animals/panda.png', '/animals/penguin.png', '/animals/owl.png'];
        } else if (this.typeCards === 'Fruits & Vegetables') {
            this.imagesUrl = [
                '/fruits_vegetables/avocado.png', '/fruits_vegetables/banana.png', '/fruits_vegetables/beet.png', '/fruits_vegetables/cabbage.png',
                '/fruits_vegetables/cherry.png', '/fruits_vegetables/durian.png', '/fruits_vegetables/grapes.png', '/fruits_vegetables/lemon.png',
                '/fruits_vegetables/mango.png', '/fruits_vegetables/mushroom.png', '/fruits_vegetables/potato.png', '/fruits_vegetables/strawberry.png'];
        }

        let newImagesUrl: string[] = [];
        if (this.difficulty === '4 x 4') {
            newImagesUrl = this.imagesUrl.slice(0, 8);
        } else if (this.difficulty === '6 х 6') {
            newImagesUrl = this.imagesUrl;
        }

        this.cards = [];
        const cardUrls = newImagesUrl
            .concat(newImagesUrl)
            .sort(() => Math.random() - 0.5);
        for (let i = 0; i < cardUrls.length; i += 1) {
            this.cards.push(new Card(cardUrls[i], i));
        }
        this.gameActive = true;
    }

    handleCardClick(index: number): void {
        if (this.gameLocked) return;

        const currentCard = this.cards.find(c => c.index === index);
        const openedCard = this.cards.find(c => c.isOpened && c.index !== currentCard.index && !c.guessed);
        const anyOtherCardIsAlreadyOpened: boolean = openedCard !== undefined;

        if (anyOtherCardIsAlreadyOpened) {
            this.gameLocked = true;
            currentCard.setIsOpened(true)
            this.publish(Events.CardFlipped, currentCard);

            if (openedCard.image === currentCard.image) {
                currentCard.guessed = true;
                openedCard.guessed = true;
                setTimeout(() => {
                    this.publish(Events.CardGuessed, openedCard);
                    this.publish(Events.CardGuessed, currentCard);
                    this.gameLocked = false;
                    if (this.cards.filter(c => c.guessed === false).length === 0) {
                        alert('Congratulations !!!');
                    }
                }, 1000);
            } else {
                setTimeout(() => {
                    this.publish(Events.CardMisGuessed, openedCard);
                    this.publish(Events.CardMisGuessed, currentCard);
                }, 1000);
                setTimeout(() => {
                    this.closeNonGuessedCards();
                    this.publish(Events.CardFlipped, openedCard);
                    this.publish(Events.CardFlipped, currentCard);
                    this.gameLocked = false;
                }, 1500);
            }
        } else {
            this.cards.filter(card=> card.index === index).forEach(item => {
                item.setIsOpened(true);
                this.publish(Events.CardFlipped, item);
            });

        }
    }

    subscribeOn(eventName: Events, callback: (data: unknown) => void): void {
        if (!this.eventsHandlers.has(eventName)) {
            this.eventsHandlers.set(eventName, []);
        }
        this.eventsHandlers.get(eventName).push(callback);
    }

    publish(eventName: Events, data: unknown): void {
        if (this.eventsHandlers.has(eventName)) {
            this.eventsHandlers.get(eventName).forEach(handler => handler(data));
        }
    }

    private closeNonGuessedCards() {
        this.cards.filter(c => !c.guessed).forEach(c => c.setIsOpened(false));
    }
}
