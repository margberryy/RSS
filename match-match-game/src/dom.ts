export class Dom {
}

export function f(): Dom {
    return new Dom;
}

f.create = (parent: HTMLElement, tag: string, className: string): HTMLElement => {
    const newTag = document.createElement(tag);
    newTag.className = className;
    parent.append(newTag);
    return newTag;
};
