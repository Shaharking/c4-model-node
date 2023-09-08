import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';
import { ContainerInstance } from './containerInstance';
import { Description } from './description';
import { InfrastructureNode } from './infrastructureNode';
import { Instances } from './instances';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { SoftwareSystemInstance } from './softwareSystemInstance';
import { Tags } from './tags';
import { Technology } from './technology';
import { Url } from './url';

export interface IDeploymentNode {
    id?: string;
    name: string;
    description?: string;
    technology?: string;
    tags?: string[];
    instances?: string | number;
    children?: Array<Group | DeploymentNode | InfrastructureNode | SoftwareSystemInstance | ContainerInstance | Relationship | Description | Technology | Instances | Tags | Url | Properties | Perspectives >
}

export class DeploymentNode implements ISerializeable {
    
    private id?: string;
    private name: string;
    private description?: string;
    private technology?: string;
    private tags?: string[];
    private instances?: string | number;
    private children?: Array<Group | DeploymentNode | InfrastructureNode | SoftwareSystemInstance | ContainerInstance | Relationship | Description | Technology | Instances | Tags | Url | Properties | Perspectives >

    /**
     * 
     * @example 
     * <name> [description] [technology] [tags] [instances]
     */
    constructor(deploymentNode: IDeploymentNode) {
        this.id = deploymentNode.id;
        this.name = deploymentNode.name;
        this.description = deploymentNode.description;
        this.technology = deploymentNode.technology;
        this.tags = deploymentNode.tags;
        this.instances = deploymentNode.instances || "1";
        this.children = deploymentNode.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} deploymentNode "${this.name}" ${Optional(this.description)} ${Optional(this.technology)} ${Optional(this.tags)} ${Optional(this.instances)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
