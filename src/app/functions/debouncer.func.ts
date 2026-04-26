const map = new Map<string, number>()

export function Debouncer (tag: string, action: () => void, debounceTime = 500) {
    if(map.has(tag)){
        clearTimeout(map.get(tag))
        map.delete(tag)
    }

    map.set(tag, setTimeout(action, debounceTime))
}