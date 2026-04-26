import { EntityBase } from "../entity-base";
import { Cell } from "./cell";
import { UserAccount } from "./user-account";

export type MemberStatusTypes = "active" | "suspended" | "left" | "pending-approval" | "removed"

export interface Member extends EntityBase {
    cell_id?: number;
    new: boolean;
    status: MemberStatusTypes;
    cell?: Cell;
    account?: UserAccount;
}