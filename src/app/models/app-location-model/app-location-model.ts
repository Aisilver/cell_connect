import { InjectionToken } from "@angular/core";
import { ModelProvider } from "../../classes/model-provider.class";
import { AppLocation } from "@shared/entities";

export const APP_LOCATION_MODEL = new InjectionToken<ModelProvider<AppLocation>>("location-model", {
    providedIn: 'any',
    factory() {
        const model = new ModelProvider<AppLocation>("location", {
            country: "nigeria",
            state: 'lagos',
            city: ''
        })

        model.setDummyModel({
            country: "nigeria",
            state: 'lagos',
            city: "sangotedo",
            addressInFull: "39, miracle avenue, sangotedo, ajah, lagos"
        })

        return model
    },
}) 