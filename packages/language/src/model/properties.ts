import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';

export class Properties implements ISerializeable {
    
    private properties: Record<string, string>;

    constructor(value: Record<string, string>) {
        this.properties = value;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`properties {
            ${Object.entries(this.properties).map(([key, value]) => {
                return `${Optional(key)} ${Optional(value)}`
            }).join("\n")}
        }`);
    }
}
