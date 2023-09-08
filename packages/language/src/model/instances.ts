import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';

export interface IRange {
    from: string
    to: string;
}

export class Instances implements ISerializeable {
    
    private instances: string;

    constructor(value: number | IRange) {
        this.instances = (typeof value === 'number' ? String(value) : `${value.from}..${value.to}`)
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`instances ${Optional(this.instances)}`);
    }
}
