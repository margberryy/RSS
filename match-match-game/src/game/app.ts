import { f } from '../dom';
import { AboutGame } from './appComponents/aboutGameComponents/aboutGame';
import { FormRegistration } from './appComponents/formRegistration';
import { Header } from './appComponents/header';
import { Location } from './appComponents/location';
import { GameComponent } from './appComponents/gameComponents/gameComponent';
import { Setting } from './appComponents/settingComponents/setting';
import { State } from './State';
import { BestScore } from './appComponents/aboutGameComponents/bestScoreComponents/bestScore';

export { App as default };
 export class App extends Location {
    readonly parentNode: HTMLElement;

    readonly header: Header;

    readonly aboutComponent: AboutGame = new AboutGame();

    readonly gameComponent: GameComponent = new GameComponent();

    readonly settingComponent: Setting = new Setting();

    readonly scoreComponent: BestScore = new BestScore();

     private readonly mainContainer: HTMLElement;

    constructor() {
        super();
        this.header = new Header();
        this.parentNode = document.getElementById('app');
        this.mainContainer = f.create(this.parentNode, 'main', 'main');

        this.registerRoute(Location.Locations.About,
            () => this.drawComponent(this.aboutComponent.render()));

        this.registerRoute(Location.Locations.Settings,
            () => this.drawComponent(this.settingComponent.render()));

        this.registerRoute(Location.Locations.Score,
            () => this.drawComponent(this.scoreComponent.render()));

        window.addEventListener('DOMContentLoaded', () => {
            window.location.hash = '/';
            this.resolveRoute(Location.Locations.About);

        });
    }

    renderHeader(): void {
        this.header.renderWrapper();
        this.header.btnRegister.addEventListener('click', () => new FormRegistration().renderFormRegistration(this.mainContainer));
        this.header.btnStartGame.addEventListener('click', () => {
            State.instance().startGame();
            this.drawComponent(this.gameComponent.render());
        });
        this.header.registerMenuItem('About Game', 'assets/about_game_icon.png', Location.Locations.About);
        this.header.registerMenuItem('Best Score', 'assets/score_icon.png', Location.Locations.Score);
        this.header.registerMenuItem('Game Settings', 'assets/setting_icon.png', Location.Locations.Settings);
    }



    private drawComponent(el: HTMLElement) {
        while (this.mainContainer.firstChild) {
            this.mainContainer.removeChild(this.mainContainer.firstChild);
        }
        this.mainContainer.append(el);
    }

}
