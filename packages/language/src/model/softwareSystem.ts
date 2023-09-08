import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';
import { Container } from './container';
import { Description } from './description';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Relationship } from './relationship';
import { Tags } from './tags';
import { Url } from './url';
import { Adrs } from '../others/adrs';
import { Docs } from '../others/docs';

export interface ISoftwareSystem {
    id?: string;
    name: string;
    description?: string;
    tags?: string[];
    children?: Array<Group | Container | Description | Tags | Url | Properties | Perspectives | Relationship | Docs | Adrs>
}

export class SoftwareSystem implements ISerializeable {
    
    private id?: string;
    private name: string;
    private description: string;
    private tags?: string[];
    private children?: Array<Group | Container | Description | Tags | Url | Properties | Perspectives | Relationship | Docs | Adrs >

    /**
     * 
     * @example
     * [id] = softwareSystem <name> [description] [tags]
     */
    constructor(softwareSystem: ISoftwareSystem) {
        this.id = softwareSystem.id;
        this.name = softwareSystem.name;
        this.description = softwareSystem.description;
        this.tags = softwareSystem.tags;
        this.children = softwareSystem.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} softwaresystem "${this.name}" ${Optional(this.description)} ${Optional(this.tags)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
