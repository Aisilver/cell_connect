import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, inject, Input, NO_ERRORS_SCHEMA, OnChanges, OnDestroy, OnInit, Output, Renderer2, signal, SimpleChanges, ViewChild } from '@angular/core';
import { DropDownStyleTypes, DropDownUnit } from './types';
import { CommonModule } from '@angular/common';
import { SlugTextDeserailizerPipe } from '../../pipes/slug-text-deserailizer-pipe';
import { UUIDGenerator } from 'src/app/functions/UUID-generator.func';
import { DropDownService } from './service/drop-down.service';
import { Subscription } from 'rxjs';
import { DOMService } from 'src/app/general-services/dom.service';
import { IconComponent } from "../icon/icon.component";
import { DropDownHTMLService } from './service/drop-html-down.service';

@Component({
  selector: 'app-drop-down',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  schemas: [NO_ERRORS_SCHEMA]
})
export class DropDownComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy {
  private DropUniqueKey = UUIDGenerator()

  private service = inject(DropDownService)

  private htmlService = inject(DropDownHTMLService)

  private domService = inject(DOMService)

  private compElement: HTMLElement = inject(ElementRef).nativeElement

  private subscription?: Subscription

  Drops = signal<(DropDownUnit | any)[]>([])

  Selected = signal<DropDownUnit | null>(null)

  Opened = signal(false)

  @Input()
  IntialSelectedKey?: string;

  @Input()
  InputedDrops?: DropDownUnit[]

  @Input()
  doNotEmitFirstDropOnInit?: boolean

  @Input()
  viewContainer?: HTMLElement

  @Input()
  maxHeight?: number

  @Input()
  GroupName?: string

  @Input()
  DropDesign?: DropDownStyleTypes

  @Output()
  private selectedDropKey: EventEmitter<string> = new EventEmitter()

  @Output()
  private selectedDropUnit: EventEmitter<DropDownUnit<any>> = new EventEmitter()

  @ContentChild('dropClickable', {read: ElementRef})
  private clickable?: ElementRef<HTMLElement>

  @HostListener("click", ['$event'])
  Click (event: MouseEvent) {
    if(this.clickable?.nativeElement) return

    this.OpenDropOnCLick(event)
  }

  ngOnInit(): void {
    document.addEventListener("click", () => this.Close())

    this.subscription = this.service.DropGroupCloseEvent.subscribe(data => {
      if(data.dropkey != this.DropUniqueKey && data.groupName == this.GroupName) {
        this.Close()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const drops = this.InputedDrops ?? [],
    
    firstDrop = drops.find(dr => dr.key == this.IntialSelectedKey) ?? drops.at(0)

    this.LoadDropUnits(drops)

    if(!this.doNotEmitFirstDropOnInit && firstDrop) this.Select(firstDrop)
  }

  ngAfterContentInit(): void {
    this.clickable?.nativeElement.addEventListener("click", e => this.OpenDropOnCLick(e))
  }

  ngAfterViewInit(): void {
    this.htmlService.addParentDOMElement(this.DropUniqueKey, this.compElement)
  }

  LoadDropUnits(drops: DropDownUnit[]) {
    this.Drops.update(() => drops.map(dr => this.transformDropUnit(dr)))
  }

  Select(drop: DropDownUnit) {
    this.Selected.update(() => drop)

    this.selectedDropKey.emit(String(this.Selected()?.key))

    this.selectedDropUnit.emit(this.Selected() ?? drop)
  }

  SelectKey(key = "") {
    const foundDrop = this.Drops().find(dr => key == dr.key)
    
    if(foundDrop) this.Select(foundDrop)
  }

  Open () {
    const dropDomEle = this.htmlService.createAndAppendDropDomElement(this.DropUniqueKey, this.Drops(), (drop) => this.Select(drop), 
      {
        design: this.DropDesign, 
        maxHeight: this.maxHeight
      }
    )

    this.service.DropGroupCloseEvent.next({dropkey: this.DropUniqueKey, groupName: this.GroupName})
    
    this.Opened.update(() => true)

    this.domService.alignFloatElementToFitInScreenViewOrWindowView(dropDomEle)
  }

  private Close () {    
    this.Opened.update(() => false)

    this.htmlService.removeDropDomElement(this.DropUniqueKey)
  }


  private OpenDropOnCLick (e: Event) {
    e.stopPropagation()

    if(this.Opened()) this.Close()
    
    else this.Open()
  }

  private transformDropUnit (unit: DropDownUnit) {
    return {
      ...unit,
      id: UUIDGenerator()
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()

    this.htmlService.removeParentElementFromMap(this.DropUniqueKey)
  }
}