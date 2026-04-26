import gsap from "gsap"

export abstract class AsyncValidatorBase {
    protected abstract componentElement: HTMLElement

    private loaderElement!: HTMLElement

    protected blurInput() {
        gsap.set(this.componentElement, {
            opacity: .5,
            pointerEvents: "none"
        })

        this.appendLoaderElement()
    }

    protected unBlurInput() {
        gsap.set(this.componentElement, {
            opacity: 1,
            pointerEvents: "all"
        })

        this.loaderElement.remove()
    }

    private appendLoaderElement () {
        this.loaderElement = document.createElement("loader")

        const timeline = gsap.timeline({paused: true, repeat: -1}),
        
        {parentElement} = this.componentElement,

        line = document.createElement("line")

        if(!parentElement) return

        gsap.set(parentElement, {position: "relative"})

        gsap.set(this.loaderElement, {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            bottom: "-15px",
            left: "0px",
            width: "100%",
            height: "3px",
            overflow: "hidden",
            opacity: .5
        })
 
        gsap.set(line, {
            width: "80%",
            height: "100%",
            background: "white",
            borderRadius: "3px"
        })

        this.loaderElement.append(line)

        parentElement.append(this.loaderElement)

        timeline.to(line, {x: -100}).to(line, {x: 100})

        timeline.play()
    }
}