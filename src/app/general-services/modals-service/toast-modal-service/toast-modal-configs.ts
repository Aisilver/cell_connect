import { InjectionToken } from "@angular/core";
import { ToastEntryPosition } from "./types";

const fromBase: gsap.TweenVars = {
  scale: .1,
  opacity: 0
},

toBase: gsap.TweenVars = {
  scale: 1,
  opacity: 1,
}


export const TOAST_MODAL_ENTRANCE_ANIMATION_CONFIGS = new InjectionToken<Record<ToastEntryPosition, {from: gsap.TweenVars, to: gsap.TweenVars}>>("toast-modal-anim-entra-config", {
    providedIn: 'any',
    factory() {
        const padding = 20

        return {
          "bottom-right": {
            from: {
              ...fromBase,
              bottom: -1000,
              right: -1000,
            },
            to: {
              ...toBase,
              bottom: padding,
              right: padding,
            }
          },
          "bottom-left": {
            from: {
                ...fromBase,
                bottom: -1000,
                left: -1000
            },

            to: {
                ...toBase,
                bottom: padding,
                left: padding
            }
          },
          "bottom-center": {
            from: {
              ...fromBase,
              bottom: -1000,
              left: "50%",
              transform: "translateX(-50%)"
            },
            to: {
              ...toBase,
              bottom: padding,
              left: "50%",
              transform: "translateX(-50%)"
            }
          }
        } 
    },
})