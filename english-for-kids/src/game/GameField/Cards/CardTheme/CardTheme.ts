import './CardTheme.css';


export class CardTheme {
    public card: string;

    constructor(nameField: string) {
        this.card = `<div class="category" id="${nameField}">
            <img src="assets/${nameField}/${nameField}.png" class="category_img" 
                alt="${nameField}">
            <div class="category_name">${nameField}</div>
        </div>`
    }

}
