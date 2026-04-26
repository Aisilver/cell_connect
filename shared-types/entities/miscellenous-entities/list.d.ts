import { EntityBase } from "../entity-base";

export interface List extends EntityBase {
    disabled: boolean,
    default: boolean,
    slug: string
}