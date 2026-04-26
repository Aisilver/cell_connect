import { Routes } from '@angular/router';
import { HomeComponent } from './main-features/features/home/home.component';
import { loadHomeSlidesGuard } from './main-features/features/home/guards/load-home-slides-guard';
import { autoAuthGuard } from './feature-guards/auto-auth-guard';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [loadHomeSlidesGuard]
    },
    {
        path: "auth",
        loadChildren: () => import("./main-features/features/auth/auth-module").then(m => m.AuthModule)
    },
    {
        path: "hub",
        loadChildren: () => import("./main-features/features/hub/hub-module").then(m => m.HubModule),
        canActivate: [autoAuthGuard]
    }
];
