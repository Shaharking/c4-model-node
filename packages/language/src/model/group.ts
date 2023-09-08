import { Optional, OptionalChildren, OptionalId } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { SoftwareSystem } from './softwareSystem';
import { Component } from './component';
import { Container } from './container';
import { Person } from './person';

export interface IGroup {
    id?: string;
    name: string;
    children: Array<Person | SoftwareSystem | Container | Component | Group >
}

export class Group implements ISerializeable {
    
    private id?: string;
    private name: string;
    private children: Array<Person | SoftwareSystem | Container | Component | Group >

    /**
     * 
     * @example
     * group <name>
     */
    constructor(group: IGroup) {
        this.id = group.id;
        this.name = group.name;
        this.children = group.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`${OptionalId(this.id)} group "${this.name}" ${OptionalChildren(parentContext, this.children)}`);
    }
}
