import { EntityBase } from "../entity-base";
import { Meeting } from "./meeting";
import { UserAccount } from "./user-account";

export interface MeetingEditLog extends EntityBase {
    title_changed?: boolean,
    description_changed?: boolean,
    date_time_changed?: boolean,
    venue_changed?: boolean,
    agenda_changed?: boolean,
    type_changed?: boolean,
    meeting?: Meeting,
    editor?: UserAccount
}