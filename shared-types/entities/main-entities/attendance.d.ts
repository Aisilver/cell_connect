import { EntityBase } from "../entity-base";
import { Meeting } from "./meeting";
import { Member } from "./member";
import { UserAccount } from "./user-account";

export type AttendancePuntualityTypes = "late" | "on-time"

export interface Attendance extends EntityBase {
    isLeader: boolean;
    valid: boolean;
    puntuality: AttendancePuntualityTypes;
    departureTime?: Date;
    validatedAt?: Date;
    validator?: UserAccount;
    membership?: Member;
    account?: UserAccount;
    meeting?: Meeting;
}