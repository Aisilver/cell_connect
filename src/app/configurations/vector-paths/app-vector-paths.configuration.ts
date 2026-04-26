import { InjectionToken } from "@angular/core";
import { APP_VECTOR_PATHS_COFIG } from "./app-vector-path-config.interface";

function path (fileName: string) {
    return `/assets/vectors/${fileName}`
}

export const APP_VECTOR_PATHS = new InjectionToken<APP_VECTOR_PATHS_COFIG>("app-vector-config", {
    providedIn: "any",
    factory() {
        return {
            ALERT: path('undraw_alert_w756.svg'),
            
            SUCCESS_SIGN_UP: path("undraw_join_6quk.svg"),

            LOGIN_BANNER: path('undraw_welcome_nk8k.svg'),

            FORGOT_PASSWORD_BANNER: path("undraw_message-sent_785q.svg"),

            PASSORD_SET_BANNER: path("undraw_safe_0mei.svg"),

            HOUSE_LOCATION_BANNER: path("undraw_best-place_dhzp.svg"),

            HOUSE_SEARCH: path("undraw_house-searching_g2b8.svg"),

            NO_DATA: path("undraw_no-data_ig65.svg")
        }
    },
}) 