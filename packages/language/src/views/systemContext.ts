import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Include } from './include';
import { Exclude } from './exclude';
import { AutoLayout } from './autoLayout';
import { Default } from './default';
import { Animation } from './animation';
import { Title } from './title';
import { Description, Properties } from '../model';
import { OptionalChildren } from '../shared/serializerHelper';

export interface ISystemContextView {
    softwareSystem: string;
    key?: string;
    description?: string;
    children?: Array<
        Include |
        Exclude |
        AutoLayout |
        Default |
        Animation |
        Title |
        Description |
        Properties
    >;
}

export class SystemContextView implements ISerializeable {
    private softwareSystem: string;
    private key?: string;
    private description?: string;
    private children: Array<
        Include |
        Exclude |
        AutoLayout |
        Default |
        Animation |
        Title |
        Description |
        Properties
    >;

    /**
     * 
     * @description The systemContext keyword is used to define a System Context view for the specified software system.
     * @param systemContextView 
     * @example 
     * systemContext <software system identifier> [key] [description]
     */
    constructor(systemContextView: ISystemContextView) {
        this.softwareSystem = systemContextView.softwareSystem;
        this.key = systemContextView.key;
        this.description = systemContextView.description;
        this.children = systemContextView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`systemContext ${this.softwareSystem} ${this.key ? this.key : ''} ${this.description ? `"${this.description}"` : ''} ${OptionalChildren(parentContext, this.children)}`);
    }
}
