import { Injectable } from '@angular/core';
import { DropDownStyleTypes, DropDownUnit } from '../types';
import { SlugTextDesralizer } from 'src/app/functions/slug-text-deseralizer.func';

type Options = {
  design?: DropDownStyleTypes,
  maxHeight?: number
}

@Injectable({
  providedIn: 'any'
})
export class DropDownHTMLService {
  private ParentDomMap = new Map<string, HTMLElement>()

  addParentDOMElement (uniqueKey: string, parentDom: HTMLElement) {
    this.ParentDomMap.set(uniqueKey, parentDom)
  }

  createAndAppendDropDomElement (uniqueKey: string, drops: DropDownUnit[], selectCB: (drop: DropDownUnit) => void, opt?: Options) {
    const dropElement = document.createElement(`dropdown-${uniqueKey}`),

    parentElement = this.ParentDomMap.get(uniqueKey)

    if(!parentElement) throw Error("drop parent element cannot be found")

    const {top, left, height} = parentElement.getBoundingClientRect(),

    padding = 10

    dropElement.className = `dropdown ${opt?.design ?? 'default'}`

    dropElement.style.maxHeight = `${opt?.maxHeight ?? 200}px`

    dropElement.style.left = `${left + padding}px`

    dropElement.style.top = `${top + height + padding}px`

    let listsHTMLStr = ""

    if(drops.length < 1) {
      listsHTMLStr += "<li class='unit'>Empty</li>"
    } else {
      
      for (const drop of drops) {
        const {id, blurred, isRed, icon, key, text} = drop

        listsHTMLStr += 
        
        `<li class="unit ${blurred ? 'blurred' : ''} ${isRed ? 'isRed' : ''}" id="${id}">

          <div style="display: ${icon ? 'grid' : 'none'};">

            <i class="fa-${icon?.type ?? 'solid'} fa-${icon?.name}"></i>
          
          </div>

          <p>${SlugTextDesralizer(text ?? key)}</p>

        </li>`
      }
    
    }

    dropElement.innerHTML = `
      <section>
        <div>
          <ul>${listsHTMLStr}</ul>
        </div>
      </section>`

    document.body.append(dropElement)

    dropElement.querySelectorAll("li").forEach(dom => {
      dom.addEventListener('click', () => {
        const {id} = dom

        const foundDrop = drops.find(dr => dr.id == id)

        if(foundDrop) selectCB(foundDrop)
      })
    })

    setTimeout(() => {dropElement.classList.add('open'); this.ScrollToFirstUnblurredTarget(dropElement)}, 100);

    return dropElement
  }

  private ScrollToFirstUnblurredTarget (dropElement: HTMLElement) {
    const allListElements = dropElement.querySelectorAll("li"),

    scrollElement = dropElement.querySelector("div")

    let unBlurredElement!: HTMLElement

    for (const [index, element] of allListElements.entries()) {
      if(!element.classList.contains('blurred')) {
        unBlurredElement = element
        break
      }
    }

    if(!unBlurredElement || !scrollElement) return

    const scrollEleRect = scrollElement.getBoundingClientRect(),
    
    unblurredRect = unBlurredElement.getBoundingClientRect(),

    scrollTop = unblurredRect.top - scrollEleRect.top + scrollElement.scrollTop

    scrollElement.scrollTo({
      top: scrollTop,
      behavior: "smooth"
    })
  }

  removeDropDomElement (dropDomId: string) {
    const dropDom = document.body.querySelector(`dropdown-${dropDomId}`)

    dropDom?.remove()
  }

  removeParentElementFromMap(uniqueKey: string) {
    this.ParentDomMap.delete(uniqueKey)
  }
}