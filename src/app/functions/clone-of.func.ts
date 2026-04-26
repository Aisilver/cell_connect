export function CloneOf<T> (target: T): T {
    return JSON.parse(JSON.stringify(target))
}