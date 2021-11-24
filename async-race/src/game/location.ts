enum Locations {
    Garage = '#/garage',
    Winners = '#/winners'
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

        if (this.routes.has(urlLocation)) {
            this.routes.get(urlLocation)();
        }

    }

}