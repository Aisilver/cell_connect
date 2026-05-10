export interface AppSettings {
    meeting_settings: MeetingSettings;

    user_settings: UserSettings;
}

export type MeetingSettings = {
    min_meeting_start_time: {
        hour: number,
        minute: number
    };
    max_meeting_start_time: {
        hour: number,
        minute: number
    };
    max_meeting_duration: string;
    min_meeting_duration: string;
    max_meeting_edit_chances: number;
    max_meeting_editable_deadline_hours: number;
}

export type UserSettings = {
    user_new_state_duration_in_days: number
} 