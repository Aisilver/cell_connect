import { CellPermission } from "../../entities/main-entities/cell-permission";

export type Meetging_WS_RoleIdTypes = "member" | "leader" | "assistant" | "administrator";

export type Meeting_WS_EntranceData = {
    id: Meetging_WS_RoleIdTypes,
    meetingId: number,
    permission?: CellPermission,
    leaderId?: number,
    memberId?: number
}