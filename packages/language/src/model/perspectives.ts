import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';

export class Perspectives implements ISerializeable {
    
    private perspectives: Record<string, string>;

    constructor(value: Record<string, string>) {
        this.perspectives = value;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`perspectives {
            ${Object.entries(this.perspectives).map(([key, value]) => {
                return `${Optional(key)} ${Optional(value)}`
            }).join("\n")}
        }`)
    }
}
