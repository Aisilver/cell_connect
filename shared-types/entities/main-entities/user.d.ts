import { EntityBase } from "../entity-base";
import { AccountBase } from "./account-base";
import { AppLocation } from "./app-location"
export type UserStatuses = "active" | "frozen" | "deleted";
export interface User extends EntityBase {
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    altPhoneNumber?: string;
    email: string;
    password: string;
    gender: string;
    maritalStatus: string;
    DOB: Date;
    new: boolean;
    status: UserStatuses;
    accounts?: AccountBase[];
    location?: AppLocation;
}