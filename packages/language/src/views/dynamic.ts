import { Description, Properties, Relationship } from "../model";
import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional, OptionalChildren } from "../shared/serializerHelper";
import { AutoLayout } from "./autoLayout";
import { Default } from "./default";
import { Title } from "./title";


export interface IDynamicView  {
    /**
        * The first property defines the scope of the view, and therefore what can be added to the view, as follows:

        * scope: People and software systems.
        * Software system scope: People, other software systems, and containers.
        * Container scope: People, other software systems, other containers, and components. 
    */
    scope: "*" | string;
    key?: string;
    description?: string;
    children?: Array<AutoLayout | Default | Title | Description | Properties | Relationship>
}

export class DynamicView implements ISerializeable {

    private scope: "*" | string;
    private key?: string;
    private description?: string;
    private children?: Array<AutoLayout | Default | Title | Description | Properties | Relationship>

    /**
     * 
     * @example
     * dynamic <*|software system identifier|container identifier> [key] [description] 
     */
    constructor(dynamicView: IDynamicView) {
        this.scope = dynamicView.scope;
        this.key = dynamicView.key;
        this.description = dynamicView.description;
        this.children = dynamicView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`dynamic ${this.scope} ${Optional(this.key)} ${Optional(this.description)} ${OptionalChildren(parentContext, this.children)}`)
    }
}