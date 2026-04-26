import { EntityBase } from "../entity-base";

type SlideTypes = "auth-page-slide" | "home-page-slide"

export interface Slide extends EntityBase {
    id?: number
    type?: SlideTypes
    media_id?: number;
}

export interface AuthPageSlide extends Slide {
    title: string;
    message: string;
}

export interface HomePageSlide extends Slide {
    title: string;
    subtitle: string;
}