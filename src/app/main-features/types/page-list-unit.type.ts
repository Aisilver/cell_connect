import { IconConfiguration } from "./icon-configuration.type"

export type PageListUnit<Key = unknown> = {
    name?: string;
    icon?: IconConfiguration;
    key: Key
}