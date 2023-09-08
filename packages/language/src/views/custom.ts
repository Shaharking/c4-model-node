import { Description, Properties } from '../model';
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Optional, OptionalChildren } from '../shared/serializerHelper';
import { AutoLayout } from './autoLayout';
import { Default } from './default';
import { Include } from './include';
import { Exclude } from './exclude'
import { Title } from './title';
import { Animation } from './animation'

export interface ICustomView {
    key?: string;
    title?: string;
    description?: string;
    children?: Array<Include | Exclude | AutoLayout | Default | Animation | Title | Description | Properties>;
}

export class CustomView implements ISerializeable {

    private key?: string;
    private title?: string;
    private description?: string;
    private children?: Array<Include | Exclude | AutoLayout | Default | Animation | Title | Description | Properties>;

    constructor(customView: ICustomView) {
        this.key = customView.key;
        this.title = customView.title;
        this.description = customView.description;
        this.children = customView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`custom ${Optional(this.key)} ${Optional(this.title)} ${Optional(this.description)} ${OptionalChildren(parentContext, this.children)}`);
    }
}
