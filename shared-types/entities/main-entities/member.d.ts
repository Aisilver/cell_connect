import { EntityBase } from "../entity-base";
import { Attendance } from "./attendance";
import { Cell } from "./cell";
import { CellPermission } from "./cell-permission";
import { MemberSuspension, Suspension } from "./suspension";
import { UserAccount } from "./user-account";

export type MemberStatusTypes = "active" | "left" | "pending-approval" | "removed"

export type MemberRoleTypes = "member" | "cell-admin"

export interface Member extends EntityBase {
    new: boolean;
    status: MemberStatusTypes;
    roles: MemberRoleTypes;
    cell?: Cell;
    account?: UserAccount;
    attendances?: Attendance[];
    cell_permission?: CellPermission;
    suspension?: MemberSuspension;
    suspensions?: MemberSuspension[];
}