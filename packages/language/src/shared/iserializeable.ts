export interface ISerializeable {
    serialize(parentContext: 'model' | 'views'): string;
}

export function Serialize(str: string) {
    return `${str}\n`
}

// export function prettify(code: string): string {
//     let indentLevel = 0;
//     const lines = code.split('\n');
  
//     const result = lines
//       .map((line) => line.trim())
//       .map((line) => {
//         if (line.endsWith('{')) {
//           const indent = '    '.repeat(indentLevel);
//           indentLevel++;
//           return indent + line;
//         } else if (line.endsWith('}')) {
//           indentLevel--;
//           const indent = '    '.repeat(indentLevel);
//           return indent + line;
//         } else {
//           const indent = '    '.repeat(indentLevel);
//           return indent + line;
//         }
//       })
//       .join('\n');
  
//     return result;
//   }
  
export function prettify(code: string): string {
    let indentLevel = 0;
    const lines = code.split('\n');

    const result = lines
    .map((line) => line.trim())
    .filter((line) => line !== '') // Remove empty lines
    .map((line) => {
        if (line.endsWith('{')) {
        const indent = '    '.repeat(indentLevel);
        indentLevel++;
        return indent + line + '\n';
        } else if (line.endsWith('}')) {
        indentLevel--;
        const indent = '    '.repeat(indentLevel);
        return '\n' + indent + line;
        } else {
        const indent = '    '.repeat(indentLevel);
        return indent + line;
        }
    })
    .join('\n');

    return result;
}



