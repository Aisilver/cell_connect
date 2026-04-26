export type MeetingAttendantsRequestQuery = {
    exclude_user?: boolean;
    
    limit?: number;

    exclude_absent?: boolean;
    
    exclude_leader?: boolean
}