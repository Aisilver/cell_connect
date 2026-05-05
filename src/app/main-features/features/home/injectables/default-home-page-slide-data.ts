import { InjectionToken } from "@angular/core";
import { HomePageSlide } from "@shared/entities";

export const DEFAULT_HOME_PAGE_SLIDE = new InjectionToken<HomePageSlide>("default-home-slide", {
    providedIn: 'any',
    factory() {
        return {
            title: 'home cell holds here!!',
            subtitle: `This place serves as a warm and welcoming gathering point where our home cell holds here each week. 
                        It is a space of fellowship, growth, prayer, and meaningful conversations that strengthen our community and inspire spiritual connection.`,
            media_id: -1
        }
    }
}) 