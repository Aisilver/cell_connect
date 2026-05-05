import { InjectionToken } from "@angular/core";
import { ModelProvider } from "../../classes/model-provider.class";
import { UserLocation } from "@shared/entities";

export const USER_LOCATION_MODEL = new InjectionToken<ModelProvider<UserLocation>>("user-location-model", {
    providedIn: 'any',
    factory() {
        const model = new ModelProvider<UserLocation>("location", {
            country: "nigeria",
            state: 'lagos',
            city: ''
        })

        model.setDummyModel({
            country: "nigeria",
            state: 'lagos',
            city: "sangotedo"
        })

        return model
    },
}) 