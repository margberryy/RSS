import { f } from '../../dom';
import { State } from '../State';

export { Header as default };
 export class Header {
    parentNode: HTMLElement;

    header: HTMLElement;

    arrMenuItems: Element[];

    btnRegister: HTMLElement;

    btnStartGame: HTMLElement;

    constructor() {
        this.parentNode = document.getElementById('app');
        this.header = f.create(this.parentNode, 'header', 'header');
        this.arrMenuItems = [];

        window.addEventListener('DOMContentLoaded', () => {
            this.arrMenuItems[0].classList.add('active');
        });
    }

    public registerMenuItem(name: string, iconUrl: string, link: string): void {
        this.arrMenuItems.push(
            this.renderMenuItem(name, iconUrl, link)
        );
    }

    renderWrapper(): HTMLElement {
        const logoWrapper = f.create(this.header, 'div', 'logo_wrapper');
        const logo1 = f.create(logoWrapper, 'div', 'logo_1');
        const logo2 = f.create(logoWrapper, 'div', 'logo_2');

        logo1.innerHTML = 'match';
        logo2.innerHTML = 'match';
        const menuWrapper = f.create(this.header, 'nav', 'menu_wrapper');
        const menu = f.create(menuWrapper, 'ul', 'menu');

        const btnRegister = f.create(this.header, 'button', 'btn');
        btnRegister.innerHTML = 'register new player';
        this.btnRegister = btnRegister;

        const btnStartGame = f.create(this.header, 'button', 'btn');
        btnStartGame.innerHTML = 'sart game';
        btnStartGame.style.display = 'none';
        this.btnStartGame = btnStartGame;
        State.instance().subscribeOn(State.Events.userRegistered, () => {
            btnStartGame.style.display = 'block';
            btnRegister.style.display = 'none';
        });
        return menu;
    }

    private renderMenuItem(name: string, iconUrl: string, link: string): Element {
        const menuItem = f.create(document.querySelector('.menu'), 'li', 'menu__item');
        const menuItemIcon = f.create(menuItem, 'img', 'menu__item__icon') as HTMLImageElement;
        menuItemIcon.src = iconUrl;
        const menuItemLink: HTMLElement = f.create(menuItem, 'a', 'menu__item__link');
        menuItemLink.innerHTML = name;
        menuItemLink.setAttribute('href', link);
        menuItem.addEventListener('click', () => {
            menuItemLink.click();
            this.arrMenuItems.forEach(element => element.classList.remove('active'));
            menuItem.classList.add('active');
        });
        return menuItem;
    }


}