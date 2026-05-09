import { Routes } from '@angular/router';
import { HomeComponent } from './main-features/features/home/home.component';
import { loadHomeSlidesGuard } from './main-features/features/home/guards/load-home-slides-guard';
import { autoLoginGuard } from './feature-guards/auto-login-guard';
import { userIsInACellGuard } from './feature-guards/user-is-in-acell-guard';

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
        path: "meeting",
        loadChildren: () => import("./main-features/features/meeting/meeting-module").then(m => m.MeetingModule),
        canActivate: [autoLoginGuard, userIsInACellGuard]
    },
    {
        path: "hub",
        loadChildren: () => import("./main-features/features/hub/hub-module").then(m => m.HubModule),
        canActivate: [autoLoginGuard]
    }
];