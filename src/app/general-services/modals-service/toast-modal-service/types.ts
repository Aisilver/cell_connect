import { ModalCreationOption } from "../types"

export type ToastEntryPosition = "bottom-right" | "bottom-left" | "bottom-center"

export type ToastKeepAliveTimingTypes = "short" | "long" | "self-time"

export type ToastModalCreationOptions = {
    positionStyle?: ToastEntryPosition,
    keepAliveTime?: ToastKeepAliveTimingTypes
} & ModalCreationOption