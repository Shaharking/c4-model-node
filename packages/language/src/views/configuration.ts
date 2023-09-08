import { Properties } from "../model";
import { ISerializeable, Serialize } from "../shared/iserializeable";
import { OptionalChildren } from "../shared/serializerHelper";
import { User } from "./user";
import { Visibility } from "./visibility";

export interface IConfiguration {
    children: Array<Visibility | User | Properties>;
}

export class Configuration implements ISerializeable {

    private children: Array<Visibility | User | Properties>;

    constructor(configuration: IConfiguration) {
        this.children = configuration.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`configuration ${OptionalChildren(parentContext, this.children)}`);
    }
}