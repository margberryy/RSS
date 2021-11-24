export { Card as default };
export class Card {
    private opened = false;

    public guessed = false;

    public image: string;

    public index: number;

    constructor(image: string, index: number) {
        this.image = image;
        this.index = index;
    }

    public setIsOpened(isOpened: boolean): void {
        this.opened = isOpened;
    }

    get isOpened(): boolean {
        return this.opened;
    }
}