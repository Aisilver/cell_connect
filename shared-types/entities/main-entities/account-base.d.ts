import { EntityBase } from "../entity-base";
import { Media } from "./media";
import { User } from "./user";

export type AccountOnlineStatuses = "online" | "offline";

export type AccountType = "admin" | "user"

export interface AccountBase extends EntityBase {
    banned: boolean;
    type?: AccountType;
    suspended: boolean;
    online_status: AccountOnlineStatuses;
    profile_image?: Media;
    user?: User
}