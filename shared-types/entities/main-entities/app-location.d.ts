import { EntityBase } from "../entity-base";

export type ApplocationTypes = "cell-venue" | "user-location"

export interface AppLocation extends EntityBase {
    state: string;
    city: string;
    country: string;
    type?: ApplocationTypes;
}

export type UserLocation = AppLocation;

export interface CellVenueLocation extends AppLocation {
    default: boolean;
    landmark: string;
    addressInFull: string;
    latitude?: number;
    longtitude?: number;
    estateName?: string;
}