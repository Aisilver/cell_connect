export function ToBytes(unit: "kb" | "mb", sizeInBytes: number) {
    const oneKilobyte = 1024,

    oneMegabyte = oneKilobyte * oneKilobyte

    switch(unit) {
        case "kb": return Math.floor(sizeInBytes / oneKilobyte)
        case "mb": return Math.floor(sizeInBytes / oneMegabyte)
    }
}