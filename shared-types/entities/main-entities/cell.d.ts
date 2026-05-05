import { EntityBase } from "../entity-base";
import { CellVenueLocation } from "./app-location";
import { Leader } from "./leader";
import { Meeting } from "./meeting";
import { Member } from "./member";

export type CellCategoryTypes = "all" | "male_only" | "female_only"

export interface Cell extends EntityBase {
    name: string,
    description: string,
    category: CellCategoryTypes | string,
    no_of_members: number,
    rating: number,
    default_venue: CellVenueLocation,
    leader?: Leader,
    members?: Member[],
    meetings?: Meeting[]
}