import { EntityBase } from "../entity-base";
import { Cell } from "./cell";
import { CellPermission } from "./cell-permission";
import { MemberSuspension, Suspension } from "./suspension";
import { UserAccount } from "./user-account";

export type MemberStatusTypes = "active" | "left" | "pending-approval" | "removed"

export type MemberRoleTypes = "member" | "cell-admin"

export interface Member extends EntityBase {
    new: boolean;
    status: MemberStatusTypes;
    cell?: Cell;
    account?: UserAccount;
    roles: MemberRoleTypes;
    cell_permission?: CellPermission;
    suspension?: MemberSuspension;
    suspensions?: MemberSuspension[];
}