export type SystemNotificationLevelTypes = "general" | "administration"

export type SystemNotificationGroupTypes = "account" | "meeting"

export type SystemNotification<
  PayloadData,
  Key extends keyof PayloadData = keyof PayloadData
> = Key extends keyof PayloadData
  ? {
      authurizationLevel: SystemNotificationLevelTypes;
      entityGroup: SystemNotificationGroupTypes;
      key: Key;
      payload: PayloadData[Key];
    }
  : never;