import {State} from "./State";

enum Locations {
    MainPage = '#/',
    Words = '#/words',
    // Play = '#/play',

}

export {Location as default};

export class Location {

    static readonly Locations = Locations;

    readonly routes = new Map();

    constructor() {

        window.addEventListener('popstate', () => {
            this.resolveRoute(window.location.hash);
        });

    }

    public registerRoute(loc: Locations, handler: () => void): void {
        this.routes.set(loc, handler);
    }

    resolveRoute(urlLocation: string): void {
        let url = urlLocation;
        if (urlLocation != '#/') {
            const index = urlLocation.lastIndexOf('/');
            url = urlLocation.slice(0, index);
            State.instance().actualTheme = urlLocation.slice(index + 1);

        }
        if (this.routes.has(url)) {
            this.routes.get(url)();
        }

    }

}