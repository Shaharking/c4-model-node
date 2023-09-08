import { ISerializeable, Serialize } from "../shared/iserializeable";

export interface IBranding {
    logo?: string;
    font?: string;
}


export class Branding implements ISerializeable {

    private logo?: string;
    private font?: string;

    constructor(branding: IBranding) {
        this.logo = branding.logo;
        this.font = branding.font;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`branding {
            ${this.logo ? `logo ${this.logo}` : ''}
            ${this.font ? `font ${this.font}` : ''}
        }`)
    }
}