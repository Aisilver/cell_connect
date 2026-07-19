import { NavigationConfig } from "src/app/main-features/types/navigation-configuration.type"

export type MeetingHubMeetingSlideNavigationPageTypes = 
"overview" |
"members" |
"agenda" |
"resourcse" |
"prayers" |
"activity" |
"attendance" |
"feedback"

export type MeetingHubMeetingSlideNavigationCOnfig = {
    visibilty_level: "general" | "adminstrative" | "member-only"
} & NavigationConfig<MeetingHubMeetingSlideNavigationPageTypes>