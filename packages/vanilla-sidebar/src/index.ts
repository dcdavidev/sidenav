export interface VanillaSidebarOptions {
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
 * A simple vanilla javascript sidebar.
 */
export class VanillaSidebar {
  sidebar: HTMLElement;
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
   * Initialize the sidebar.
   * @param opt - The sidebar options.
   */
  constructor(opt: VanillaSidebarOptions) {
    this.selector = opt.selector === undefined ? '#sidebar' : opt.selector;
    this.quitterSelector =
      opt.quitter === undefined ? '.quit-sidebar' : opt.selector;
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
    this.sidebar = document.querySelector(this.selector)!;
    this.triggerer = document.querySelector(opt.triggerer)!;
    this.quitter = document.querySelectorAll(this.quitterSelector)!;

    // Add attributes
    this.sidebar.dataset.status = this.opened ? 'open' : 'closed';

    // Add z-index
    this.sidebar.style.zIndex = this.zIndex.toString();

    // Add transition
    this.sidebar.style.transition = `${this.align} ${this.animationDuration} ${this.easing}`;

    // Set sidebar position
    this.sidebar.style.position = 'fixed';
    this.sidebar.style.top = this.top;
    this.sidebar.style.bottom = '0';

    // Set sidebar width
    this.sidebar.style.width = '100%';
    this.sidebar.style.maxWidth = this.width;

    // Let the mask be displayed when the screen is narrower than the sidebar
    if (globalThis.innerWidth <= Number.parseInt(this.width) + this.gap) {
      this.sidebar.style.width = `${(
        globalThis.innerWidth - this.gap
      ).toString()}px`;
    }

    // set sidebar width to let the mask to be displayed when screen get narrower
    globalThis.addEventListener('resize', () => {
      const safeWidth = `${(globalThis.innerWidth - this.gap).toString()}px`;

      // Set sidebar width
      this.sidebar.style.width =
        globalThis.innerWidth <= Number.parseInt(this.width) + this.gap
          ? safeWidth
          : '100%';

      // Reset sidebar position
      if (this.sidebar.dataset.status == 'closed') {
        this.sidebar.style[this.align] =
          globalThis.innerWidth <= Number.parseInt(this.width) + this.gap
            ? `-${safeWidth}`
            : `-${Number.parseInt(this.width)}px`;
      }
    });

    // Set sidebar open or closed
    this.sidebar.style[this.align] = this.opened
      ? '0px'
      : `-${this.sidebar.offsetWidth}px`;

    // Trigger sidebar animation
    this.triggerer.addEventListener('click', () => {
      const status: string = this.sidebar.dataset.status!;

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

    // Quit sidebar if quitter is clicked
    for (const el of this.quitter) {
      el.addEventListener('click', () => {
        this.close();
      });
    }
  }

  /**
   * Set the status attribute of the sidebar.
   */
  setAttribute() {
    const status: string = this.sidebar.dataset.status!;

    this.sidebar.dataset.status = status === 'closed' ? 'opened' : 'closed';
  }

  /**
   * Open the sidebar.
   */
  open() {
    this.sidebar.style[this.align] = '0px';
    this.setAttribute();
    this.showMask();
  }

  /**
   * Close the sidebar.
   */
  close() {
    this.sidebar.style[this.align] = `-${this.sidebar.offsetWidth}px`;
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
