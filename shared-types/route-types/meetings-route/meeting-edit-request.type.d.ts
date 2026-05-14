import { Meeting } from "../../entities/main-entities/meeting"
import { MeetingEditLog } from "../../entities/main-entities/meeting-edit-log"

export type MeetingEditRequestData = {
    oldMeeting: Meeting,
    newMeeting: Meeting,
    editLog: MeetingEditLog
}