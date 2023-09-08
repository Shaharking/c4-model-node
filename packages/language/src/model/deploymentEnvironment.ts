import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';
import { DeploymentNode } from './deploymentNode';
import { Relationship } from './relationship';
import { DeploymentGroup } from './deploymentGroup';

export interface IDeploymentEnvironment {
    name: string;
    children: Array<Group | DeploymentGroup | DeploymentNode | Relationship>;
}

export class DeploymentEnvironment implements ISerializeable {
    
    private name: string;
    private children: Array<Group | DeploymentGroup | DeploymentNode | Relationship>;

    /**
     * 
     * @example deploymentEnvironment <name>
     */
    constructor(deploymentEnvironment: IDeploymentEnvironment) {
        this.name = deploymentEnvironment.name;
        this.children = deploymentEnvironment.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`deploymentEnvironment "${this.name}" ${OptionalChildren(parentContext, this.children)}`);
    }
}
