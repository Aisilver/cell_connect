import { inject } from "@angular/core"
import { ServerRouteAPICallService } from "../../server/route-services/server-route/server-route-api-call.service"
import { AppMainService } from "../../general-services/app-main.service"
import { ObservableToPromise } from "../../functions/observeable-to-promise.func"
import { ServerResponseEncryptionService } from "src/app/server/services/server-response-encryption.service"

export function appEncryptionRegistery () {
    return async () => {
        const serverApiCall = inject(ServerRouteAPICallService),

        appMainService = inject(AppMainService),

        serverEncryptionService = inject(ServerResponseEncryptionService)

        await serverEncryptionService.generateEncryptionKeys()
        
        await ObservableToPromise(serverApiCall.register_encryption({
            clientId: appMainService.ClientID,

            publicKey: serverEncryptionService.PUBLIC_B64_KEY}
        ))
    }
}