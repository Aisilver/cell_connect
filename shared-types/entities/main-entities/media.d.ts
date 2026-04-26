import { EntityBase } from "../entity-base";

export interface Media extends EntityBase {
    name: string;
    ext: string;
    type: string;
    byteSize?: number;
    mime: string;
}