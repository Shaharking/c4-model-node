import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Include } from './include';
import { Exclude } from './exclude';
import { AutoLayout } from './autoLayout';
import { Default } from './default';
import { Animation } from './animation';
import { Title } from './title';
import { Description, Properties } from '../model';
import { OptionalChildren } from '../shared/serializerHelper';

/**
 * Represents a Container view in the DSL.
 * The Container view allows you to visualize the containers within the software system
 * and the relationships between them.
 */
export interface IContainerView {
    /**
     * The identifier of the software system for which the Container view is being defined.
     */
    softwareSystem: string;
    /**
     * An optional key that uniquely identifies the Container view.
     */
    key?: string;
    /**
     * An optional key that uniquely identifies the Container view.
     */
    description?: string;
    /**
     * An array of child elements that can be included in the Container view.
     * These elements include `Include`, `Exclude`, `AutoLayout`, `Default`, `Animation`, `Title`,
     * `Description`, and `Properties`.
     */
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

export class ContainerView implements ISerializeable {
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
     * @param containerView container <software system identifier> [key] [description]
     * @example
     * // Creating a new ContainerView with software system identifier and description.
     * const containerView = new ContainerView({
     *     softwareSystem: "softwareSystem",
     *     key: "Container_All"
     *     description: "Container view for my software system.",
     * });

     */
    constructor(containerView: IContainerView) {
        this.softwareSystem = containerView.softwareSystem;
        this.key = containerView.key;
        this.description = containerView.description;
        this.children = containerView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`container ${this.softwareSystem} ${this.key ? this.key : ''} ${this.description ? `"${this.description}"` : ''} ${OptionalChildren(parentContext, this.children)}`);
    }
}
