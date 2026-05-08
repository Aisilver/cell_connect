import { EntityBase } from "../entity-base";
import { AccountBase } from "./account-base";
import { Cell } from "./cell";
import { Member } from "./member";

export type SuspensionTypes = "member-suspension" | "cell-suspension" | "account-suspension"

export interface Suspension extends EntityBase {
    endDate: Date;
    active: boolean;
    reason: string;
    description?: string;
    suspender: AccountBase;
    type?: SuspensionTypes
}

export interface CellSuspension extends Suspension {
    cell: Cell
}

export interface MemberSuspension extends Suspension {
    member: Member
}

export interface AccountSuspension extends Suspension {
    account: AccountBase
}