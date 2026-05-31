import { Route } from "@angular/router";
import { HubComponent } from "./hub.component";
import { HubDashboardPageComponent } from "./routes/hub-dashboard-page/hub-dashboard-page.component";

export const HUB_ROUTES: Route[] = [
    {
        path: "",
        component: HubComponent,
        children: [
            {
                path: '',
                component: HubDashboardPageComponent
            },

            {
                path: 'meetings',
                loadChildren: () => import("./routes/hub-meetings-page/hub-meetings-page-module").then(m => m.HubMeetingsPageModule)
            }
        ]
    }
]