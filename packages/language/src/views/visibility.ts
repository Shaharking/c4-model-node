import { ISerializeable, Serialize } from "../shared/iserializeable";

export class Visibility implements ISerializeable {
    private visibility: "private" | "public";

    constructor(visibility: "private" | "public") {
        this.visibility = visibility;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`visibility ${this.visibility}`);
    }
}
