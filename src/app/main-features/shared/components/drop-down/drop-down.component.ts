import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, inject, input, Input, NO_ERRORS_SCHEMA, OnChanges, OnDestroy, OnInit, Output, Renderer2, signal, SimpleChanges, ViewChild } from '@angular/core';
import { DropDownUnit } from './types';
import { CommonModule } from '@angular/common';
import { TextDeserailizerPipe } from '../../pipes/text-deserailizer-pipe';
import { UUIDGenerator } from 'src/app/functions/UUID-generator.func';
import { DropDownService } from '../../../../general-services/drop-down.service';
import { Subscription } from 'rxjs';
import { DOMService } from 'src/app/general-services/dom.service';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-drop-down',
  imports: [
    CommonModule,
    TextDeserailizerPipe,
    IconComponent
],
  template: `
    <ng-content></ng-content>

    <drop #dropElement [ngClass]="{open: Opened()}" [class]="Style ?? 'default'">

      <ul [ngStyle]="{maxHeight: (maxHeight ?? 200) + 'px'}">
        @for (item of Drops(); track item.id) {
          <li 
            class="unit" 
            [ngClass]="{blurred: item.blurred, isRed: item.isRed}"
            (click)="Select(item)">
              <app-icon *ngIf="item.icon" [name]="item.icon.name" [type]="item.icon.type"></app-icon>
              
              <p>{{item.text ?? item.key | textDeserailizer}}</p>
            </li>
        }@empty {
          <li class="unit">Empty</li>
        }
      </ul>
    </drop>
  `,
  styleUrl: './drop-down.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class DropDownComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  private DropUniqueKey = UUIDGenerator()

  private render = inject(Renderer2)

  private service = inject(DropDownService)

  private domService = inject(DOMService)

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
  Style?: 'white-background'

  @Output()
  private selectedDropKey: EventEmitter<string> = new EventEmitter()

  @Output()
  private selectedDropUnit: EventEmitter<DropDownUnit<any>> = new EventEmitter()

  @ContentChild('dropClickable', {read: ElementRef})
  private clickable?: ElementRef<HTMLElement>

  @ViewChild("dropElement", {static: true, read: ElementRef})
  private DropEleRef!: ElementRef<HTMLElement>

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
    this.service.DropGroupCloseEvent.next({dropkey: this.DropUniqueKey, groupName: this.GroupName})

    this.setDropDefaultTop()
    
    this.Opened.update(() => true)

    this.domService.alignFloatElementToFitInScreenViewOrWindowView(this.DropEleRef.nativeElement, undefined, 300)
  }

  private Close () {
    this.setDropDefaultTop()
    
    this.Opened.update(() => false)
  }

  private setDropDefaultTop () {
    this.render.setStyle(this.DropEleRef.nativeElement, "top", `110%`)
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
  }
}