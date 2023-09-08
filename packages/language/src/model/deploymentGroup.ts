import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';

export interface IDeploymentGroup {
    name: string;
}

export class DeploymentGroup implements ISerializeable {
    
    private name: string;

    constructor(deploymentGroup: IDeploymentGroup) {
        this.name = deploymentGroup.name;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`deploymentGroup "${this.name}"`);
    }
}
