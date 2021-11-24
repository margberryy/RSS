function getRandomInteger(min: number, max: number) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function getRandomID():number {
    const id = Math.floor(Math.random() * 10000);
    return id;
}

export function getRandomColor(): string {
    let color = Math.floor(Math.random() * (256 ** 3)).toString(16);
    while (color.length < 6) {
        color = `0${color}`;
    }
    return `#${color}`;
}

export function getRandomCar():{name: string, color: string, id:number}{
    const car = {
        name: '',
        color: '',
        id: 1
    };
    const carsBrands = ['Mazda', 'Toyota', 'Lexus', 'Honda', 'Ford', 'Mini', 'Volkswagen', 'Tesla', 'Lincoln',
        'Nissan', 'Porsche', 'Ferrari', 'Rolls-Royce', 'Bentley'];
    const carsModels = [1, 2, 3, 4, 5, 6, 7, 8, 9,
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    car.name = `${carsBrands[getRandomInteger(0, carsBrands.length - 1)]} ${carsModels[getRandomInteger(0, carsModels.length - 1)]
    }${carsModels[getRandomInteger(0, carsModels.length - 1)]}`;
    car.color = getRandomColor();
    car.id = getRandomID();
    return car;
}


