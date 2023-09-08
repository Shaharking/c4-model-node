import { Optional } from '../shared/serializerHelper';
import { ISerializeable, Serialize } from '../shared/iserializeable';

export interface IDocs {
    path: string;
    fullyQualifiedName?: string;
}

export class Docs implements ISerializeable {
    
    private path: string;
    private fullyQualifiedName?: string;

    constructor(docs: IDocs) {
        this.path = docs.path;
        this.fullyQualifiedName = docs.fullyQualifiedName;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`!docs "${this.path}" ${Optional(this.fullyQualifiedName)}`);
    }
}
