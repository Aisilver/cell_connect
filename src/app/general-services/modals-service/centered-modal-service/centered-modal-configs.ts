import { InjectionToken } from "@angular/core";
import { CenteredModalEntryTypes } from "./types";

export const CENTERED_MODAL_ENTRY_CONFIGURATIION = new InjectionToken<Record<CenteredModalEntryTypes, {from: gsap.TweenVars, to: gsap.TweenVars}>>("centered-toast-entry-config", {
    providedIn: 'any',
    factory() {
        return {
            'center': {
                from:  {
                    position: 'absolute',
                    top: "1000%",
                    left: "50%",
                    y: "-50%",
                    x: "-50%",
                    scale: .1,
                    opacity: 0
                },
                to: {
                    top: "50%",
                    opacity: 1,
                    scale: 1
                }
            },

            "bottom": {
                from: {
                    position: "absolute",
                    bottom: "-1000%",
                    left: "50%",
                    translateX: "-50%"
                },
                to: {
                    bottom: "0%",
                }
            }
        }
    },
})