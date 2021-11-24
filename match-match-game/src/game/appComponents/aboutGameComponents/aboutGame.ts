import {f} from '../../../dom';
import {CardComponent} from "../gameComponents/cardComponent";

export { AboutGame as default };
 export class AboutGame {
     private aboutContainer = document.createElement('div');

    render(): HTMLElement {

        f.create(this.aboutContainer, 'div', 'title title__about_game').innerHTML = 'How to play?';

        for (let i = 1; i <= 3; i+=1) {
            const steContainer = f.create(this.aboutContainer, 'div', 'step_container');

            const stepWrapper = f.create(steContainer, 'div', 'step_wrapper');
            const stepNum = f.create(stepWrapper, 'div', 'step_num');
            stepNum.innerHTML = `${i}`;

            const arrText = ['Register new player in game', 'Configure your game settings', 'Start you new game! Remember card positions and match it before times up.'];
            const stepText = f.create(stepWrapper, 'p', 'step_text');
            stepText.innerHTML = arrText[i - 1];

            const arrImg = ['assets/register.png', 'assets/settings.png', 'assets/cards.png'];
            const stepImg = f.create(steContainer, 'img', 'step_img') as HTMLImageElement;
            stepImg.src = arrImg[i - 1];
        }
        return this.aboutContainer;
    }
}