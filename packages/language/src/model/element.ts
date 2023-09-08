import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';
import { Description } from './description';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { Tags } from './tags';
import { Url } from './url';

export interface IElement {
    id?: string;
    name: string;
    metadata?: string;
    description?: string;
    tags?: string[];
    children?: Array<Description | Tags | Url | Properties | Perspectives | Relationship >
}

export class Element  implements ISerializeable {
    
    private id?: string;
    private name: string;
    private metadata?: string;
    private description?: string;
    private tags?: string[];
    private children?: Array<Description | Tags | Url | Properties | Perspectives | Relationship >

    constructor(element: IElement) {
        this.id = element.id;
        this.name = element.name;
        this.metadata = element.metadata;
        this.description = element.description;
        this.tags = element.tags;
        this.children = element.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} element "${this.name}" ${Optional(this.metadata)} ${Optional(this.description)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`)
    }
}
