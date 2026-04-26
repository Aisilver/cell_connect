export function IsValidImageExtension (extension: string) {
    const allowedExt = ['jpg', 'jpeg', "webp", "png"]

    return allowedExt.includes(extension.toLowerCase())
}