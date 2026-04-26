export type DialogueTypes = "success" | "message" | "alert"

export type DialogueButtonConfiguration = {
    text: string,
}

export type DialogueOptions = {
    title?: string,
    type?: DialogueTypes,
    message: string,
}

export type UserDialogueOptions = {
    buttonConfig?: DialogueButtonConfiguration;
} & DialogueOptions

export type ConfirmDialogueOutput = {
    answer: boolean,
    doNotAskAgain?: boolean
}

export type ConfirmDialogueOptions = {
    includeDonNotAskAgain?: boolean,
    buttonConfig?: {
        yesButton: DialogueButtonConfiguration,
        noButton: DialogueButtonConfiguration
    }
} & DialogueOptions