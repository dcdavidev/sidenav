interface options {
    selector: string;
    triggerer: string;
    quitter: string;
    mask?: boolean;
    align: 'right' | 'left';
    top?: string;
    width?: string;
    gap?: string;
    opened?: boolean;
    easing?: string;
    zIndex?: number;
}
declare class VanillaSidebar {
    sidebar: HTMLElement;
    triggerer: HTMLElement;
    quitter: NodeListOf<Element>;
    mask: HTMLElement;
    hasMask: boolean;
    selector: string;
    quitterSelector: string;
    align: any;
    top: string;
    width: string;
    gap: number;
    opened: boolean;
    easing: string;
    zIndex: number;
    animationDuration: string;
    constructor(opt: options);
    setAttribute(): void;
    open(): void;
    close(): void;
    showMask(): void;
    hideMask(): void;
}
//# sourceMappingURL=vanilla-sidebar.d.ts.map