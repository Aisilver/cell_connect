import { InjectionToken } from "@angular/core";
import { ModelProvider } from "../../classes/model-provider.class";
import { UserAccount } from "@shared/entities";

export const ACCOUNT_MODEL = new InjectionToken<ModelProvider<UserAccount>>("account-model", {
    providedIn: 'any',
    factory() {
        const model = new ModelProvider<UserAccount>("account", { 
            name: "",
            username: "",
            online_status: "online",
            banned: false,
            suspended: false
        })

        model.setDummyModel({
            username: "silvergod",
            online_status: "online",
            banned: false,
            suspended: false
        })

        return model
    },
})