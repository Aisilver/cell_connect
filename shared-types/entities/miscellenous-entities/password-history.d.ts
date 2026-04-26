import { EntityBase } from "../entity-base";

export interface PasswordHistory extends EntityBase {
    userId: number;
    passwordHash: string 
}