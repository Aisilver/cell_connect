import { IconConfiguration } from "./icon-configuration.type"

export type HubBasicHeaderClickable<Key = unknown> = {
    icon?: IconConfiguration;
    name?: string;
    key: Key
}