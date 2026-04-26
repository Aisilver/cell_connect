import { InjectionToken } from "@angular/core";
import { APP_REGEXS_CONFIG } from "./app-regexs.config.interface";

export const APP_REGEXS = new InjectionToken<APP_REGEXS_CONFIG>("app-regexs", {
    providedIn: "any",
    factory() {
        return {
            MUST_CONTAIN_A_NUMBER: /\d/,
            
            MUST_CONTAIN_A_SYMBOL: /[^A-Za-z0-9]/,
            
            MUST_CONTAIN_A_CAP_LETTER: /[A-Z]/,
            
            VALID_EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        
            MUST_CONTAIN_ONLY_LOWERCASE: /^[a-z0-9]+$/,

            MUST_CONTAIN_ONLY_NUMBERS: /^\d+$/
        }   
    }
})