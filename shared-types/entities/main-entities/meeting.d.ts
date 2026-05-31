import { EntityBase } from "../entity-base";
import { MeetingEditLog } from "./meeting-edit-log";
import { CellVenueLocation } from "./app-location";
import { Attendance } from "./attendance";
import { Cell } from "./cell";
import { MeetingAgenda } from "./meeting-agenda";
import { Review } from "./review";
import { UserAccount } from "./user-account";

export type MeetingStatusTypes = "booked" | "pending" | "in-session" | "concluded" | "canceled" | "not-hosted";

export interface Meeting extends EntityBase {
    title?: string;
    type: string;
    startTime: Date;
    endTime: Date;
    rating: number;
    status: MeetingStatusTypes;
    description?: string;
    actualStartTime?: Date;
    actualEndTime?: Date;
    attendants?: Attendance[];
    venue?: CellVenueLocation;
    booker?: UserAccount;
    agendas?: MeetingAgenda[];
    cell?: Cell;
    reviews?: Review [];
    editLogs?: MeetingEditLog[];
} 