import { EntityBase } from "../entity-base";
import { Cell } from "./cell";
import { CellPermission } from "./cell-permission";
import { UserAccount } from "./user-account";

export type LeaderStatutsTypes = "active" | "concluded"

export interface Leader extends EntityBase {
    cell_id?: number;
    new: boolean;
    status: LeaderStatutsTypes;
    cell_permission: CellPermission;
    cell?: Cell;
    account?: UserAccount;
}