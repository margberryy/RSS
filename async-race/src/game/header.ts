import {f} from '../appComponent';
import {Location} from './location';

export {Header as default};

export class Header {

    static renderHeader(): HTMLElement {
        const header = f.create('header', 'header');
        const btnToGarage = f.create('button', 'btn btn_to-garage');
        btnToGarage.setAttribute('name', Location.Locations.Garage);
        btnToGarage.innerText = 'to garage';
        header.append(btnToGarage);
        btnToGarage.addEventListener('click',()=>{
            window.location.hash = '/garage';
        });
        
        const btnToWinners = f.create('button', 'btn btn_to-winners');
        btnToWinners.setAttribute('name', Location.Locations.Winners);
        btnToWinners.innerText = 'to winners';
        header.append(btnToWinners);
        btnToWinners.addEventListener('click',()=>{
            window.location.hash = '/winners';
        });
        return header;

    }

}