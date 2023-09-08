import { Properties } from '../model';
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { OptionalChildren } from '../shared/serializerHelper';
import { Branding } from './branding';
import { ComponentView } from './component';
import { ContainerView } from './container';
import { CustomView } from './custom';
import { DeploymentView } from './deployment';
import { DynamicView } from './dynamic';
import { FilteredView } from './filtered';
import { ImageView } from './image';
import { Styles } from './styles';
import { SystemContextView } from './systemContext';
import { SystemLandscapeView } from './systemLandscape';
import { Terminology } from './terminology';
import { Theme } from './theme';
import { Themes } from './themes';

export interface IViews {
    children?: Array<
        SystemLandscapeView |
        SystemContextView |
        ContainerView |
        ComponentView |
        FilteredView |
        DynamicView |
        DeploymentView |
        CustomView |
        ImageView |
        Styles |
        Theme |
        Themes |
        Branding |
        Terminology |
        Properties
    >;
}

export class Views implements ISerializeable {
    private children?: Array<
        SystemLandscapeView |
        SystemContextView |
        ContainerView |
        ComponentView |
        FilteredView |
        DynamicView |
        DeploymentView |
        CustomView |
        ImageView |
        Styles |
        Theme |
        Themes |
        Branding |
        Terminology |
        Properties
    >;

    constructor(views: IViews) {
        this.children = views.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`views ${OptionalChildren('views', this.children)}`);
    }

    public add(childrens: IViews['children']) {
        this.children.push(...childrens);
    }
}
