import { ObservableToPromise } from "../../functions/observeable-to-promise.func"
import { ServerRouteAPICallService } from "../../server/route-services/server-route/server-route-api-call.service"

export class PingView {
    private main!: HTMLElement

    private serverApiCall!: ServerRouteAPICallService;

    private tries = 0
    
    constructor(serverApiCall: ServerRouteAPICallService) {
        this.serverApiCall = serverApiCall

        this.main = document.createElement("ping")
        
        document.body.append(this.main)
    }

    async startPing(){
        this.tries++

        let res = undefined,

        timeout = setTimeout(() => this.showPingLoad(), 2000)

        try {
            res = await ObservableToPromise(this.serverApiCall.pingServer())
        } catch {}

        clearTimeout(timeout)

        return res
    }

    private showPingLoad () {
        function dots (tries: number) {
            let res = ""

            for (let i = 0; i < tries; i++) {
                res += "."
            }

            return res
        }

        this.main.innerHTML = `
            <div class="ping-loader">
                
                <h4>Pinging Server${this.tries > 2 ? dots(3) : dots(this.tries)}</h4>
                
                <div>
                    <i class="fa-solid fa-spinner"></i>
                </div>
            </div>
        `
    }

    end() {
        this.main.remove()
    }
}