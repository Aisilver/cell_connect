import { EntityBase } from "../entity-base";

export type ListTypes = "cities" | "meeting-types"

export interface List extends EntityBase {
    type?: ListTypes;
    disabled: boolean,
    default: boolean,
    slug: string
}