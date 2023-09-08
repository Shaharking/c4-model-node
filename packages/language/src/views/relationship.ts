import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Properties } from "../model/properties";

export interface IRelationshipStyle {
    tag: string;
    children: {
        thickness?: string;
        color?: string;
        colour?: string;
        style?: "solid" | "dashed" | "dotted";
        routing?: "Direct" | "Orthogonal" | "Curved";
        fontSize?: string;
        width?: string;
        position?: string;
        opacity?: string;
        properties?: Properties
    };
}

export class RelationshipStyle implements ISerializeable {

    private tag: string;
    private children: {
        thickness?: string;
        color?: string;
        colour?: string;
        style?: "solid" | "dashed" | "dotted";
        routing?: "Direct" | "Orthogonal" | "Curved";
        fontSize?: string;
        width?: string;
        position?: string;
        opacity?: string;
        properties?: Properties
    };

    constructor(relationship: IRelationshipStyle) {
        this.tag = relationship.tag;
        this.children = relationship.children || {};
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`relationship ${this.tag} {
            ${Object.entries(this.children).map(([key, value]) => {
                if (key === 'properties') {
                    return this.children.properties.serialize(parentContext);
                }
                else {
                    return `${key} ${value}`
                }
            }).join("\n")};
        }`);
    }
}