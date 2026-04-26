import { EntityBase } from "../entity-base";
import { Meeting } from "./meeting";
import { UserAccount } from "./user-account";

export type AttendanceStatusTypes = "present" | "late" | "absent"

export interface Attendance extends EntityBase {
    isLeader: boolean;
    arrivalTime?: Date;
    departureTime?: Date;
    valid: boolean;
    status: AttendanceStatusTypes;
    account?: UserAccount;
    meeting?: Meeting;
}