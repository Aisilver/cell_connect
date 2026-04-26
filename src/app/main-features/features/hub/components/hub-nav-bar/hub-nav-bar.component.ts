import { Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { LogoComponent } from "src/app/main-features/shared/components/logo/logo.component";
import { HubSidebarToggleService } from '../../services/hub-sidebar-toggle.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/general-services/user-service';
import { CommonModule } from '@angular/common';
import { HubNavBarToggleService } from '../../services/hub-navbar-toggle.service';
import { UserPodComponent } from "src/app/main-features/shared/components/user-pod/user-pod.component";

@Component({
  selector: 'app-hub-nav-bar',
  imports: [
    CommonModule,
    IconComponent,
    LogoComponent,
    UserPodComponent
],
  template: `
    <main>
      <div class="icon">

        @if(SidebarisOpen()) {
          <app-icon name="arrow-left" (click)="ToggleSideBar()"></app-icon>
        }@else {
          <app-icon name="bars" (click)="ToggleSideBar()"></app-icon>
        }
        
        <app-logo Theme="dark"></app-logo>

      </div>

      <div class="user-view">
        <app-user-pod [Account]="Account"></app-user-pod>  

        <div>
          <b>{{User.firstName | titlecase}} {{User.lastName | titlecase}}</b>
          <p>@{{Account.username}}</p>
        </div>
      </div>
    </main>
  `,
  styleUrl: './hub-nav-bar.component.scss'
})
export class HubNavBarComponent implements OnInit, OnDestroy {
  private hubSidebarToggleService = inject(HubSidebarToggleService)

  private hubNavbarToggleService = inject(HubNavBarToggleService)

  private userService = inject(UserService)

  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private render = inject(Renderer2)

  private hubSidebarToggleSubs?: Subscription

  private hubNavbarToggleSubs?: Subscription

  SidebarisOpen = signal(false)

  get Account () {
    return this.userService.MyAccount
  }

  get User () {
    return this.userService.Me
  }

  ngOnInit(): void {
    this.hubNavbarToggleSubs = this.hubNavbarToggleService.NavbarToggleState.subscribe(state => { 
      this.render.removeClass(this.componentElement, "opened")
      
      this.render.removeClass(this.componentElement, "closed")

      this.render.addClass(this.componentElement, state)
    })

    this.hubSidebarToggleSubs = this.hubSidebarToggleService.SideBarToggleState.subscribe(state => {
      this.SidebarisOpen.update(() => state == "open" ? true : false)
    })
  }

  ToggleSideBar() {
    this.hubSidebarToggleService.SideBarToggleState.next(this.SidebarisOpen() ? "close" : "open")
  }

  ngOnDestroy(): void {
    this.hubSidebarToggleSubs?.unsubscribe()

    this.hubNavbarToggleSubs?.unsubscribe()
  }
}
