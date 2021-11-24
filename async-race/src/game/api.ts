const baseUrl = 'http://127.0.0.1:3000';
const garage = `${baseUrl}/garage`;
const engine = `${baseUrl}/engine`;
// const winners = `${baseUrl}/winners`;

export const getCars = async (page: number, limit = 7) => {
    // const response = await fetch(`${garage}?_page=${page}&_limit = ${limit}`);
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count'),
    };
};

export const getCar = async (id: number) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: { name: string, color: string, id: number }) => (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    },
})).json();

export const deleteCar = async (id: number) => (await fetch(`${garage}/${id}`, {method: 'DELETE'})).json();
export const updateCar = async (id: number, body: { name: string, color: string, id: number }) => (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    },
})).json();

export const startEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: number) => {
    const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
    if (res.status !== 200) {
        throw new Error('Engine failed');
    } else {
        return {...(await res.json())};
    }
};







