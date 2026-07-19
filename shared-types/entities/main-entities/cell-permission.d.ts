import { BasePermission } from "../../common/permission";
import { EntityBase } from "../entity-base";

export interface CellPermission extends EntityBase {
    cell_permissions: {
        canPostAnnouncements: boolean,
        canViewAnalytics: boolean,
        canCheckIn: boolean,
    },

    meeting_permissions: BasePermission,

    member_permissions: BasePermission,

    meeting_hub_permissions: {
        hub_permissions: {
            canStartMeeting: boolean,
            canEndMeeting: boolean,
            canViewAnalytics: boolean,
            canEditAgenda: boolean
        },

        broadcast_permissions: BasePermission,

        members_permissions: {
            attendance_permissions: {
                canRecordAttendance: boolean
            }
        } & BasePermission
    }
}