import { EntityBase } from "../entity-base";
import { Attendance } from "./attendance";
import { Cell } from "./cell";
import { UserGenderTypes, UserMaritalStatuses } from "./user";

export interface OfflineMember extends EntityBase {
    firstName: string;
    lastName: string;
    email?: string;
    middleName?: string;
    DOB: Date;
    gender: UserGenderTypes;
    maritalStatus: UserMaritalStatuses;
    cell?: Cell;
    attendances?: Attendance[] 
}