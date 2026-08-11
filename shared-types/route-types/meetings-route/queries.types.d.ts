export type GetUpcomingMeetingRouteQuery = {
    inc_cell?: boolean,
    inc_venue?: boolean,
    inc_agendas?: boolean,
    inc_editlogs?: boolean;
    inc_attendees?: boolean;
}

export type GetMeetingAttendantsRouteQuery = {
    exclude_user?: boolean;
    limit?: number;
    exclude_leader?: boolean;
}