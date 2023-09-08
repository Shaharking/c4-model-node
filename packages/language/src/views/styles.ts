import { Relationship } from "../model";
import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional, OptionalChildren } from "../shared/serializerHelper";
import { ElementStyle } from "./element";
import { RelationshipStyle } from "./relationship";

export interface IStyles {
    children: Array<ElementStyle | RelationshipStyle>;
}

export class Styles implements ISerializeable {

    private children: Array<ElementStyle | RelationshipStyle>;

    constructor(styles: IStyles) {
        this.children = styles.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`styles ${OptionalChildren(parentContext, this.children)}`)
    }
}