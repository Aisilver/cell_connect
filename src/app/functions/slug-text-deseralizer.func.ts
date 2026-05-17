export function SlugTextDesralizer (value?: string) {
    try {
        if(!value) throw Error()

        if(!value.includes("_") || value.includes(" ")) throw Error()

        return value.replaceAll("_", " ")
    } catch {
        return String(value)
    }
}