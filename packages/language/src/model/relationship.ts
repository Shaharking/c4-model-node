import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Optional, OptionalChildren } from '../shared/serializerHelper';
import { Perspectives } from './perspectives';
import { Properties } from './properties';
import { Tags } from './tags';
import { Url } from './url';

export interface IRelationship {
    sourceId?: string;
    destinationId: string;
    description?: string;
    technology?: string;
    tags?: string[];
    children?: Array<Tags | Url | Properties | Perspectives>
}

export class Relationship implements ISerializeable{

    private sourceId?: string;
    private destinationId: string;
    private description?: string;
    private technology?: string;
    private tags?: string[];
    private children?: Array<Tags | Url | Properties | Perspectives>

    /**
     * 
     * @example 
     * <sourceId> -> <destinationId> [description] [technology] [tags] 
     */
    constructor(relationship: IRelationship) {
        this.sourceId = relationship.sourceId;
        this.destinationId = relationship.destinationId;
        this.description = relationship.description;
        this.technology = relationship.technology;
        this.tags = relationship.tags;
        this.children = relationship.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${Optional(this.sourceId)} -> ${this.destinationId} ${Optional(this.description)} ${Optional(this.technology)} ${Optional(this.tags, { omitEmpty: parentContext === 'views'})} ${OptionalChildren(parentContext, this.children)}`);
    }
}
