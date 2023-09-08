import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';

export class Tags implements ISerializeable {
    
    private tags: string[]

    constructor(value: string | string[]) {
        this.tags = Array.isArray(value) ? value : [value];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`tags ${Optional(this.tags)}`);
    }
}
