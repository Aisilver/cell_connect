import { inject } from "@angular/core"
import { ServerRouteAPICallService } from "../../server/route-services/server-route/server-route-api-call.service"
import { AppMainService } from "../../general-services/app-main.service"
import { ServerResponseEncryptionService } from "src/app/server/services/server-response-encryption.service"
import { firstValueFrom } from "rxjs"

export function appEncryptionRegistery () {
    return async () => {
        const serverApiCall = inject(ServerRouteAPICallService),

        appMainService = inject(AppMainService),

        serverEncryptionService = inject(ServerResponseEncryptionService)

        await serverEncryptionService.generateEncryptionKeys()
        
        await firstValueFrom(serverApiCall.register_encryption({
            clientId: appMainService.ClientID,

            publicKey: serverEncryptionService.PUBLIC_B64_KEY}
        ))
    }
}