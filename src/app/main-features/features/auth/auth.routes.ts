import { Routes } from "@angular/router";
import { LoginComponent } from "./routes/login/login.component";
import { SignUpComponent } from "./routes/sign-up/sign-up.component";
import { AuthComponent } from "./auth.component";
import { getAuthPageSlidesGuard } from "./guards/get-auth-page-slides-guard";
import { loginToHubGuard } from "./guards/login-to-hub-guard";

export const AUTH_ROUTES: Routes = [
    {
        path: "",
        component: AuthComponent,
        canActivate: [loginToHubGuard, getAuthPageSlidesGuard],
        children: [
            {
                path: '',
                component: LoginComponent,
            },

            {
                path: 'sign-up',
                component: SignUpComponent
            }
        ]
    }
];