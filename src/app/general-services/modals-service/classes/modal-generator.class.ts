import { ViewContainerRef } from "@angular/core"
import { gsap } from 'gsap'
import { CurrentModalSnapShot, QueuedModalConfigs } from "../types"

export abstract class ModalGenerator {
    /**
     * This is the Html DOM element of the modal that is to be created
     */
    protected modalWrapper!: HTMLElement

    /** 
     * This is the template component which is to be inside the 'modalWrapper'
    */
    protected modalTemplate!: ViewContainerRef

    /** Duration Of animation */
    protected AnimationDuration = .3

    /** 
     * This is to determine if the modalTemplate has a component already in view
    */
    protected get InUse () {
        return this.modalTemplate.length > 0
    }

    /** The base style for the modal element */
    protected abstract wrapperBaseStyleState: gsap.TweenVars

    /** The entrance animation function */
    protected abstract entranceAnimation (): Promise<void> | (() => Promise<void>);

    /** A location to store any needed data about the current created modal component for later use */
    protected abstract currentModalSnapshot: CurrentModalSnapShot<any, any>

    /** A location to store an array of stored modal creation data */
    protected abstract queuedModalSnapshots: QueuedModalConfigs[]

    /** Animation gsap scope */
    protected timeline = gsap.timeline({paused: true})

    /**
     * This is the method every inheritee will have to define itself,
     * to start the whole modal creation process
     * 
     * @param comp The Component
     * @param inputs The Inputs for the component
     * @param opt The modal otions for modal creation process
     */
    abstract Open(comp: any, inputs: any, opt?: any): void

    /**
     * As the name goes this is the method that stores the target "<ng-template>"
     * for component creation and the DOM container for use in the modal process
     * 
     * @param wrapper 
     * @param template 
     */
    Initialize (wrapper: HTMLElement, template: ViewContainerRef) {
        this.modalWrapper = wrapper

        this.modalTemplate = template

        gsap.set(this.modalWrapper, this.wrapperBaseStyleState)
    }

    /**
     * This is the method to end the whole modal creation process
     */
    async Close(): Promise<void> {
        await this.timeline.reverse()

        await this.timeline.clear()

        this.destroy_modal()

        const nextModal = this.queuedModalSnapshots.shift()

        if(nextModal){
            const {comp, inputs, options} = nextModal
        
            this.Open(comp, inputs, options)
        }
    }

    /**
     * Now this is where the modal creation happens, every other child class can define the "Open"
     * method as it fits, but must call this method to run creation.
     * 
     * @param comp The Component
     * @param inputs The Inputs for the component
     * @param opt The modal otions for modal creation process
     * @returns It returns a reference to the created component
     */
    protected create_modal<NewModalComponentClass>(comp: any, inputs: any){
        if(this.InUse) throw Error("There is already a modal in view")

        // Create Modal

        const newComp = this.modalTemplate.createComponent<NewModalComponentClass>(comp)

        //Set modal service input

        newComp.setInput("modal-service", this)

        // Sets passed inputs

        for (const key in inputs) {
            newComp.setInput(key, inputs[key])
        }

        return newComp
    } 

    /** This empties the template */
    protected destroy_modal () {
        this.modalTemplate.clear()
    }
}