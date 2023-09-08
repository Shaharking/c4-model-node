import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional, OptionalChildren } from "../shared/serializerHelper";

export interface IExclude {
    identifierOrExpression?: Array<"*" | string>;
}

export class Exclude implements ISerializeable {

    private identifierOrExpression?: Array<"*" | string>;

    constructor(include: IExclude) {
        this.identifierOrExpression = include.identifierOrExpression;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`exclude ${Optional(this.identifierOrExpression)}`);
    }
}