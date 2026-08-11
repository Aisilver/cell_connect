import { Meeting } from "../../entities/main-entities/meeting";

export type MeetgingHubRole = {
    id: "member" | "leader" | "assistant" | "administrator",
    meeting: Meeting;
}