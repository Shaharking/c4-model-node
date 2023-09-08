import { Properties } from "../model";
import { ISerializeable, Serialize } from "../shared/iserializeable";


export interface IElementStyle {
    /**
     * The tag of the element to which the style should be applied.
     */
    tag: string;
    /**
     * Configuration options for the element style.
     */
    children: {
        shape?: "Box" |"RoundedBox" | "Circle" | "Ellipse" | "Hexagon" | "Cylinder" | "Pipe" | "Person" | "Robot" | "Folder" | "WebBrowser" | "MobileDevicePortrait" | "MobileDeviceLandscape" | "Component"
        icon?: string;
        width?: string;
        height?: string;
        background?: string;
        color?: string;
        colour?: string;
        stroke?: string;
        strokeWidth?: string;
        fontSize?: string;
        border?: "solid" | "dashed" | "dotted";
        opacity?: string;
        metadata?: "true"| "false";
        description?: "true|false";
        properties?: Properties
    };
}

export class ElementStyle implements ISerializeable {

    private tag: string;
    private children: {
        shape?: "Box" |"RoundedBox" | "Circle" | "Ellipse" | "Hexagon" | "Cylinder" | "Pipe" | "Person" | "Robot" | "Folder" | "WebBrowser" | "MobileDevicePortrait" | "MobileDeviceLandscape" | "Component"
        icon?: string;
        width?: string;
        height?: string;
        background?: string;
        color?: string;
        colour?: string;
        stroke?: string;
        strokeWidth?: string;
        fontSize?: string;
        border?: "solid" | "dashed" | "dotted";
        opacity?: string;
        metadata?: "true"| "false";
        description?: "true|false";
        properties?: Properties
    };

    /**
     * 
     * @param element - The configuration object for the element style.
     * @example
     * // Creating a new ElementStyle with a tag and shape.
     * const elementStyle = new ElementStyle({
     *     tag: "ElementTag",
     *     children: {
     *         shape: "Box"
     *     }
     * })
     * Output:
     * element ElementTag {
     *     shape Box
     * }
     */
    constructor(element: IElementStyle) {
        this.tag = element.tag;
        this.children = element.children || {};
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`element "${this.tag}" {
            ${Object.entries(this.children).map(([key, value]) => {
                if (key === 'properties') {
                    return this.children.properties.serialize(parentContext);
                }
                else {
                    return `${key} ${value}`
                }
            }).join("\n")}
        }`);
    }
}