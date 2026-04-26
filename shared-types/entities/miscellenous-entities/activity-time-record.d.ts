import { EntityBase } from "../entity-base";

export interface ActivityTimeRecord extends EntityBase {
    accountId: number,
    entryTime: Date,
    timeDifference: number,
    exitTime: Date
}