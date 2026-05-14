import { InjectionToken } from "@angular/core";
import { User } from "@shared/entities";
import { ModelProvider } from "../../classes/model-provider.class";

export const USER_MODEL = new InjectionToken<ModelProvider<User>>("user-model", {
    providedIn: 'any',
    factory() {
        const model = new ModelProvider<User>("user", {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            phoneNumber: '',
            maritalStatus: '',
            password: '',
            DOB: new Date(1999, 0, 1),
            timezone: "" //TODO: Add TimeZone
        })

        model.setDummyModel({
            firstName: "emmanuel",
            lastName: "lasisi",
            email: "emmanuelbowofoluwa@gmail.com",
            gender: "male",
            maritalStatus: "single",
            phoneNumber: "9066057393",
            password: "Dustbin40?",
            DOB: new Date(),
            timezone: "", //TODO: Add TimeZone
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return model
    }
})