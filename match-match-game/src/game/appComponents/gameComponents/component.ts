export { Component as default };
export class Component {
    readonly element: HTMLElement;

    constructor(tag: keyof HTMLElementTagNameMap = 'div', className: string) {
        this.element = document.createElement(tag);
        this.element.classList.add(className);
    }


}