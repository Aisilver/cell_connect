import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { NavigationConfig } from 'src/app/main-features/types/navigation-configuration.type';
import { Subscription } from 'rxjs';
import { HubNavigationConfigService } from '../../services/hub-navigation-config.service';

@Component({
  selector: 'app-hub-bottom-bar',
  imports: [
    CommonModule,
    IconComponent
],
  template: `
    <ul>
      @for (item of Navs(); track $index) {
        <li *ngIf="!item.hidden" (click)="RouteTo(item)" [ngClass]="{active: item.active}">
          <app-icon [name]="item.icon?.name" [type]="item.icon?.type"></app-icon>
          <p>{{item.name | titlecase}}</p>
        </li>
      }
    </ul>
  `,
  styleUrl: './hub-bottom-bar.component.scss'
})
export class HubBottomBarComponent implements OnInit, OnDestroy {
  
  private hubNavConfigService = inject(HubNavigationConfigService)

  private subs?: Subscription

  Navs = signal<NavigationConfig[]>([])

  ngOnInit(): void {
    this.subs = this.hubNavConfigService.$OnNavigationConfigUpdate.subscribe(configs => {
      this.Navs.update(() => configs)
    })
  }

  RouteTo(config: NavigationConfig) {
    this.hubNavConfigService.RouteTo(config)
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }
}
