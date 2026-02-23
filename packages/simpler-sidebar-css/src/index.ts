import $ from 'jquery';

export interface SimplerSidebarCss3Options {
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

interface SimplerSidebarCss3Configs
  extends Required<
    Omit<
      SimplerSidebarCss3Options,
      'toggler' | 'animation' | 'mask' | 'events'
    >
  > {
  toggler: string;
  animation: Required<NonNullable<SimplerSidebarCss3Options['animation']>>;
  mask: Required<NonNullable<SimplerSidebarCss3Options['mask']>>;
  events: Required<NonNullable<SimplerSidebarCss3Options['events']>>;
}

declare global {
  interface JQuery {
    simplerSidebarCss3(options?: SimplerSidebarCss3Options): JQuery;
  }
}

$.fn.simplerSidebarCss3 = function (options?: SimplerSidebarCss3Options) {
  const configs: SimplerSidebarCss3Configs = $.extend(
    true,
    {
      quitter: 'a',
      toggler: '',
      attr: 'sidebar-main',
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
    const $sidebar = $(this);
    const $window = $(globalThis);
    const baseAttr = `data-${configs.attr}`;
    const sidebarAttrOpen = `${baseAttr}-open`;

    const setSidebarWidth = (windowWidth: number) => {
      return windowWidth < configs.width + configs.gap
        ? windowWidth - configs.gap
        : configs.width;
    };

    const isSidebarOpen = () => {
      const attr = $sidebar.attr(sidebarAttrOpen);
      return attr ? JSON.parse(attr) : false;
    };

    const setSidebarAttrOpen = (status: boolean) => {
      $sidebar.attr(sidebarAttrOpen, JSON.stringify(status));
    };

    const currentWidth = setSidebarWidth($window.width() || 0);

    // apply style and init attribute
    $sidebar.attr(sidebarAttrOpen, JSON.stringify(configs.open)).css({
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

    /** Events triggered on sidebar opening. */
    const onSidebarOpenEvent = () => {
      // Show mask
      if (configs.mask.display) {
        $mask.css(maskActive);
      }

      // freeze page
      if (configs.freezePage) {
        $('body').css('overflow-y', 'hidden');
      }

      setSidebarAttrOpen(true);

      // trigger user custom events
      configs.events.always();
      configs.events.onOpen();
    };

    /** Events triggerd after sidebar opening action. */
    const afterSidebarOpenEvent = () => {
      // trigger user custom events
      configs.events.always();
      configs.events.afterOpen();
    };

    /** Events triggered on sidebar closing. */
    const onSidebarCloseEvent = () => {
      // hide mask
      if (configs.mask.display) {
        $mask.css(maskInactive);
      }

      // unfreeze page
      if (configs.freezePage) {
        $('body').css('overflow-y', 'visible');
      }

      setSidebarAttrOpen(false);

      // trigger user custom events
      configs.events.always();
      configs.events.onClose();
    };

    /** Events triggerd after sidebar closing action. */
    const afterSidebarCloseEvent = () => {
      // trigger user custom events
      configs.events.always();
      configs.events.afterClose();
    };

    /** Triggers sidebar action open. */
    const openSidebar = () => {
      // trigger parallel events
      onSidebarOpenEvent();

      // animation
      $sidebar.css(configs.align, 0);

      // callbacks events
      setTimeout(afterSidebarOpenEvent, configs.animation.duration);
    };

    /** Triggers sidebar action close. */
    const closeSidebar = () => {
      // trigger parallel events
      onSidebarCloseEvent();

      // animation
      $sidebar.css(configs.align, -setSidebarWidth($window.width() || 0));

      // callbacks events
      setTimeout(afterSidebarCloseEvent, configs.animation.duration);
    };

    // trigger open or close action when the toggler is clicked
    $(configs.toggler).on('click', () => {
      if (isSidebarOpen()) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // trigger close action when $mask is clicked
    $mask.on('click', closeSidebar);

    // trigger close action when quitter elements
    // in sidebar are clicked
    $sidebar.on('click', configs.quitter, closeSidebar);

    // Updates on window resize
    $window.on('resize', () => {
      const windowWidth = $window.width() || 0;

      // update default sidebar width on window resize
      $sidebar.css('width', setSidebarWidth(windowWidth));

      // update sidebar width while open
      if (!isSidebarOpen()) {
        $sidebar.css(configs.align, -$sidebar.outerWidth()!);
      }
    });
  });
};
