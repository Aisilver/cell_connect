import { InjectionToken } from "@angular/core";
import { APP_CONSTANTS_CONFIG } from "./app-constants-config.interface";

export const APP_CONSTANTS = new InjectionToken<APP_CONSTANTS_CONFIG>("app-constants", {
    providedIn: "any",
    factory() {
        return {
            AFTER_LOGIN_URL_SESSION_KEY: "after-log-url-key"
        }
    },
})