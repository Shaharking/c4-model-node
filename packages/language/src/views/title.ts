import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional } from "../shared/serializerHelper";

export interface ITitle {
    title: string;
}

export class Title implements ISerializeable {

    private title: string;

    constructor(title: ITitle) {
        this.title = title.title;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`title ${Optional(this.title)}`)
    }
}