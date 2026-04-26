import { Meeting } from "../../entities";

export type MeetingCreationRequestData = {
    meeting: Meeting;
    cellId: number;
}