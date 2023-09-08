import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';
import { Description } from './description';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { Tags } from './tags';
import { Technology } from './technology';
import { Url } from './url';

export interface IInfrastructureNode  {
    id?: string;
    name: string;
    description?: string;
    technology?: string;
    tags?: string[];
    children?: Array<Relationship | Description | Technology | Tags | Url | Properties | Perspectives >
}

export class InfrastructureNode  implements ISerializeable {
    
    private id?: string;
    private name: string;
    private description?: string;
    private technology?: string;
    private tags?: string[];
    private children?: Array<Relationship | Description | Technology | Tags | Url | Properties | Perspectives >

    constructor(infrastructureNode: IInfrastructureNode) {
        this.id = infrastructureNode.id;
        this.name = infrastructureNode.name;
        this.description = infrastructureNode.description;
        this.technology = infrastructureNode.technology;
        this.tags = infrastructureNode.tags;
        this.children = infrastructureNode.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} infrastructureNode "${this.name}" ${Optional(this.description)} ${Optional(this.technology)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
