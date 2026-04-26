import { inject, Injectable } from '@angular/core';
import { NavigationConfig } from 'src/app/main-features/types/navigation-configuration.type';
import { HubRouterService } from './hub-router.service';
import { HUB_NAVIGATIONS } from '../configurations/hub-navigation.configs';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class HubNavigationConfigService {
  private hubRouteService = inject(HubRouterService)

  private Navs = inject(HUB_NAVIGATIONS)

  private router = inject(Router)

  private routeChangeSubs?: Subscription

  $OnNavigationConfigUpdate = new BehaviorSubject<NavigationConfig[]>([])

  Init() {
    this.routeChangeSubs = this.router.events
      .pipe(filter(ev => ev instanceof NavigationEnd))
      .subscribe(() => this.activateNavigationConfig()) 

    this.activateNavigationConfig()
  }

  RouteTo (route_config: NavigationConfig) {
    switch(route_config.route) {
      case 'meetings': this.hubRouteService.toHubMeeting()
        break
      default: this.hubRouteService.toHubHome()
    }
  }

  UpdateConfigs (navigationConfigs: NavigationConfig []) {
    this.$OnNavigationConfigUpdate.next(navigationConfigs)
  }

  private activateNavigationConfig() {
    this.Navs.forEach(config => config.active = false)

    const {url} = this.router,

    childParam = url.split("/")[2],

    indexOfNavConfig = this.Navs.findIndex(config => config.route == childParam)

    this.Navs[indexOfNavConfig == -1 ? 0 : indexOfNavConfig].active = true

    this.UpdateConfigs(this.Navs)
  }

  Destroy () {
    this.routeChangeSubs?.unsubscribe()
  }
}