import { ModalEntity } from "../../classes/modal-entity.class";
import { ToastKeepAliveTimingTypes } from "../types";

export abstract class ToastModalEntity extends ModalEntity {
    private elementRef!: HTMLElement

    private keepAliveType!: ToastKeepAliveTimingTypes

    private timeout?: number

    private getTiming = () => this.keepAliveType == 'long' ? 5000 : 3000

    private stopDelayedDestroy = () => clearTimeout(this.timeout)

    
    private RunElementEventActions () {
        if(this.keepAliveType == 'self-time') return

        this.elementRef.onmouseenter = () => this.stopDelayedDestroy()

        this.elementRef.onmouseleave = () => this.StartDelayedDestroy()
    }
    
    Init(elementRef: HTMLElement, keepAliveType: ToastKeepAliveTimingTypes) {
        this.elementRef = elementRef

        this.keepAliveType = keepAliveType

        this.RunElementEventActions()
    }

    StartDelayedDestroy(){
        switch (this.keepAliveType){
            case "short":
            case "long": this.timeout = setTimeout(() => this.Destroy(), this.getTiming()); 
            break;
        }
    }
}