import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional } from "../shared/serializerHelper";
export interface IAutoLayout {
    /**
     * rank direction:

        tb: Top to bottom (default)
        bt: Bottom to top
        lr: Left to right
        rl: Right to left */

    rankDirection?: 'tb' | 'bt' | 'lr' | 'rl';
    /** The second property is the separation of ranks in pixels (default: 300) */
    rankSeparation?: string;
    /**  the separation of nodes in the same rank in pixels */
    nodeSeparation?: string; 
}

export class AutoLayout implements ISerializeable {

    private rankDirection?: 'tb' | 'bt' | 'lr' | 'rl';
    /** The second property is the separation of ranks in pixels (default: 300) */
    private rankSeparation?: string;
    /**  the separation of nodes in the same rank in pixels */
    private nodeSeparation?: string; 

    constructor(autoLayout: IAutoLayout = {}) {
        this.rankDirection = autoLayout.rankDirection || "tb";
        this.rankSeparation = autoLayout.rankSeparation || "300";
        this.nodeSeparation = autoLayout.nodeSeparation || "300";
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`autoLayout ${Optional(this.rankDirection)} ${Optional(this.rankSeparation)} ${Optional(this.nodeSeparation)}`);
    }
}