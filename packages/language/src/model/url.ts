import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';

export class Url implements ISerializeable {
    
    private url: string;

    constructor(value: string) {
        this.url = value;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`url ${Optional(this.url)}`);
    }
}
