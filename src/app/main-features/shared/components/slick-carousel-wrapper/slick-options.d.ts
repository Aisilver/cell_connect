declare module 'ngx-slick-options' {
    interface JQuerySlickOptions {
        slidesToShow?: number // Number of slides to display in one view (default: 1)
        slidesToScroll?: number // Number of slides to scroll on each action (default: 1).
        infinite?: boolean // Enables infinite looping of slides (default: true).
        speed?: number // Animation speed in milliseconds (default: 300).
        autoplay?: boolean // Enables automatic scrolling (default: false).
        autoplaySpeed?: number //Delay between each auto-scroll (in milliseconds, default: 3000).
        dots?: boolean // Shows navigation dots (default: false).
        arrows?: boolean // Shows next/prev arrows (default: true).
        pauseOnHover?: boolean // Pauses autoplay when a user hovers over the carousel (default: true).
        pauseOnFocus?: boolean // Pauses autoplay when a user focuses on the carousel (default: true).
        pauseOnDotsHover?: boolean // Pauses autoplay when hovering over navigation dots (default: false).
        centerMode?: boolean // Enables center mode, making the current slide centered (default: false).
        centerPadding?: string // Padding on the sides of the centered slide (default: '50px').
        variableWidth?: boolean // Enables variable width for slides (default: false).
        adaptiveHeight?: boolean // Adjusts the height of the carousel based on the current slide (default: false).
        fade?: boolean // Enables fade transition between slides (default: false).
        focusOnSelect?: boolean // Focuses the clicked slide (default: false).
        rtl?: boolean // Enables right-to-left (RTL) mode (default: false).
        draggable?: boolean // Enables dragging with a mouse (default: true).
        swipe?: boolean // Enables swiping with touch (default: true).
        swipeToSlide?: boolean // Enables swiping to go directly to a slide (default: false).
        touchMove?: boolean // Enables touch movement (default: true).
        waitForAnimate?: boolean // Waits for the animation to finish before another action (default: true).
        useCSS?: boolean // Enables CSS transitions (default: true).
        useTransform?: boolean // Enables transform-based transitions (default: true).
        initialSlide?: number // Index of the first slide to show (default: 0).
        lazyLoad?: boolean // Enables lazy loading of images. Options: 'ondemand' or 'progressive'.
        edgeFriction?: number // Resistance when swiping on the first or last slide (default: 0.15).
        rows?: number // Number of rows for the slides (default: 1).
        slidesPerRow?: number // Number of slides to show per row when rows are greater than 1 (default: 1).
        zIndex?: number // Sets the z-index value of the slides (default: 1000).
        appendArrows?: HTMLElement | null // Element where the arrows should be appended (default: null).
        appendDots?: HTMLElement | null // Element where the dots should be appended (default: null).
        customPaging?: () => void  // Custom function for creating pagination dots.
        asNavFor?: unknown // Provides navigation for another carousel.
        prevArrow?: HTMLElement | null //and nextArrow: Custom HTML for the previous and next arrows.
        accessibility?: boolean // Enables keyboard navigation (default: true).
        slide?: string // Specifies which slide to use as the container element (default: '').
        easing?: string // Type of easing to use (default: 'linear').
        cssEase?: string // CSS easing for transitions (default: 'ease').
        padding?: number
    }
}