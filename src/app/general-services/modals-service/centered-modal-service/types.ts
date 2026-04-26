import { ModalCreationOption } from "../types";

export type CenteredModalEntryTypes = "bottom" | "center";

export type CenteredModalCreationOptions = {
    closeableByBackgroundClick?: boolean;
    doNotBlurBackground?: boolean,
    entryType?: CenteredModalEntryTypes,
    useBottomEntryOnMobileView?: boolean
} & ModalCreationOption
