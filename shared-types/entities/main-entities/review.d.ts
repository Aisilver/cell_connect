import { EntityBase } from "../entity-base";
import { AccountBase } from "./account-base";
import { Meeting } from "./meeting";

export interface Review extends EntityBase {
    hospitalityRating?: number;
    leaderShipRating?: number;
    rating: number;
    body: string;
    account?: AccountBase;
    meeting?: Meeting
}