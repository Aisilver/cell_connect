import { IconConfiguration } from "../../../types/icon-configuration.type"

export type DropDownUnit<Data = unknown> = {
    key: string,
    text?: string,
    data?: Data,
    isRed?: boolean,
    icon?: IconConfiguration,
    blurred?: boolean
}