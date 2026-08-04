import { IconConfiguration } from "./icon-configuration.type"

export type NavigationConfig <RouteTypes = unknown> = {
    name?: string;
    route?: RouteTypes;
    icon?: IconConfiguration;
    active?: boolean;
    hidden?: boolean;
    notifications?: number
}