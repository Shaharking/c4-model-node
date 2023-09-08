import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Description } from './description';
import { HealthCheck } from './healthCheck';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { Tags } from './tags';
import { Url } from './url';

export interface ISoftwareSystemInstance  {
    id?: string;
    /**
     * The identifier must represent a software system.
     */
    identifier: string;
    /**
     * list of identifiers representing deployment groups.
     */
    deploymentGroups?: string[];
    tags?: string[];
    children?: Array<Relationship | Description | Tags | Url | Properties | Perspectives | HealthCheck >
}

export class SoftwareSystemInstance  implements ISerializeable {
    
    private id?: string;
    /**
     * The identifier must represent a software system.
     */
    private identifier: string;
    /**
     * list of identifiers representing deployment groups.
     */
    private deploymentGroups: string[];
    private tags?: string[];
    private children?: Array<Relationship | Description | Tags | Url | Properties | Perspectives | HealthCheck >

    /**
     * 
     * @example softwareSystemInstance <identifier> [deploymentGroups] [tags]
     */
    constructor(softwareSystemInstance: ISoftwareSystemInstance) {
        this.id = softwareSystemInstance.id;
        this.identifier = softwareSystemInstance.identifier;
        this.deploymentGroups = softwareSystemInstance.deploymentGroups;
        this.tags = softwareSystemInstance.tags;
        this.children = softwareSystemInstance.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} softwareSystemInstance "${this.identifier}" ${Optional(this.deploymentGroups)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
