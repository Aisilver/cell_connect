import { InjectionToken } from "@angular/core";
import { Meeting, MeetingStatusTypes } from "@shared/entities";
import { addMinutes } from "date-fns";
import { ModelProvider } from "src/app/classes/model-provider.class";
import { RandomFrom } from "src/app/functions/randoms.func";

export const MEETING_MODEL = new InjectionToken<ModelProvider<Meeting>>("meeting-model", {
    providedIn: "any",
    factory() {
        const model = new ModelProvider<Meeting>("meeting", {
            title: "",
            rating: -1,
            type: "",
            startTime: new Date(),
            endTime: new Date(),
            status: "booked"
        })

        model.setDummyModel({
            title: "Hello Jesus baby",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum obcaecati magni sunt, vel debitis natus architecto nemo odit? Neque ut quia repudiandae a asperiores doloribus dignissimos molestias numquam iusto facere?",
            rating: 0,
            type: "cell_meeting",
            startTime: addMinutes(new Date(), 30),
            endTime: addMinutes(new Date(), 60),
            status: RandomFrom<MeetingStatusTypes>(["booked", "in-session", "concluded"])
        })

        return model
    },
})