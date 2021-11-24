import {f} from '../appComponent';
import {createCar, getCars, updateCar} from './api';
import {getRandomID, getRandomCar} from '../utils';
import {State} from '../State';
import {Car} from './car';

export {GarageComponents as default};

export class GarageComponents {
    private raceField: HTMLElement;

    public pageNumber = 1;

    private countOfPages = getCars(1).then(async res => {
        const countCars = Number(res.count);
        return Math.ceil(countCars / 7);
    })

    render(): HTMLElement {
        const container = document.createElement('div');

        const fieldCreateCar = f.create('div', 'field_create_car');
        container.append(fieldCreateCar);
        const inputNameNewCar = f.createInput('name_new_car', 'text', 'enter car brand') as HTMLInputElement;
        fieldCreateCar.append(inputNameNewCar);
        const inputColorNewCar = f.createInput('color_new_car', 'color') as HTMLInputElement;
        fieldCreateCar.append(inputColorNewCar);
        const btnCreate = f.createBtn('btn btn_create_cars', 'Create');
        fieldCreateCar.append(btnCreate);

        const fieldUpdateCar = f.create('div', 'field_update_car');
        container.append(fieldUpdateCar);
        const nameEditCar = f.createInput('name_current_car', 'text') as HTMLInputElement;
        fieldUpdateCar.append(nameEditCar);
        const colorEditCar = f.createInput('color_current_car', 'color') as HTMLInputElement;
        fieldUpdateCar.append(colorEditCar);
        const btnUpdate = f.createBtn('btn btn_update_cars', 'Update');
        fieldUpdateCar.append(btnUpdate);
        const btnRace = f.createBtn('btn btn_race', 'race');
        container.append(btnRace);
        const btnReset = f.createBtn('btn btn_reset', 'reset');
        container.append(btnReset);
        const btnGenerateCars = f.createBtn('btn btn_generate_cars', 'generate cars');
        container.append(btnGenerateCars);
        container.append(f.create('div', 'title', 'garage'));
        this.raceField = f.create('div', 'race_field');
        container.append(this.raceField);

        this.raceField.append(f.create('div', ''));
        GarageComponents.drawCars(this.pageNumber).then(res => this.raceField.append(res));
        const btnPrev = f.create('button', 'btn btn_prev', 'prev');
        container.append(btnPrev);
        const btnNext = f.create('button', 'btn btn_next', 'next');
        container.append(btnNext);
        this.raceField.removeChild(this.raceField.lastChild);

        btnRace.addEventListener('click', () => getCars(1, 1000).then( res => {
            res.items.forEach((item: HTMLElement) => {
                  Car.animateCar(Number(item.id));
             });
        }));
        btnReset.addEventListener('click', () => {
            getCars(1, 7).then(res => {
                 res.items.forEach((item: HTMLElement) => {
                    const car = document.getElementById(`carImg-${item.id}`);

                    car.animate(
                        {transform: 'translateX(0px)'},
                        {duration: 1, fill: 'forwards'});
                });
            });
        });
        btnNext.addEventListener('click', () => {
            this.getNextPage();
        });
        btnPrev.addEventListener('click', () => {
            this.getPrevPage();
        });
        btnCreate.addEventListener('click', () => this.createNewCar(inputNameNewCar, inputColorNewCar));

        State.instance().subscribeOn(State.Events.CarSelected, (car) => {
            const currentCar = car as { name: string, color: string, id: number };
            nameEditCar.value = currentCar.name;
            colorEditCar.value = currentCar.color;

            btnUpdate.addEventListener('click', () => {
                const selectedCar = document.getElementById(`car-${currentCar.id}`);
                selectedCar.style.background = 'none';
                updateCar(currentCar.id, {name: nameEditCar.value, color: colorEditCar.value, id: currentCar.id})
                    .then(() => {
                        const updatedCar = Car.renderCar(nameEditCar.value, colorEditCar.value, currentCar.id);
                        selectedCar.replaceWith(updatedCar);
                        nameEditCar.value = '';
                        colorEditCar.value = 'black';
                    });
            });

        });
        btnGenerateCars.addEventListener('click', () => this.generateCars());

        return container;

    }

    async generateCars(): Promise<void> {
        const cars = [];
        for (let i = 0; i < 100; i++) {
            cars.push(getRandomCar());
        }
        await Promise.all(cars.map(car => createCar(car)));
        this.raceField.removeChild(this.raceField.lastChild);
        this.raceField.append(await GarageComponents.drawCars(this.pageNumber));
    }

    static async drawCars(page: number): Promise<HTMLElement> {
        const cars = f.create('div', 'cars');
        await getCars(page).then(res => {
            res.items.map((item: { name: string; color: string; id: number }) => {
                const car = Car.renderCar(item.name, item.color, item.id);
                cars.append(car);
                return cars;
            });
        });

        return cars;
    }

    createNewCar(nameCar: HTMLInputElement, colorCar: HTMLInputElement): void {
        const nameNewCar = nameCar.value;
        const colorNewCar = colorCar.value;
        const idNewCar = getRandomID();

        createCar({name: nameNewCar, color: colorNewCar, id: idNewCar}).then(async () => {
            const name = nameCar;
            const color = colorCar;
            name.value = '';
            color.value = 'black';
            this.raceField.removeChild(this.raceField.lastChild);
            this.raceField.append(await GarageComponents.drawCars(this.pageNumber));

        });
    }


    async getNextPage(): Promise<void> {
        if (this.pageNumber !== await this.countOfPages) {
            this.raceField.removeChild(this.raceField.lastChild);
            this.pageNumber++;
            this.raceField.append(await GarageComponents.drawCars(this.pageNumber));
        }
    }

    async getPrevPage(): Promise<void> {
        if (this.pageNumber > 1) {
            this.raceField.removeChild(this.raceField.lastChild);
            this.pageNumber--;
            this.raceField.append(await GarageComponents.drawCars(this.pageNumber));
        }
    }

}

