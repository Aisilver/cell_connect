import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DoCheck, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { DOMService } from 'src/app/general-services/dom.service';
import { LogoComponent } from "src/app/main-features/shared/components/logo/logo.component";
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { NavigationConfig } from 'src/app/main-features/types/navigation-configuration.type';
import { Subscription } from 'rxjs';
import { HubNavigationConfigService } from '../../services/hub-navigation-config.service';

@Component({
  selector: 'app-hub-side-bar',
  imports: [
    CommonModule,
    LogoComponent,
    IconComponent
],
  template: `
    <main #main>
      <header>
        <app-logo Theme="dark"></app-logo>
      </header>

      <ul>
        @for (item of Navs(); track $index) {
          <li *ngIf="!item.hidden" [ngClass]="{active: item.active}" (click)="GoToRoute(item)">
            <app-icon [name]="item.icon?.name" [type]="item.icon?.type"></app-icon>
            <p>{{item.name | titlecase}}</p>
          </li>
        }
      </ul>
    </main>
  `,
  styleUrl: './hub-side-bar.component.scss'
})
export class HubSideBarComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private domService = inject(DOMService)

  private hubNavConfigService = inject(HubNavigationConfigService)

  private subs?: Subscription

  Navs = signal<NavigationConfig[]>([])

  @ViewChild("main", {static: true})
  mainDomRef!: ElementRef<HTMLElement>

  ngOnInit(): void {
    this.subs = this.hubNavConfigService.$OnNavigationConfigUpdate.subscribe(configs => {
      this.Navs.update(() => configs)
    })
  }

  ngDoCheck(): void {
    this.domService.matchTargetSize(this.componentElement, this.mainDomRef.nativeElement, {matchSize: true})
  }

  GoToRoute(route_config: NavigationConfig) {
    this.hubNavConfigService.RouteTo(route_config)
  }
  
  ngAfterViewInit(): void {
    this.domService.matchTargetSize(this.componentElement, this.mainDomRef.nativeElement, {
      observeWidth: true, 
      observeHeight: true,
      matchSize: true
    })
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }
}