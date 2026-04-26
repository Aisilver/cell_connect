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
}

export type UserSettings = {
    user_new_state_duration_in_days: number
} 