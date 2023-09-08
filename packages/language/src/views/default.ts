import { ISerializeable, Serialize } from "../shared/iserializeable";

export class Default implements ISerializeable {

    constructor() {
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`default`);
    }
}