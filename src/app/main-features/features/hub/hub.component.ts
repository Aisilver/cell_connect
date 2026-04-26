import { AfterContentChecked, AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllChildDOMElementFlexer } from 'src/app/functions/all-child-flexer.func';
import { HubSidebarToggleService } from './services/hub-sidebar-toggle.service';
import { HubNavigationConfigService } from './services/hub-navigation-config.service';
import { HubNavBarToggleService } from './services/hub-navbar-toggle.service';

@Component({
  selector: 'app-hub',
  standalone: false,
  template: `
    <main>
      <app-hub-side-bar class="side-bar" [ngClass]="{open: SidebarIsOpen()}"></app-hub-side-bar>

      <section #mainRouteBody (scroll)="OnScroll($event)">
        <app-hub-nav-bar class="nav-bar" [ngClass]="{scrolled: Scrolled()}"></app-hub-nav-bar>

        <router-outlet></router-outlet>
        
        <step-block></step-block>
      </section>

      <app-hub-bottom-bar class="bottom-bar"></app-hub-bottom-bar>
    </main>
  `,
  styleUrl: './hub.component.scss'
})
export class HubComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
  @ViewChild("mainRouteBody", {static: true})
  mainRouteBodyDomRef!: ElementRef<HTMLElement>

  private router = inject(Router)

  private hubSidebarToggleService = inject(HubSidebarToggleService)

  private hubNavConfigService = inject(HubNavigationConfigService)

  private hubNavbarToggleService = inject(HubNavBarToggleService)

  private routeChangeSubs?: Subscription

  private sideBarToggleSubs?: Subscription

  private hubNavCnnfigUpdateSubs?: Subscription

  SidebarIsOpen = signal(false)

  Scrolled = signal(false)

  ngOnInit(): void {
    this.sideBarToggleSubs = this.hubSidebarToggleService.SideBarToggleState.subscribe(state => {
      this.SidebarIsOpen.update(() => state == "open" ? true : false)
    })

    this.hubNavCnnfigUpdateSubs = this.hubNavConfigService.$OnNavigationConfigUpdate.subscribe(configs => {
      configs.forEach(config => {
        if(config.active)
          this.hubNavbarToggleService.NavbarToggleState.next(config.noNavBar ? "closed" : "opened")
      })
    })

    this.hubNavConfigService.Init()
  }

  ngAfterViewInit(): void {
    this.flexAllSubRouteChild()

    this.routeChangeSubs = this.router.events.subscribe(e => this.flexAllSubRouteChild())
  }

  ngAfterContentChecked(): void {
    this.flexAllSubRouteChild()
  }

  OnScroll(e: Event) {
    const element = e.target as HTMLElement

    this.Scrolled.update(() => element.scrollTop > 0)
  }

  private flexAllSubRouteChild () {
    AllChildDOMElementFlexer(this.mainRouteBodyDomRef.nativeElement, [
        "router-outlet",
        "step-block",
        "app-hub-nav-bar"
      ], {
      margin: "0px auto",
      width: "100%",
      maxWidth: "1500px"
    })
  } 

  ngOnDestroy(): void {
    this.routeChangeSubs?.unsubscribe()

    this.sideBarToggleSubs?.unsubscribe()

    this.hubNavCnnfigUpdateSubs?.unsubscribe()

    this.hubNavConfigService.Destroy()
  }
}