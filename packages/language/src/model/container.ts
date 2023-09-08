import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Component } from './component';
import { Description } from './description';
import { Group } from './group';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { Tags } from './tags';
import { Technology } from './technology';
import { Url } from './url';
import { Docs } from '../others/docs';
import { Adrs } from '../others/adrs';

export interface IContainer {
    id?: string;
    name: string;
    description?: string;
    technology?: string;
    tags?: string[];
    children?: Array<Docs | Adrs | Group | Component | Description | Technology | Tags | Url | Properties | Perspectives | Relationship>
}

export class Container implements ISerializeable {
    
    private id?: string;
    private name: string;
    private description?: string;
    private technology?: string;
    private tags?: string[];
    private children?: Array<Docs | Adrs | Group | Component | Description | Technology | Tags | Url | Properties | Perspectives | Relationship>

    /**
     * 
     * @example
     * [id] = container <name> [description] [technology] [tags]
     */
    constructor(container: IContainer) {
        this.id = container.id;
        this.name = container.name;
        this.description = container.description;
        this.technology = container.technology;
        this.tags = container.tags;
        this.children = container.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} container "${this.name}" ${Optional(this.description)} ${Optional(this.technology)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
