import { ISerializeable, Serialize } from "../shared/iserializeable";
import { OptionalChildren } from "../shared/serializerHelper";

export class User implements ISerializeable {
    private username: string;
    private role: "read" | "write";

    constructor(username: string, role: "read" | "write") {
        this.username = username;
        this.role = role;
    }

    public serialize(parentContext: 'model' | 'views') {
        return `user ${this.username} ${this.role}`;
    }
}

export class Users implements ISerializeable {
    private users: User[];

    constructor(users: User[]) {
        this.users = users;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`users ${OptionalChildren(parentContext, this.users)}`);
    }
}
