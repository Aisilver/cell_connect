export function RandomFrom<T>(source: T []) {
    const randomIndex = Math.floor(Math.random() * source.length)

    return source[randomIndex]
}

export function RandomNumberFrom (limit: number = 10) {
    return Math.floor(Math.random() * limit)
}

export function RandomBetween (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}