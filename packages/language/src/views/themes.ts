import { ISerializeable, Serialize } from "../shared/iserializeable";

export interface IThemes {
    urls: string[];
}

export class Themes implements ISerializeable {

    private urls: string[];

    constructor(themes: IThemes) {
        this.urls = themes.urls;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`themes ${this.urls.join(" ")}`);
    }
}