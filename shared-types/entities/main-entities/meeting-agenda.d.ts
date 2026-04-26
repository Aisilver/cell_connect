import { EntityBase } from "../entity-base";
import { Meeting } from "./meeting";

export type MeetingAgendaStatuses = "held" | "pending" | "holding"

export interface MeetingAgenda extends EntityBase {
    id?: number,
    topic: string,
    description?: string,
    startTime: Date,
    endTime: Date,
    status: MeetingAgendaStatuses,
    meeting?: Meeting
    default?: boolean
}