import { InjectionToken } from "@angular/core";
import { NavigationConfig } from "src/app/main-features/types/navigation-configuration.type";
import { MeetingHubMeetingSlideNavigationPageTypes } from "../types";

export const MEETING_HUB_MEETING_SLIDE_NAVIGATIONS_CONFIG = new InjectionToken<NavigationConfig<MeetingHubMeetingSlideNavigationPageTypes>[]>("meet-hub-meet-slide-navs", {
    providedIn: "any",
    factory() {
        return [
            {
                route: "overview",
                icon: {
                    name: "gauge"
                },
            }, 
            {
                route: "members",
                icon: {
                    name: "users"
                }
            },
            {
                name: "attendances",
                route: "attendance",
                icon: {
                    name: "user-check"
                }
            },
            {
                name: "agendas",
                route: "agenda",
                icon: {
                    name: "list-check"
                }
            },
            {
                route: "prayers",
                icon: {
                    name: "hands-praying"
                }
            },
            {
                route: "resourcse",
                icon: {
                    name: "folder-open"
                }
            }
        ]
    },
})