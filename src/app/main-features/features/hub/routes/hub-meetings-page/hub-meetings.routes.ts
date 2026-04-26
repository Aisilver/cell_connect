import { Route } from "@angular/router";
import { HubMeetingsPageComponent } from "./hub-meetings-page.component";
import { HubMeetingsMainComponent } from "./routes/hub-meetings-main/hub-meetings-main.component";
import { HubMeetinsNewMeetingComponent } from "./routes/hub-meetings-new-meeting/hub-meetings-new-meeting.component";

export const HUB_MEETINGS_ROUTES: Route[]= [
    {
        path: "",
        component: HubMeetingsPageComponent,
        children: [
            {
                path: '',
                component: HubMeetingsMainComponent
            },
            {
                path: 'new-meeting', 
                component: HubMeetinsNewMeetingComponent
            }
        ]
    }
]