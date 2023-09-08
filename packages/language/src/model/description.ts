import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';

export class Description implements ISerializeable {
    
    private description: string;

    constructor(value: string) {
        this.description = value;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`description ${Optional(this.description)}`)
    }
}
