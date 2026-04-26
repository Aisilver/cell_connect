import { EntityBase } from "../entity-base";
import { Leader } from "./leader";
import { Meeting } from "./meeting";
import { Member } from "./member";

export type CellCategoryTypes = "all-people" | "male-only" | "female-only"

export interface Cell extends EntityBase {
    name: string,
    description: string,
    category: CellCategoryTypes | string,
    no_of_members: number,
    rating: number,
    address?: AppLocation,
    leader?: Leader,
    members?: Member[],
    meetings?: Meeting[]
}