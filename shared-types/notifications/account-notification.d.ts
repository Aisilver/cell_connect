import { AccountBase } from "../entities/main-entities/account-base";
import { SystemNotification } from "./system-notification";

export type AccountNotification = SystemNotification<{
    "account-created": AccountBase;

    "account-signed-in": AccountBase;

    "account-signed-out": AccountBase
}>