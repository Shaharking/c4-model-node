import { ISerializeable, Serialize } from "../shared/iserializeable";

  export class Identifiers implements ISerializeable {
    private type: string;
  
    constructor(type: "hierarchical" = "hierarchical") {
      this.type = type;
    }
  
    public serialize(parentContext: 'model' | 'views') {
      return Serialize(`!identifiers ${this.type}`);
    }
  }
  