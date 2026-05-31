import { InjectionToken } from "@angular/core";
import { Cell } from "@shared/entities";
import { ModelProvider } from "src/app/classes/model-provider.class";

export const CELL_MODEL = new InjectionToken<ModelProvider<Cell>>("cell-model", {
    providedIn: "any",
    factory() {
        const model = new ModelProvider<Cell>("cell", {
            name: "",
            description: "",
            category: "",
            no_of_members: 0,
            rating: -1,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            default_venue: {
                addressInFull: "",
                landmark: "",
                city: "",
                default: true,
                country: 'nigeria',
                state: 'lagos'
            }
        })

        model.setDummyModel({
            name: "Jesus is lord cell",
            category: "",
            description: "",
            no_of_members: 20,
            rating: 2,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            default_venue: {
                addressInFull: "",
                landmark: "",
                city: "",
                default: true,
                country: 'nigeria',
                state: 'lagos'
            }
        })

        return model
    },
})