import { InjectionToken } from "@angular/core";
import { Attendance, AttendancePuntualityTypes } from "@shared/entities";
import { ModelProvider } from "src/app/classes/model-provider.class";
import { RandomFrom } from "src/app/functions/randoms.func";

export const ATTENDANCE_MODEL = new InjectionToken<ModelProvider<Attendance>>("attendance-model", {
    providedIn: "any",
    factory() {
        const model = new ModelProvider<Attendance>("attendance", {
            isLeader: false,
            puntuality: 'on-time',
            valid: false
        })

        model.setDummyModel({
            isLeader: true,
            puntuality: RandomFrom<AttendancePuntualityTypes>(['late', "on-time"]),
            createdAt: new Date(),
            valid: RandomFrom([true, false])
        })

        return model
    },
})