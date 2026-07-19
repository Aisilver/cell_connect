import { InjectionToken } from "@angular/core";
import { CellPermission } from "@shared/entities";
import { ModelProvider } from "src/app/classes/model-provider.class";

export const CELL_PERMISSION_MODEL = new InjectionToken<ModelProvider<CellPermission>>("cell-permission", {
    providedIn: "any",
    factory() {
        const model = new ModelProvider<CellPermission>("cell-permission", {
            cell_permissions: {
                canCheckIn: false,
                canPostAnnouncements: false,
                canViewAnalytics: false
            },
            
            meeting_hub_permissions: {
                members_permissions: {
                    attendance_permissions: {
                        canRecordAttendance: false
                    }
                },
                hub_permissions: {
                    canEditAgenda: false,
                    canEndMeeting: false,
                    canStartMeeting: false,
                    canViewAnalytics: false
                },
                broadcast_permissions: {},
            },
            meeting_permissions: {},
            member_permissions: {}
        })
        
        return model 
    },
})