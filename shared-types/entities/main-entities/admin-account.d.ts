import { AccountBase } from "./account-base";
import { AccountSuspension } from "./suspension";

export interface AdminAccount extends AccountBase {
    suspension?: AccountSuspension;
    suspensions?: AccountSuspension[];
}