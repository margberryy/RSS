import {f} from '../appComponent';
import {deleteCar, drive, getCar, startEngine, stopEngine} from './api';
import {State} from '../State';

export {Car as default};

export class Car {

    static renderCarImg(color: string): SVGElement {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGElement;
        svg.setAttribute('class', 'car_img');

        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');


        path1.setAttribute('d',
            'M58.8 28.7c-3-.2-13.7-1.7-13.7-1.7H4.8a28.7 28.7 0 0 0-1.5 5.7C3 36.2 3 41 3 41h6a6 6 0 0 1 12 ' +
            '0h22a6 6 0 0 1 12 0h3.4c1.7 0 2.8-1.6 3-3.5s.6-5.8.6-5.8.3-2.7-3.2-3z ');
        path2.setAttribute('d', 'M36.3 19H10.4a3.9 3.9 0 0 0-2.7 1.6A34.5 34.5 0 0 0 4.8 27h40.3z');
        path1.setAttribute('fill', color);
        path2.setAttribute('fill', '#72b8ed');


        circle1.setAttribute('cx', '14');
        circle1.setAttribute('cy', '42');
        circle1.setAttribute('r', '6');

        circle2.setAttribute('cx', '50');
        circle2.setAttribute('cy', '42');
        circle2.setAttribute('r', '6');
        svg.append(path1);
        svg.append(path2);
        svg.append(circle1);
        svg.append(circle2);
        return svg;
    };

    static renderCar(name: string, color: string, id: number): HTMLElement {
        const car = f.create('div', 'car');
        car.id = `car-${id}`;
        const carEdit = f.create('div', 'car_edit');
        car.append(carEdit);
        const btnSelect = f.createBtn('btn btn_select_car', 'select');
        btnSelect.id = String(id);
        carEdit.append(btnSelect);

        btnSelect.addEventListener('click', (e) => {
            car.style.background = '#55555352';
            const target = e.target as HTMLButtonElement;
            getCar(Number(target.id)).then(res => {
                State.instance().publish(State.Events.CarSelected, res);
            });
        });
        const btnRemove = f.createBtn('btn btn_remove_car', 'remove');
        carEdit.append(btnRemove);
        btnRemove.id = String(id);
        btnRemove.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            deleteCar(Number(target.id)).then(() => {
                const currentCar = document.getElementById(`car-${target.id}`);
                currentCar.remove();
            });
        });
        carEdit.append(f.create('div', 'car_name', name));
        const carImg = Car.renderCarImg(color);
        carImg.id = `carImg-${id}`;
        const race = f.create('div', 'race');

        car.append(race);
        const btnStart = f.createBtn('btn btn_start', 'go');
        btnStart.id = String(id);
        race.append(btnStart);

        const btnStop = f.createBtn('btn btn_stop', 'stop');
        btnStop.id = `btnStop-${id}`;
        race.append(btnStop);
        race.append(carImg);
        const flag = f.create('img', 'flag') as HTMLImageElement;
        flag.src = 'assets/flag.svg';
        race.append(flag);

        btnStart.addEventListener('click', (e) => {
            const targetCarId = Number((e.target as HTMLButtonElement).id);
            Car.animateCar(targetCarId);
        });
        car.append(f.create('hr'));
        return car;
    };

    static async animateCar(CarId: number): Promise<void> {
        const currentCarElement = document.getElementById(`carImg-${CarId}`);
        let carPosUpdater: number;
        const flag = document.querySelector('.flag');
        const trackDistance = flag.getBoundingClientRect().x - 80;
        startEngine(CarId).then((res) => {
            const time = Math.round(res.distance / res.velocity);
            const distanceDelta = trackDistance / time * 10;
            let carPosition = 0;
            carPosUpdater = window.setInterval((): void => {
                currentCarElement.animate(
                    [
                        {transform: `translateX(${carPosition}px)`},
                        {transform: `translateX(${carPosition + distanceDelta}px)`}
                    ],
                    {duration: 10, fill: 'forwards'});
                carPosition += distanceDelta;
            }, 10);
            drive(CarId).catch(() => {
                clearInterval(carPosUpdater);
            });

            setTimeout(() => {
                clearInterval(carPosUpdater);
            }, time);

        });
        const btnStop = document.getElementById(`btnStop-${CarId}`);
        btnStop.addEventListener('click', () => {
            stopEngine(CarId).then(() => {
                clearInterval(carPosUpdater);
                currentCarElement.animate(
                    {transform: 'translateX(0px)'},
                    {duration: 1, fill: 'forwards'});
            });
        });
    }

}


