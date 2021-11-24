export function create(tag: string, className = '', text = ''): HTMLElement {
    const newTag = document.createElement(tag);
    newTag.className = className;
    newTag.innerHTML = text;
    return newTag;
}

export function playSound(src: string): void {
    let audio = new Audio(src);
    audio.play();
}

export function makeRandomArr(): number {
    return Math.random() - 0.5;
}