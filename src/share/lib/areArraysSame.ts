export default function (a: any[], b: any[]): boolean {
    return a.length === b.length && a.every((value, index) => value === b[index])
}