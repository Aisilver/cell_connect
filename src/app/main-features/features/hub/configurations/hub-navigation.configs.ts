import { InjectionToken } from "@angular/core";
import { HubNavigationConfig } from "../types";

export const HUB_NAVIGATIONS = new InjectionToken<HubNavigationConfig[]>("hub-navigations", {
    providedIn: "any",
    factory() {
        return [
            {
                name: "home",
                icon: {
                    name: "house"
                }
            },
            {
                name: "meetings",
                route: "meetings",
                icon: {
                    name: "calendar"
                }
            },

            {
                route: "profile",
                hidden: true,
                noNavBar: true
            }
        ]
    },
})