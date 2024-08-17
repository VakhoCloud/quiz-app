import { Option } from "./option.model";

export class Question {
    id: number;
    text: string;
    options: Option[];
    img?: string;

    constructor(id: number, text: string, options: Option[], img?: string) {
        this.id = id;
        this.text = text;
        this.options = options;
        this.img = img;
    }
}