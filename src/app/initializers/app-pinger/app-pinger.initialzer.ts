import { inject } from "@angular/core";
import { ServerRouteAPICallService } from "../../server/route-services/server-route/server-route-api-call.service";
import { PingView } from "./ping-view.class";
import { enviroment } from "../../../enviroments/enviroment";

export function appPinger () {    
    return async () => {
        const {production} = enviroment 
        
        if(production) return

        const serverApiCall = inject(ServerRouteAPICallService),

        pingView = new PingView(serverApiCall)


        let pong

        while(pong != "pong"){
            const res = await pingView.startPing()

            if(res) pong = res.data
        }

        pingView.end()
    } 
}