import {Location} from './location';
import {Header} from './header';
import {GarageComponents} from './garageComponents';
import {WinnerComponents} from './winnerComponents';
import {f} from '../appComponent';

export {App as default};

export class App extends Location {
    private body: HTMLBodyElement;

    readonly header: Header;

    readonly garageComponents: GarageComponents = new GarageComponents();

    readonly winnerComponents: WinnerComponents = new WinnerComponents();

    private readonly wrapper: HTMLElement;


    constructor() {
        super();
        this.body = document.querySelector('body');
        this.header = new Header();
        this.wrapper = f.create('div');
        this.registerRoute(Location.Locations.Garage,
            () => this.drawComponent(this.garageComponents.render()));

        this.registerRoute(Location.Locations.Winners,
            () => this.drawComponent(this.winnerComponents.render()));

        window.addEventListener('DOMContentLoaded', () => {
            window.location.hash = '/garage';
            this.drawComponent(this.garageComponents.render());
            // this.resolveRoute(Location.Locations.Garage);

        });
    }

    renderHeader(): void {
        this.body.append(Header.renderHeader());
        this.body.append(this.wrapper);
    }

    private drawComponent(elem: HTMLElement) {
        while (this.wrapper.firstChild) {
            this.wrapper.removeChild(this.wrapper.firstChild);
        }
        this.wrapper.append(elem);
    }

}