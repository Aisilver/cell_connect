import { IconConfiguration } from "./icon-configuration.type"

export type NavigationConfigRouteParamTypes = "home" | "meetings" | "profile"

export type NavigationConfig = {
    name?: string;
    route?: NavigationConfigRouteParamTypes;
    icon?: IconConfiguration;
    active?: boolean;
    hidden?: boolean;
    noNavBar?: boolean
}