import { IconConfiguration } from "../../../../../types/icon-configuration.type";
import { DialogueTypes } from "../types";

export function DialogueIconConfigSetter(type: DialogueTypes){
    let config!: IconConfiguration

    switch(type){
        case "success": config = {name: 'check-double'}
            break;
        case "alert": config = {name: 'circle-exclamation'}
            break;
        default: config = {name: 'envelope'}
    }

    return config
}