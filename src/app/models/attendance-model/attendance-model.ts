import { InjectionToken } from "@angular/core";
import { Attendance, AttendanceStatusTypes } from "@shared/entities";
import { ModelProvider } from "src/app/classes/model-provider.class";
import { RandomFrom } from "src/app/functions/randoms.func";

export const ATTENDANCE_MODEL = new InjectionToken<ModelProvider<Attendance>>("attendance-model", {
    providedIn: "any",
    factory() {
        const model = new ModelProvider<Attendance>("attendance", {
            isLeader: false,
            status: "present",
            valid: false
        })

        model.setDummyModel({
            isLeader: true,
            status: RandomFrom<AttendanceStatusTypes>(['late', 'present', "absent"]),
            arrivalTime: new Date(),
            valid: RandomFrom([true, false])
        })

        return model
    },
})