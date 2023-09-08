import { Description, Properties } from '../model';
import { ISerializeable } from '../shared/iserializeable';
import { OptionalChildren } from '../shared/serializerHelper';
import { Default } from './default';
import { Title } from './title';

export interface IFilteredView {
    baseKey: string;
    mode: 'include' | 'exclude';
    tags: string;
    key?: string;
    description?: string;
    children?: Array<Default | Title | Description | Properties>;
}

export class FilteredView implements ISerializeable {
    private baseKey: string;
    private mode: 'include' | 'exclude';
    private tags: string;
    private key?: string;
    private description?: string;
    private children: Array<Default | Title | Description | Properties>;

    constructor(filteredView: IFilteredView) {
        this.baseKey = filteredView.baseKey;
        this.mode = filteredView.mode;
        this.tags = filteredView.tags;
        this.key = filteredView.key;
        this.description = filteredView.description;
        this.children = filteredView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return `filtered ${this.baseKey} ${this.mode} "${this.tags}" ${this.key ? this.key : ''} ${this.description ? `"${this.description}"` : ''} ${OptionalChildren(parentContext, this.children)}`;
    }

}
