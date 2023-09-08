import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Include } from './include';
import { Exclude } from './exclude';
import { AutoLayout } from './autoLayout';
import { Default } from './default';
import { Animation } from './animation';
import { Title } from './title';
import { Description, Properties } from '../model';
import { OptionalChildren } from '../shared/serializerHelper';

export interface ISystemLandscapeView {
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

export class SystemLandscapeView implements ISerializeable {
    private key?: string;
    private description?: string;
    private children?: Array<
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
     * systemLandscape [key] [description]
     */
    constructor(systemLandscapeView: ISystemLandscapeView) {
        this.key = systemLandscapeView.key;
        this.description = systemLandscapeView.description;
        this.children = systemLandscapeView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`systemLandscape ${this.key ? this.key : ''} ${this.description ? `"${this.description}"` : ''} ${OptionalChildren(parentContext, this.children)}`);
    }
}
