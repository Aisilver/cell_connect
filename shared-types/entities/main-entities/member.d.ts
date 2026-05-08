import { EntityBase } from "../entity-base";
import { Cell } from "./cell";
import { CellPermission } from "./cell-permission";
import { Suspension } from "./suspension";
import { UserAccount } from "./user-account";

export type MemberStatusTypes = "active" | "left" | "pending-approval" | "removed"

export type MemberRoleTypes = "member" | "cell-admin"

export interface Member extends EntityBase {
    cell_id?: number;
    new: boolean;
    status: MemberStatusTypes;
    cell?: Cell;
    account?: UserAccount;
    roles: MemberRoleTypes;
    cell_permission?: CellPermission;
    suspension?: Suspension;
    suspensions?: Suspension[];
}