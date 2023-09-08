import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';
import { Description } from './description';
import { HealthCheck } from './healthCheck';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { Tags } from './tags';
import { Url } from './url';

export interface IContainerInstance   {
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

/**
 * The containerInstance keyword defines an instance of the specified container that is deployed on the parent deployment node. 
 */
export class ContainerInstance implements ISerializeable {
    
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
     * @example 
     * [id] = containerInstance <identifier> [deploymentGroups] [tags] 
     */
    constructor(containerInstance: IContainerInstance) {
        this.id = containerInstance.id;
        this.identifier = containerInstance.identifier;
        this.deploymentGroups = containerInstance.deploymentGroups;
        this.tags = containerInstance.tags;
        this.children = containerInstance.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} containerInstance "${this.identifier}" ${Optional(this.deploymentGroups)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
