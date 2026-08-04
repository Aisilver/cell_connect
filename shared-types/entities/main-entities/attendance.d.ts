import { EntityBase } from "../entity-base";
import { Meeting } from "./meeting";
import { Member } from "./member";
import { OfflineMember } from "./offline-member";
import { UserAccount } from "./user-account";

export type AttendancePuntualityTypes = "late" | "on-time"

export type AttendanceTypes = "offline" | "online"

export interface Attendance extends EntityBase {
    type: AttendanceTypes;
    valid: boolean;
    puntuality: AttendancePuntualityTypes;
    departureTime?: Date;
    validatedAt?: Date;
    validator?: UserAccount;
    membership?: Member;
    offlineMembership?: OfflineMember;
    meeting?: Meeting;
}   