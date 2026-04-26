import { LoaderConfigMap } from "./types";

export abstract class LoaderEntity {
    abstract options?: LoaderConfigMap[keyof LoaderConfigMap]
}