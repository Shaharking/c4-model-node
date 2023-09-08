import { ISerializeable, Serialize } from "../shared/iserializeable";

export interface ITheme {
    defaultOrUrl: "default" | string;
}

export class Theme implements ISerializeable {

    private defaultOrUrl: "default" | string;

    constructor(theme: ITheme) {
        this.defaultOrUrl = theme.defaultOrUrl;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`theme ${this.defaultOrUrl}`);
    }
}