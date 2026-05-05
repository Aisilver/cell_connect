import { InjectionToken } from "@angular/core";
import { ModelProvider } from "../../classes/model-provider.class";
import { CellVenueLocation, UserLocation } from "@shared/entities";

export const CELL_VENUE_LOCATION_MODEL = new InjectionToken<ModelProvider<CellVenueLocation>>("cell-venue-location-model", {
    providedIn: 'any',
    factory() {
        const model = new ModelProvider<CellVenueLocation>("cell-venue-location", {
            addressInFull: "",
            landmark: "",
            country: "nigeria",
            state: 'lagos',
            city: ''
        })

        model.setDummyModel({
            country: "nigeria",
            state: 'lagos',
            city: "sangotedo",
            addressInFull: "39, sangotedo, miracle avenue, ajah, lagos",
            landmark: "safeway hospital"
        })

        return model
    },
}) 