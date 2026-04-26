import { InjectionToken } from "@angular/core";
import { NavigationConfig } from "src/app/main-features/types/navigation-configuration.type";

export const HUB_NAVIGATIONS = new InjectionToken<NavigationConfig[]>("hub-navigations", {
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