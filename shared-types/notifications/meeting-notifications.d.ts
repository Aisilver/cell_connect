import { Meeting, MeetingStatusTypes } from "../entities/main-entities/meeting";
import { MeetingEditLog } from "../entities/main-entities/meeting-edit-log";
import { SystemNotification } from "./system-notification";

export type MeetingNotification = SystemNotification<{
    "meeting-booked": Meeting,

    "meeitng-status-change": {
        new_status: MeetingStatusTypes,
        meeting: Meeting
    },

    "meeting-edit": {
        editlog: MeetingEditLog,
        new_meeting: Meeting
    }
}>