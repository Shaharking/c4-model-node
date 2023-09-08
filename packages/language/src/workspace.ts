import { Model, IModel } from './model'
import { ISerializeable } from './shared/iserializeable';
import { Optional } from './shared/serializerHelper';
import { IViews, Views } from './views';
import { Identifiers, ImpliedRelationships, Adrs, Docs } from './others';

export interface IWorkspace {
    name?: string;
    description?: string;
    fileUrl?: string;
    model?: Model;
    views?: Views;
    children?: Array<Identifiers | ImpliedRelationships | Adrs | Docs>;
}

export class Workspace implements ISerializeable {
    
    private model: Model;
    private views: Views;
    private name?: string;
    private description?: string;
    private fileUrl?: string;
    private children?: Array<Identifiers | ImpliedRelationships | Adrs | Docs>;

    /**
     * @example
     * workspace [name] [description] extends <file|url>
     */
    constructor(workspace: IWorkspace = {}) {
        this.model = workspace.model || new Model({});
        this.views = workspace.views || new Views({});
        this.children = workspace.children || [];
        this.name = workspace.name;
        this.description = workspace.description;
        this.fileUrl = workspace.fileUrl;
    }

    public serialize() {
        return `workspace ${Optional(this.name)} ${Optional(this.description)} ${this.fileUrl ? `extends ${this.fileUrl}` : ''} {

            ${this.children.map(child => child.serialize(null)).join("")}

            ${this.model.serialize('model')}

            ${this.views.serialize('views')}
        }
        `
    }

    public addModelChildrens(childrens: IModel['children']) {
        this.model.add(childrens)
    }

    public addViewChildrens(childrens: IViews['children']) {
        this.views.add(childrens)
    }

    public addOthers(childrens: Array<Identifiers | ImpliedRelationships | Adrs | Docs>) {
        this.children.push(...childrens)
    }
}
