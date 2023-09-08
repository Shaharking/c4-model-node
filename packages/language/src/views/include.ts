import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional, OptionalChildren } from "../shared/serializerHelper";

export interface IInclude {
    identifierOrExpression?: Array<"*" | string>;
}

export class Include implements ISerializeable {

    private identifierOrExpression?: Array<"*" | string>;

    constructor(include: IInclude) {
        this.identifierOrExpression = include.identifierOrExpression;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`include ${Optional(this.identifierOrExpression)}`);
    }
}