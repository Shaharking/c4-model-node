import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';

export class Technology implements ISerializeable {
    
    private technology: string;

    constructor(value: string) {
        this.technology = value;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`technology ${Optional(this.technology)}`);
    }
}
