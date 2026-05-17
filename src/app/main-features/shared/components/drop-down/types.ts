import { IconConfiguration } from "../../../types/icon-configuration.type"

export type DropDownStyleTypes = "default" | "white-background"

export type DropDownUnit<Data = unknown> = {
    key: string,
    id?: string,
    text?: string,
    data?: Data,
    isRed?: boolean,
    icon?: IconConfiguration,
    blurred?: boolean
}