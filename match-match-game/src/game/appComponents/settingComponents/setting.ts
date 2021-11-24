import { f } from '../../../dom';
import { State } from '../../State';

export { Setting as default };
 export class Setting {

     private containerClassName = 'container_settings';

     public render(): HTMLElement {
        const containerSettings = document.createElement('div');
        containerSettings.className = this.containerClassName;
        const settingsCards = f.create(containerSettings, 'label', 'settings title');
        settingsCards.innerHTML = 'Game cards';
        const settingsValueWrapper = f.create(settingsCards, 'select', 'settings__value_wrapper')as HTMLSelectElement;
        function createSelectParams(parent:HTMLElement,className:string, value:string) {
            f.create(parent, 'option', className).innerHTML = value;
        }
        createSelectParams(settingsValueWrapper,'settings__value','Animal');
        createSelectParams(settingsValueWrapper,'settings__value','Fruits & Vegetables');

        settingsValueWrapper.addEventListener('change', () => {
            State.instance().typeCards = settingsValueWrapper.value;
        } );
        const settingsDifficult = f.create(containerSettings, 'label', 'settings title');
        
        settingsDifficult.innerHTML = 'Difficulty';
        const settingsDifficultValueWrapper:HTMLSelectElement = f.create(settingsDifficult, 'select', 'settings__value_wrapper') as HTMLSelectElement;
        createSelectParams(settingsDifficultValueWrapper,'settings__value','4 x 4');
        createSelectParams(settingsDifficultValueWrapper,'settings__value','6 х 6');
  
        settingsDifficultValueWrapper.addEventListener('change', () => {
            State.instance().difficulty = settingsDifficultValueWrapper.value;
        } );

        return containerSettings;
    }
}