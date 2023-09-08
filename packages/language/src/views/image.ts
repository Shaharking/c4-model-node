import { Description, Properties } from "../model";
import { ISerializeable, Serialize } from "../shared/iserializeable";
import { Optional, OptionalChildren } from "../shared/serializerHelper";
import { Default } from "./default";
import { Title } from "./title";

type plantuml = { type: 'plantuml', fileUrl: string };
type mermaid = { type: 'mermaid ', fileUrl: string };
type kroki =  { type: 'kroki', format: string, fileUrl: string } 
type image =  { type: 'image', fileUrl: string };

export class ImageViewImage implements ISerializeable {
    constructor (private image: plantuml | mermaid | kroki | image) {

    }

    public serialize(parentContext: 'model' | 'views'): string {
        if (['plantuml', 'mermaid', 'image'].includes(this.image.type)) {
            return `${this.image.type} ${this.image.fileUrl}`;
        }
        else if (this.image.type === 'kroki') {
            return `${this.image.type} ${this.image.format} ${this.image.fileUrl}`;
        }
    }
   
}

export interface IImageView {
    elementIdentifier?: "*" | string;
    key?: string;
    children?: Array< ImageViewImage | Default | Title | Description | Properties>
}

export class ImageView implements ISerializeable {

    private elementIdentifier?: "*" | string;
    private key?: string;
    private children?: Array< ImageViewImage | Default | Title | Description | Properties>

    /**
     * 
     * @example
     * image <*|element identifier> [key] 
     */
    constructor(image: IImageView) {
        this.elementIdentifier = image.elementIdentifier;
        this.key = image.key;
        this.children = image.children || [];
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`image ${this.elementIdentifier} ${Optional(this.key)} ${OptionalChildren(parentContext, this.children)}`);
    }
}