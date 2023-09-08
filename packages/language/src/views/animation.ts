import { ISerializeable, Serialize } from "../shared/iserializeable";

export interface IAnimation {
    identifier: string[]
}

export class Animation implements ISerializeable {

    private identifier: string[];

    constructor(animation: IAnimation) {
        this.identifier = animation.identifier;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`animation {
            ${this.identifier.join("\n")}
        }`);
    }
}