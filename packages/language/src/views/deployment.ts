import { Description, Properties } from '../model';
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Optional, OptionalChildren } from '../shared/serializerHelper';
import { AutoLayout } from './autoLayout';
import { Default } from './default';
import { Include } from './include';
import { Title } from './title';
import { Exclude } from './exclude'
import { Animation } from './animation'

export interface IDeploymentView {
    /**
     * The first property defines the scope of the view, and the second property is the deployment environment.
     * - Use "*" for all software systems.
     * - Use the identifier of a specific software system to define the view for that software system.
     */
    scope: '*' | string;
    environment: string;
    key?: string;
    description?: string;
    children?: Array<Include | Exclude | AutoLayout | Default | Animation | Title | Description | Properties>;
}

export class DeploymentView implements ISerializeable {

    private scope: '*' | string;
    private environment: string;
    private key?: string;
    private description?: string;
    private children?: Array<Include | Exclude | AutoLayout | Default | Animation | Title | Description | Properties>;

    /**
     * 
     * @example
     * deployment <scope> <environment> [key] [description]
     */
    constructor(deploymentView: IDeploymentView) {
        this.scope = deploymentView.scope;
        this.environment = deploymentView.environment;
        this.key = deploymentView.key;
        this.description = deploymentView.description;
        this.children = deploymentView.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`deployment ${this.scope} ${this.environment} ${Optional(this.key)} ${Optional(this.description)} ${OptionalChildren(parentContext, this.children)}`);
    }
}