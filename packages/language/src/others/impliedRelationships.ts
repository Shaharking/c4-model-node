import { ISerializeable, Serialize } from "../shared/iserializeable";

export interface IImpliedRelationships {
    value: boolean;
  }
  
  export class ImpliedRelationships implements ISerializeable {
    private value: boolean;
  
    constructor(impliedRelationships: IImpliedRelationships) {
      this.value = impliedRelationships.value;
    }
  
    public serialize(parentContext: 'model' | 'views') {
      return Serialize(`!impliedRelationships ${this.value}`);
    }
  }
  