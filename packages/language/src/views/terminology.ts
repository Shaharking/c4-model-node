import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional, OptionalKeyValue } from "../shared/serializerHelper";

export interface ITerminology {
    person?: string;
    softwareSystem?: string;
    container?: string;
    component?: string;
    deploymentNode?: string;
    infrastructureNode?: string;
    relationship?: string;
}

export class Terminology implements ISerializeable {
    private person?: string;
    private softwareSystem?: string;
    private container?: string;
    private component?: string;
    private deploymentNode?: string;
    private infrastructureNode?: string;
    private relationship?: string;

    constructor(terminology: ITerminology) {
        this.person = terminology.person;
        this.softwareSystem = terminology.softwareSystem;
        this.container = terminology.container;
        this.component = terminology.component;
        this.deploymentNode = terminology.deploymentNode;
        this.infrastructureNode = terminology.infrastructureNode;
        this.relationship = terminology.relationship;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`terminology {
            ${OptionalKeyValue(this.person, "person")}
            ${OptionalKeyValue(this.softwareSystem, "softwareSystem")}
            ${OptionalKeyValue(this.container, "container")}
            ${OptionalKeyValue(this.component, "component")}
            ${OptionalKeyValue(this.deploymentNode, "deploymentNode")}
            ${OptionalKeyValue(this.infrastructureNode, "infrastructureNode")}
            ${OptionalKeyValue(this.relationship, "relationship")}
        }`);
    }
}
