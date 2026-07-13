import { NavigationConfig } from "../../types/navigation-configuration.type";

export type HubNavigationPagesTypes = "home" | "meetings" | "profile"

export interface HubNavigationConfig extends NavigationConfig <HubNavigationPagesTypes> {
    noNavBar?: boolean
}