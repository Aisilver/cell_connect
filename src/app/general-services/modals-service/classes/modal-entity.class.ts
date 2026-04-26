import { ModalGenerator } from "./modal-generator.class"

export abstract class ModalEntity {
    protected abstract modalgenerator: ModalGenerator

    /** A useful method for when modal as finished animating or is in view */
    OnModalInit?(): void | Promise<void>

    /**
     * This runs the process to close the modal, so every ModalEntity can close themselves
     * @param cb The optional callback to be ran
     */
    async Destroy(cb?: (param?: any) => void){        
        await this.modalgenerator.Close()

        if(cb) cb()
    }
}