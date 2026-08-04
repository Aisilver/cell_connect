import { InjectionToken } from "@angular/core";
import { Attendance, AttendancePuntualityTypes, AttendanceTypes } from "@shared/entities";
import { ModelProvider } from "src/app/classes/model-provider.class";
import { RandomFrom } from "src/app/functions/randoms.func";

export const ATTENDANCE_MODEL = new InjectionToken<ModelProvider<Attendance>>("attendance-model", {
    providedIn: "any",
    factory() {
        const model = new ModelProvider<Attendance>("attendance", {
            type: "online",
            puntuality: 'on-time',
            valid: false
        })

        model.setDummyModel({
            type: RandomFrom<AttendanceTypes>(['offline', 'online']),
            puntuality: RandomFrom<AttendancePuntualityTypes>(['late', "on-time"]),
            createdAt: new Date(),
            valid: RandomFrom([true, false])
        })

        return model
    },
})