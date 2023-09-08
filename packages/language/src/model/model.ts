import { ISerializeable, Serialize } from "../shared/iserializeable";
import { OptionalChildren } from "../shared/serializerHelper";
import { DeploymentEnvironment } from "./deploymentEnvironment";
import { Group } from "./group";
import { Person } from "./person";
import { Relationship } from "./relationship";
import { SoftwareSystem } from "./softwareSystem";
import { Element } from './element'

export interface IModel {
    children?: Array<Group | Person | SoftwareSystem | DeploymentEnvironment | Element | Relationship>
}

export class Model implements ISerializeable {

    private children?: Array<Group | Person | SoftwareSystem | DeploymentEnvironment | Element | Relationship>

    constructor(model: IModel) {
        this.children = model.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`model ${OptionalChildren('model', this.children)}`)
    }

    public add(childrens: IModel['children']) {
        this.children.push(...childrens);
    }
}