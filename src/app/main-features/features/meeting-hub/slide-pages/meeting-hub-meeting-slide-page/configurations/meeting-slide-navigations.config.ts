import { InjectionToken } from "@angular/core";
import { MeetingHubMeetingSlideNavigationCOnfig } from "../types";

export const MEETING_HUB_MEETING_SLIDE_NAVIGATIONS_CONFIG = new InjectionToken<MeetingHubMeetingSlideNavigationCOnfig[]>("meet-hub-meet-slide-navs", {
    providedIn: "any",
    factory() {
        return [
            {
                route: "overview",
                visibilty_level: "general",
                icon: {
                    name: "gauge"
                },
            }, 
            {
                route: "members",
                visibilty_level: "adminstrative",
                icon: {
                    name: "users"
                }
            },
            {
                name: "attendances",
                route: "attendance",
                visibilty_level: "general",
                icon: {
                    name: "user-check"
                }
            },
            {
                name: "agendas",
                route: "agenda",
                visibilty_level: "general",
                icon: {
                    name: "list-check"
                }
            },
            {
                route: "prayers",
                visibilty_level: "general",
                icon: {
                    name: "hands-praying"
                }
            },
            {
                route: "resourcse",
                visibilty_level: "general",
                icon: {
                    name: "folder-open"
                }
            },
            { 
                route: "activity",
                visibilty_level: "adminstrative",
                icon: {
                    name: "clock-rotate-left"
                }
            },
            {
                route: "feedback",
                visibilty_level: "member-only",
                icon: {
                    name: "star"
                }
            }
        ]
    },
})