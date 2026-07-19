import { CellPermission } from "../entities/main-entities/cell-permission"

export type MeetgingHubRole = {
    id: "member" | "leader" | "assistant" | "administrator",
    meetingId: number,
    accountId: number,
    memberId?: number,
    leaderId?: number,
    adminId?: number,
    permission: CellPermission
}