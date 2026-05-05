import { InjectionToken } from "@angular/core";
import { MeetingPageSlide } from "@shared/entities";

export const MEETING_PAGE_DEFAULT_SLIDES = new InjectionToken<MeetingPageSlide[]>("meet-def-slide", {
    providedIn: "any",
    factory() {
        return [
            {
              title: "Plan Your Meeting",
              message: "Set a clear agenda, date, and time so members know what to expect and come prepared."
            },
            {
              title: "Engage Your Members",
              message: "Encourage participation with discussions, questions, and activities that involve everyone."
            },
            {
              title: "Follow Up After",
              message: "Share key points, action items, and reminders to keep everyone aligned after the meeting."
            }
        ]
    },
})