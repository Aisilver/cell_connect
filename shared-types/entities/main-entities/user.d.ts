import { EntityBase } from "../entity-base";
import { AccountBase } from "./account-base";
import { AppLocation } from "./app-location";

export type UserGenderTypes = "male" | "female" | string;

export type UserMaritalStatuses = "married" | "single" | string;

export interface User extends EntityBase {
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    altPhoneNumber?: string;
    email: string;
    password: string;
    gender: UserGenderTypes;
    maritalStatus: UserMaritalStatuses;
    DOB: Date;
    timezone: string;
    accounts?: AccountBase[];
    location?: AppLocation;
}