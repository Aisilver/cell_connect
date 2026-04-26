const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

numbers = "0123456789"

export function UUIDGenerator (length = 6, type: "all" | "only-letters" | "only-numbers" = "all") {
    let result = "", chars = ""

    switch(type) {
        case "only-letters": chars = letters
            break
        case "only-numbers": chars = numbers
            break
        default: chars = `${letters}${numbers}`
            break
    }

    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * chars.length)

        result += chars[randIndex]
    }

    return result
}