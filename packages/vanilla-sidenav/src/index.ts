export interface SidenavOptions {
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

/**
 * A simple vanilla javascript sidenav.
 */
export class Sidenav {
  sidenav: HTMLElement;
  triggerer: HTMLElement;
  quitter: NodeListOf<Element>;
  mask: HTMLElement;
  hasMask: boolean;
  selector: string;
  quitterSelector: string;
  align: 'right' | 'left';
  top: string;
  width: string;
  gap: number;
  opened: boolean;
  easing: string;
  zIndex: number;
  animationDuration: string;

  /**
   * Initialize the sidenav.
   * @param opt - The sidenav options.
   */
  constructor(opt: SidenavOptions) {
    this.selector = opt.selector === undefined ? '#sidenav' : opt.selector;
    this.quitterSelector =
      opt.quitter === undefined ? '.quit-sidenav' : opt.selector;
    this.align = opt.align === undefined ? 'left' : opt.align;
    this.top = opt.top === undefined ? '56px' : opt.top;
    this.width = opt.width === undefined ? '300px' : opt.width;
    this.gap = opt.gap === undefined ? 56 : Number.parseInt(opt.gap);
    this.opened = opt.opened === undefined ? false : opt.opened;
    this.easing = opt.easing === undefined ? 'ease-in-out' : opt.easing;
    this.zIndex = opt.zIndex === undefined ? 3000 : opt.zIndex;
    this.hasMask = opt.mask === undefined ? true : opt.mask;
    this.animationDuration = '500ms';

    // Select the elements
    this.sidenav = document.querySelector(this.selector)!;
    this.triggerer = document.querySelector(opt.triggerer)!;
    this.quitter = document.querySelectorAll(this.quitterSelector)!;

    // Add attributes
    this.sidenav.dataset.status = this.opened ? 'open' : 'closed';

    // Add z-index
    this.sidenav.style.zIndex = this.zIndex.toString();

    // Add transition
    this.sidenav.style.transition = `${this.align} ${this.animationDuration} ${this.easing}`;

    // Set sidenav position
    this.sidenav.style.position = 'fixed';
    this.sidenav.style.top = this.top;
    this.sidenav.style.bottom = '0';

    // Set sidenav width
    this.sidenav.style.width = '100%';
    this.sidenav.style.maxWidth = this.width;

    // Let the mask be displayed when the screen is narrower than the sidenav
    if (globalThis.innerWidth <= Number.parseInt(this.width) + this.gap) {
      this.sidenav.style.width = `${(
        globalThis.innerWidth - this.gap
      ).toString()}px`;
    }

    // set sidenav width to let the mask to be displayed when screen get narrower
    globalThis.addEventListener('resize', () => {
      const safeWidth = `${(globalThis.innerWidth - this.gap).toString()}px`;

      // Set sidenav width
      this.sidenav.style.width =
        globalThis.innerWidth <= Number.parseInt(this.width) + this.gap
          ? safeWidth
          : '100%';

      // Reset sidenav position
      if (this.sidenav.dataset.status == 'closed') {
        this.sidenav.style[this.align] =
          globalThis.innerWidth <= Number.parseInt(this.width) + this.gap
            ? `-${safeWidth}`
            : `-${Number.parseInt(this.width)}px`;
      }
    });

    // Set sidenav open or closed
    this.sidenav.style[this.align] = this.opened
      ? '0px'
      : `-${this.sidenav.offsetWidth}px`;

    // Trigger sidenav animation
    this.triggerer.addEventListener('click', () => {
      const status: string = this.sidenav.dataset.status!;

      if (status === 'closed') {
        this.open();
      } else {
        this.close();
      }
    });

    // Create Mask
    this.mask = document.createElement('div');
    this.mask.dataset.mask = this.opened ? 'open' : 'closed';
    this.mask.style.visibility = 'hidden';
    this.mask.style.background = 'rgba(0, 0, 0, 0.8)';
    this.mask.style.zIndex = (this.zIndex - 1).toString();
    this.mask.style.position = 'absolute';
    this.mask.style.top = this.top;
    this.mask.style.right = '0';
    this.mask.style.bottom = '0';
    this.mask.style.left = '0';
    this.mask.style.transition = `visibility 0s, opacity ${this.animationDuration} ${this.easing}`;
    this.mask.style.opacity = '0';

    if (this.hasMask) {
      document.body.append(this.mask);

      this.mask.addEventListener('click', () => this.close());
    }

    // Quit sidenav if quitter is clicked
    for (const el of this.quitter) {
      el.addEventListener('click', () => {
        this.close();
      });
    }
  }

  /**
   * Set the status attribute of the sidenav.
   */
  setAttribute() {
    const status: string = this.sidenav.dataset.status!;

    this.sidenav.dataset.status = status === 'closed' ? 'opened' : 'closed';
  }

  /**
   * Open the sidenav.
   */
  open() {
    this.sidenav.style[this.align] = '0px';
    this.setAttribute();
    this.showMask();
  }

  /**
   * Close the sidenav.
   */
  close() {
    this.sidenav.style[this.align] = `-${this.sidenav.offsetWidth}px`;
    this.setAttribute();
    this.hideMask();
  }

  /**
   * Show the mask.
   */
  showMask() {
    this.mask.style.opacity = '1';
    this.mask.style.visibility = 'visible';
  }

  /**
   * Hide the mask.
   */
  hideMask() {
    this.mask.style.opacity = '0';
    this.mask.style.visibility = 'hidden';
  }
}
