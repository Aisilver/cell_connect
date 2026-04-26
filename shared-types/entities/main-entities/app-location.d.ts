import { EntityBase } from "../entity-base";

export interface AppLocation extends EntityBase {
    state: string;
    city: string;
    country: string;
    latitude?: number,
    longtitude?: number,
    addressInFull?: string,
    estateName?: string
}