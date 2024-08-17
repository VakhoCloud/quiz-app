export class Option {
    id: number;
    text: string;
    isCorrect: boolean;
    img?: string;
    selected?: boolean;
    disabled?: boolean;

    constructor(id: number, text: string, isCorrect: boolean, img?: string, selected?: boolean, disabled?: boolean) {
        this.id = id;
        this.text = text;
        this.isCorrect = isCorrect;
        this.img = img;
        this.selected = selected;
        this.disabled = disabled;
    }
}