import { EntityBase } from "../entity-base";
import { Cell } from "./cell";
import { UserAccount } from "./user-account";

export type LeaderStatutsTypes = "active" | "suspended" | "concluded"

export interface Leader extends EntityBase {
    cell_id?: number;
    new: boolean;
    status: LeaderStatutsTypes;
    cell?: Cell;
    account?: UserAccount;
}