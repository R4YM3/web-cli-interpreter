export function dedent(str:string) {
    return str.split('\n').map((line:string) => line.trim()).join('\n');
}
