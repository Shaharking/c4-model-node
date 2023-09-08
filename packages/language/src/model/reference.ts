import { ISerializeable, Serialize } from '../shared/iserializeable';

export interface IReference {
    identifier?: string;
    canonicalName?: string;
    children?: ISerializeable[];
}

export class Reference implements ISerializeable {
    private identifier?: string;
    private canonicalName?: string;
    private children?: ISerializeable[];

    constructor(reference: IReference) {
        this.identifier = reference.identifier;
        this.canonicalName = reference.canonicalName;
        this.children = reference.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        let out = '';
        if (this.canonicalName) {
            out = `${this.identifier} = !ref ${this.canonicalName} ${this.serializeChildren()}`;
        } else {
            out = `!ref ${this.identifier} ${this.serializeChildren()}`;
        }

        return Serialize(out);
    }

    private serializeChildren() {
        if (this.children && this.children.length > 0) {
            return ` {\n${this.children.map(child => child.serialize()).join("\n")}\n}`;
        }
        return '';
    }
}