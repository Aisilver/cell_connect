import { EntityBase } from "../entity-base";
import { Media } from "./media";
import { User } from "./user";

export type AccountOnlineStatuses = "online" | "offline";

export type AccountType = "admin" | "user"

export type AccountStatuses = "active" | "frozen" | "deleted";

export interface AccountBase extends EntityBase {
    banned: boolean;
    new: boolean;
    status: AccountStatuses;
    online_status: AccountOnlineStatuses;
    type?: AccountType;
    profile_image?: Media;
    user?: User
}