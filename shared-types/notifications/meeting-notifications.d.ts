import { Meeting } from "../entities/main-entities/meeting";
import { SystemNotification } from "./system-notification";

export type MeetingNotification = SystemNotification<{
    "meeting-booked": Meeting;
    
    "meeting-cancelled": Meeting;
}>