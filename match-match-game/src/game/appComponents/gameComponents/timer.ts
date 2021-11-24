import {f} from '../../../dom';

export { Timer as default };
export class Timer {
    timer: HTMLElement;

    constructor(parent: HTMLElement) {
        this.timer = f.create(parent, 'div', 'timer');
    }

    startTimer(): void {
        let sec = 0;
        let min = 0;
        setInterval(() => {
            sec+=1;
            let zeroSec = '0';
            let zeroMin = '0';
            if (sec === 60) {
                min+=1;
                sec = 0;
            }
            if (sec > 9) {
                zeroSec = '';

            }
            if (min > 9) {
                zeroMin = '';
            }
            this.timer.innerHTML = `${zeroMin}${min} : ${zeroSec}${sec} `;

        }, 1000);
    }

}