import { EntityBase } from "../entity-base";
import { AccountBase } from "./account-base";
import { AppLocation } from "./app-location";

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
    timezone: string;
    accounts?: AccountBase[];
    location?: AppLocation;
}