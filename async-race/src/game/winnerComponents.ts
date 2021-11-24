import {f} from '../appComponent';

export {WinnerComponents as default};

export class WinnerComponents {
    public numberWinnerPage: number;

    constructor() {
        this.numberWinnerPage = 1;
    }

    render(): HTMLElement {
        const container = f.create('div', 'container');
        container.append(f.create('div', 'title', 'winners'));
        const winnersWrapper = f.create('div', 'winners_wrapper');
        container.append(winnersWrapper);
        winnersWrapper.append(f.create('p', 'page', `page (${this.numberWinnerPage})`));
        const table = f.create('table', 'winners_table');
        const thead = f.create('thead');
        table.append(thead);
        const columnNames = f.create('tr');
        thead.append(columnNames);
        columnNames.append(f.create('th', '', 'number'));
        columnNames.append(f.create('th', '', 'car'));
        columnNames.append(f.create('th', '', 'name'));
        columnNames.append(f.create('th', '', 'wins'));
        columnNames.append(f.create('th', '', 'best time'));

        return container;
    }

}