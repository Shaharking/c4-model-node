import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';
import { Container } from './container';
import { Description } from './description';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { Tags } from './tags';
import { Technology } from './technology';
import { Url } from './url';
import { Docs } from '../others/docs';
import { Adrs } from '../others/adrs';

export interface IComponent {
    id?: string;
    name: string;
    description?: string;
    technology?: string;
    tags?: string[];
    children?: Array< Docs | Adrs | Description | Technology | Tags | Url | Properties | Perspectives | Relationship>
}

export class Component implements ISerializeable {
    
    private id?: string;
    private name: string;
    private description?: string;
    private technology?: string;
    private tags?: string[];
    private children?: Array<Docs | Adrs | Description | Technology | Tags | Url | Properties | Perspectives | Relationship>

    constructor(component: IComponent) {
        this.id = component.id;
        this.name = component.name;
        this.description = component.description;
        this.technology = component.technology;
        this.tags = component.tags;
        this.children = component.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} component "${this.name}" ${Optional(this.description)} ${Optional(this.technology)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
