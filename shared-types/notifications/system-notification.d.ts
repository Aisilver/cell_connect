export type SystemNotificationLevelTypes = "general" | "administration"

export type SystemNotificationGroupTypes = "account" | "meeting"

export interface SystemNotification <PayloadData, Key extends keyof PayloadData = keyof PayloadData> {
    authurizationLevel: SystemNotificationLevelTypes;

    entityGroup: SystemNotificationGroupTypes;

    key: Key;

    payload: PayloadData[Key];
} 