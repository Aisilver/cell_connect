import { EntityBase } from "../entity-base";

export interface Social extends EntityBase {
   
    user_id: number;
    type: string;
    link: string;
}