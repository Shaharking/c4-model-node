import { Optional } from '../shared/serializerHelper';
import { ISerializeable, Serialize } from '../shared/iserializeable';

export interface IAdrs {
    path: string;
    fullyQualifiedName?: string;
}

export class Adrs implements ISerializeable {
    
    private path: string;
    private fullyQualifiedName?: string;

    constructor(adrs: IAdrs) {
        this.path = adrs.path;
        this.fullyQualifiedName = adrs.fullyQualifiedName;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`!adrs "${this.path}" ${Optional(this.fullyQualifiedName)}`);
    }
}
