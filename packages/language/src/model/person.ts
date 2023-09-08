import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Description } from './description';
import { Tags } from './tags';
import { Url } from './url';
import { Properties } from './properties';
import { Perspectives } from './perspectives';
import { Relationship } from './relationship';

export interface IPerson {
    id?: string;
    name: string;
    description?: string;
    tags?: string[];
    children?: Array<Description | Tags | Url | Properties | Perspectives | Relationship>
}

export class Person implements ISerializeable {
    
    private id?: string;
    private name: string;
    private description: string;
    private tags: string[];
    private children?: Array<Description | Tags | Url | Properties | Perspectives | Relationship>

    /***
     * @example [id] = person [name] <description> <tags>  
     */
    constructor(person: IPerson) {
        this.id = person.id;
        this.name = person.name;
        this.description = person.description;
        this.tags = person.tags;
        this.children = person.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} person "${this.name}" ${Optional(this.description)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
