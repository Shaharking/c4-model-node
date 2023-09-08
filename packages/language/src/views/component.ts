import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Include } from './include';
import { Exclude } from './exclude';
import { AutoLayout } from './autoLayout';
import { Default } from './default';
import { Animation } from './animation';
import { Title } from './title';
import { Description, Properties } from '../model';
import { OptionalChildren } from '../shared/serializerHelper';

export interface IComponentView {
    container: string;
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

export class ComponentView implements ISerializeable {
    private container: string;
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
     * @example
     * component <container identifier> [key] [description]
     */
    constructor(componentView: IComponentView) {
        this.container = componentView.container;
        this.key = componentView.key;
        this.description = componentView.description;
        this.children = componentView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`component ${this.container} ${this.key ? this.key : ''} ${this.description ? `"${this.description}"` : ''} ${OptionalChildren(parentContext, this.children)}`);
    }
}
