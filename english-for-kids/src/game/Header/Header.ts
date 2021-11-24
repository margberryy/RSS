import './Header.css';
import {create} from "../../util";

import {changeMode, changeTheme} from "../../redux/actions";

import {State} from "../../State";


export class Header {
    state = State.instance();
    score = create('div', 'score');
    headerBurger = create('div', 'header__burger');
    headerNav = create('nav', 'header__nav');
    overlay = create('div', 'overlay');

    render(): HTMLElement {
        const header = create('header', 'header');
        this.headerBurger = create('div', 'header__burger');
        header.append(this.headerBurger);
        this.headerBurger.append(create('span', 'span'));
        this.renderBurgerMenu();
        header.append(this.headerNav);

        header.append(this.overlay);
        header.append(this.score);

        const switcher = create('label', 'switcher');
        header.append(switcher);

        const switcherField = create('input') as HTMLInputElement;
        switcherField.type = 'checkbox';
        switcher.append(switcherField);
        const slider = create('span', 'slider', '')
        switcher.append(slider);

        this.headerBurger.addEventListener('click', (event) => {
            this.removeBurgerMenu(this.headerBurger, this.headerNav, this.overlay);
        })
        this.overlay.addEventListener('click', () => {
            this.removeBurgerMenu(this.headerBurger, this.headerNav, this.overlay);
        })
        switcher.addEventListener('change', () => {
            let newTheme = '';
            let modeGame = '';

            if (switcherField.checked) {
                newTheme = 'dark';
                modeGame = 'play';
            }

            this.state.store.dispatch(changeTheme(newTheme));
            this.state.store.dispatch(changeMode(modeGame));

        })

        this.state.store.subscribe(() => {
            const state = this.state.store.getState()
            document.body.className = state.theme.value;
            if (state.endGame.value === true) {
                switcherField.checked = false;
                document.body.className = '';
                this.cleanScore();
                slider.innerHTML = 'train';
            } else if (state.mode.value === 'play') {
                slider.innerHTML = 'play';
                this.state.currentCards.forEach(card => card.classList.add('play'));
            } else {

                slider.innerHTML = 'train';
                this.state.currentCards.forEach(card => card.classList.remove('play'));
            }
            const wrongAnswer = create('img') as HTMLImageElement;
            wrongAnswer.src = 'assets/error.png';
            const correctAnswer = create('img') as HTMLImageElement;
            correctAnswer.src = 'assets/correct.png'
            if (state.startGame.value === true) {
                switcherField.checked = true;
            } else if (state.answer.value === 'wrong') {
                this.score.prepend(wrongAnswer);
            } else if (state.answer.value === 'correct') {
                this.score.prepend(correctAnswer);
            }
        })
        this.state.store.dispatch({type: 'INIT_APPLICATION'});
        return header;
    }

    cleanScore(): HTMLElement {
        while (this.score.firstChild) {
            this.score.removeChild(this.score.firstChild);
        }

        return this.score;
    }

    createLIElement(text: string, link: string): HTMLElement {
        const listItem = create('li', 'header__item');
        const linkItem = create('a', 'header__link', text);
        linkItem.setAttribute('href', `#/${link}`);
        listItem.append(linkItem);
        listItem.addEventListener('click', () => this.removeBurgerMenu(this.headerBurger, this.headerNav, this.overlay))
        return listItem;
    }

    removeBurgerMenu(headerBurger: HTMLElement, headerNav: HTMLElement, overlay: HTMLElement): void {
        headerBurger.classList.toggle("active");
        headerNav.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    renderBurgerMenu(): void {

        const headerList = create('ul', 'header__list');
        this.headerNav.append(headerList);
        const themes = new State().CardsTheme;
        headerList.append(this.createLIElement('main page', ''));

        for (let i = 0; i < themes.length; i++) {
            headerList.append(this.createLIElement(themes[i], `words/${themes[i]}`));
        }
        const btnRegistration = create('button', 'btn', 'sing in');
        this.headerNav.append(btnRegistration);

    }

}