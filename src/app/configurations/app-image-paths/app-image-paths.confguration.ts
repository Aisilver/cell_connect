import { InjectionToken } from "@angular/core";
import { APP_IMAGE_PATHS_CONFIG } from "./app-image-paths-config.interface";

function path (fileName: string) {
    return `/assets/images/${fileName}`
}

export const APP_IMAGE_PATHS = new InjectionToken<APP_IMAGE_PATHS_CONFIG>("app-image-paths", {
    providedIn: 'any',
    factory() {
        return {
            LOGO: path('logo.png'),
            
            LOGO_WHITE: path('logo-white.png'),
            
            NO_IMAGE_MINI: path('no-image-mini.png'),
            
            DEFAULT_HOME: path("default-home-image.jpg"),

            DEFAULT_AUTH: path("default-auth-image.jpeg"),
            
            DEFAULT_uSER_PHOTO: path("no-user.png")            
        }
    }
})