import { inject } from "@angular/core"
import { ObservableToPromise } from "src/app/functions/observeable-to-promise.func"
import { AppMainService } from "src/app/general-services/app-main.service"
import { ServerRouteAPICallService } from "src/app/server/route-services/server-route/server-route-api-call.service"

export function appSettingsInitializer () {
    return async () => {
        const appMainService = inject(AppMainService),
        
        appApiCall = inject(ServerRouteAPICallService),

        response = await ObservableToPromise(appApiCall.getAppSettings())

        appApiCall.responseChecker(
            response, 
        
            data => appMainService.setAppSettings(data),
        
            () => alert("Failed to get app settings")
        )
    }
}