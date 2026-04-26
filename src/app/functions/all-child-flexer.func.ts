import gsap from "gsap";

export function AllChildDOMElementFlexer(parentElement: HTMLElement, tagNamesToIgnore: string[] = [], additionalStyles: gsap.TweenVars = {}){

    parentElement.style.display = 'flex'

    for (let i = 0; i < parentElement.children.length; i++) {
         const element = parentElement.children.item(i);
 
         try {
            if(!element) throw Error()
                
            const {tagName} = element as HTMLElement

            for (const element of  tagNamesToIgnore){
                if(element.toLowerCase() == tagName.toLowerCase()) throw Error()
            }

            (element as HTMLElement).style.flex = '1'

            gsap.set(element, additionalStyles)

         } catch {continue}
 
    }
} 