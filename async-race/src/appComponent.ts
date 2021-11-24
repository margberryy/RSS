export class AppComponent {
}

export function f(): AppComponent {
    return new AppComponent;
}

f.create = (tag: string, className = '', text = ''): HTMLElement => {
    const newTag = document.createElement(tag);
    newTag.className = className;
    newTag.innerHTML = text;
    return newTag;
};
f.createBtn = (className: string, textBtn: string): HTMLElement =>{
    const btn = f.create('button', className);
    btn.innerText = textBtn;
    return btn;
};
f.createInput = (className: string, type: string, placeholder = ''): HTMLElement =>{
    const nameCar = f.create('input', className) as HTMLInputElement;
    nameCar.type = type;
    nameCar.placeholder = placeholder;
    return nameCar;
};