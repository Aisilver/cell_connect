
export interface LoaderConfigMap {
    "four-circles": {
        load_text?: string,
        size?: number,
        color_theme?: "white" | "black"
    },

    "swirl": {
        color?: "white" | "black"
    },

    "gradient": {
        load_text?: string,
        type?: "coloured" | "gray"
    }
}

export type LoaderOptions = keyof LoaderConfigMap | {
    [K in keyof LoaderConfigMap]: {[P in K]: LoaderConfigMap[P]}
}[keyof LoaderConfigMap]