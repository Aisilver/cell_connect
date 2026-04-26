import { EntityBase } from "../entity-base";
import { AppLocation } from "./app-location";
import { Attendance } from "./attendance";
import { Cell } from "./cell";
import { MeetingAgenda } from "./meeting-agenda";
import { Review } from "./review";
import { UserAccount } from "./user-account";

export type MeetingStatusTypes = "booked" | "pending" | "in-session" | "concluded" | "canceled";

export interface Meeting extends EntityBase {
    title?: string;
    type: string;
    startTime: Date;
    endTime: Date;
    rating: number;
    status: MeetingStatusTypes;
    description?: string;
    attendants?: Attendance[];
    venue?: AppLocation;
    host?: UserAccount;
    agendas?: MeetingAgenda[];
    cell?: Cell;
    reviews?: Review []
} 