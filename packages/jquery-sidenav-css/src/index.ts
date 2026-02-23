import $ from 'jquery';

export interface SidenavOptions {
  quitter?: string;
  toggler?: string;
  attr?: string;
  open?: boolean;
  align?: 'right' | 'left';
  top?: number | string;
  width?: number;
  gap?: number;
  zIndex?: number;
  freezePage?: boolean;
  animation?: {
    duration?: number;
    easing?: string;
  };
  mask?: {
    display?: boolean;
    opacity?: number;
    css?: JQuery.PlainObject;
  };
  events?: {
    onOpen?: () => void;
    afterOpen?: () => void;
    onClose?: () => void;
    afterClose?: () => void;
    always?: () => void;
  };
}

interface SidenavConfigs extends Required<
  Omit<SidenavOptions, 'toggler' | 'animation' | 'mask' | 'events'>
> {
  toggler: string;
  animation: Required<NonNullable<SidenavOptions['animation']>>;
  mask: Required<NonNullable<SidenavOptions['mask']>>;
  events: Required<NonNullable<SidenavOptions['events']>>;
}

declare global {
  interface JQuery {
    sidenav(options?: SidenavOptions): JQuery;
  }
}

$.fn.sidenav = function (options?: SidenavOptions) {
  const configs: SidenavConfigs = $.extend(
    true,
    {
      quitter: 'a',
      toggler: '',
      attr: 'sidenav-main',
      open: false,
      align: 'left',
      top: 0,
      width: 300,
      gap: 64,
      zIndex: 3000,
      freezePage: true,
      animation: {
        duration: 300,
        easing: 'ease-out',
      },
      mask: {
        display: true,
        opacity: 0.5,
        css: {
          backgroundColor: 'black',
        },
      },
      events: {
        onOpen: () => {},
        afterOpen: () => {},
        onClose: () => {},
        afterClose: () => {},
        always: () => {},
      },
    },
    options
  );

  return this.each(function (this: HTMLElement) {
    const $sidenav = $(this);
    const $window = $(globalThis);
    const baseAttr = `data-${configs.attr}`;
    const sidenavAttrOpen = `${baseAttr}-open`;

    const setSidenavWidth = (windowWidth: number) => {
      return windowWidth < configs.width + configs.gap
        ? windowWidth - configs.gap
        : configs.width;
    };

    const isSidenavOpen = () => {
      const attr = $sidenav.attr(sidenavAttrOpen);
      return attr ? JSON.parse(attr) : false;
    };

    const setSidenavAttrOpen = (status: boolean) => {
      $sidenav.attr(sidenavAttrOpen, JSON.stringify(status));
    };

    const currentWidth = setSidenavWidth($window.width() || 0);

    // apply style and init attribute
    $sidenav.attr(sidenavAttrOpen, JSON.stringify(configs.open)).css({
      display: 'block',
      position: 'fixed',
      top: configs.top,
      bottom: 0,
      width: currentWidth,
      zIndex: configs.zIndex,
      [configs.align]: configs.open ? 0 : -currentWidth,
      transition: `${configs.align} ${configs.animation.duration / 1000}s ${
        configs.animation.easing
      }`,
    });

    // Define Mask
    const $mask = $('<div>').attr(baseAttr, 'mask');

    // mask animation definition
    const maskActive = {
      display: 'block',
      opacity: configs.mask.opacity,
      filter: `Alpha(opacity=${configs.mask.opacity * 100})`,
    };
    const maskInactive = {
      display: 'none',
      opacity: 0,
      filter: 'Alpha(opacity=0)',
    };

    const maskInitialStatus = configs.open ? maskActive : maskInactive;

    // define mask style
    const maskStyle = $.extend(
      true,
      {
        position: 'fixed',
        top: configs.top,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: configs.zIndex - 1,
        ...maskInitialStatus,
        transition: `opacity ${configs.animation.duration / 1000}s ${
          configs.animation.easing
        }`,
      },
      configs.mask.css
    );

    // if mask is enabled than it is created
    if (configs.mask.display) {
      $mask.appendTo('body').css(maskStyle);
    }

    /** Events triggered on sidenav opening. */
    const onSidenavOpenEvent = () => {
      // Show mask
      if (configs.mask.display) {
        $mask.css(maskActive);
      }

      // freeze page
      if (configs.freezePage) {
        $('body').css('overflow-y', 'hidden');
      }

      setSidenavAttrOpen(true);

      // trigger user custom events
      configs.events.always();
      configs.events.onOpen();
    };

    /** Events triggerd after sidenav opening action. */
    const afterSidenavOpenEvent = () => {
      // trigger user custom events
      configs.events.always();
      configs.events.afterOpen();
    };

    /** Events triggered on sidenav closing. */
    const onSidenavCloseEvent = () => {
      // hide mask
      if (configs.mask.display) {
        $mask.css(maskInactive);
      }

      // unfreeze page
      if (configs.freezePage) {
        $('body').css('overflow-y', 'visible');
      }

      setSidenavAttrOpen(false);

      // trigger user custom events
      configs.events.always();
      configs.events.onClose();
    };

    /** Events triggerd after sidenav closing action. */
    const afterSidenavCloseEvent = () => {
      // trigger user custom events
      configs.events.always();
      configs.events.afterClose();
    };

    /** Triggers sidenav action open. */
    const openSidenav = () => {
      // trigger parallel events
      onSidenavOpenEvent();

      // animation
      $sidenav.css(configs.align, 0);

      // callbacks events
      setTimeout(afterSidenavOpenEvent, configs.animation.duration);
    };

    /** Triggers sidenav action close. */
    const closeSidenav = () => {
      // trigger parallel events
      onSidenavCloseEvent();

      // animation
      $sidenav.css(configs.align, -setSidenavWidth($window.width() || 0));

      // callbacks events
      setTimeout(afterSidenavCloseEvent, configs.animation.duration);
    };

    $(configs.toggler).on('click', () => {
      if (isSidenavOpen()) {
        closeSidenav();
      } else {
        openSidenav();
      }
    });

    // trigger close action when $mask is clicked
    $mask.on('click', closeSidenav);

    // trigger close action when quitter elements
    // in sidenav are clicked
    $sidenav.on('click', configs.quitter, closeSidenav);

    // Updates on window resize
    $window.on('resize', () => {
      const windowWidth = $window.width() || 0;

      // update default sidenav width on window resize
      $sidenav.css('width', setSidenavWidth(windowWidth));

      // update sidenav width while open
      if (!isSidenavOpen()) {
        $sidenav.css(configs.align, -$sidenav.outerWidth()!);
      }
    });
  });
};
