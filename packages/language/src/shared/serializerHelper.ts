import { ISerializeable } from "./iserializeable";

export function Optional(value: number | string | string[] | undefined, { omitEmpty = false } = { }) {
    if (Array.isArray(value) && value.length > 0) {
        return `"${value.join(",")}"`
    } 
    if (value) { 
        return `"${value}"`;
    }
    else if (!omitEmpty) {
        return `""`;
    }
    else {
        return '';
    }
}

export function OptionalId(value: string) {
    if (value) {
        return `${value} =`
    }
    return "";
}

export function OptionalKeyValue(value: string, key: string) {
    if (value) {
        return `${key} ${value}`
    }
    return '';
}

export function OptionalChildren(parentContext: 'model' | 'views', children: ISerializeable[]): string {
    if (Array.isArray(children) && children.length> 0) {
        return `{
            ${children.map(child => child.serialize(parentContext)).join("\n")}
        }`
    }
    return '';
}