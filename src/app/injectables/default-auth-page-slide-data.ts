import { InjectionToken } from "@angular/core";
import { AuthPageSlide } from "@shared/entities";

export const DEFAULT_AUTH_PAGE_SLIDES = new InjectionToken<AuthPageSlide[]>("default-auth-slide", {
    providedIn: 'any',
    factory() {
        return [
            {
                title: "Grow Together.",
                message: "Faith was never meant to be walked alone. Find your cell. Find your people."
            },
            {
                title: "Stronger in Fellowship.",
                message: "Pray together. Learn together. Build each other daily."
            },
            {
                title: "A Place to Belong.",
                message: "Join a Christ-centered community near you."
            }
        ]
    },
})