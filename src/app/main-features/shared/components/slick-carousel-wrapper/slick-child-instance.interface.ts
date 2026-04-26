export interface SlickChildInstance {
    isLast: boolean;
    isFirst: boolean;
    isVisble: boolean;
    beforeVisible?: () => void;
    onVisible?: () => void;
    onNotVisible?: () => void;
}