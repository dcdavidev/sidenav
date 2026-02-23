import $ from 'jquery';

export interface SideNavOptions {
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

interface SideNavConfigs extends Required<
  Omit<SideNavOptions, 'toggler' | 'animation' | 'mask' | 'events'>
> {
  toggler: string;
  animation: Required<NonNullable<SideNavOptions['animation']>>;
  mask: Required<NonNullable<SideNavOptions['mask']>>;
  events: Required<NonNullable<SideNavOptions['events']>>;
}

declare global {
  interface JQuery {
    sidenav(options?: SideNavOptions): JQuery;
  }
}

$.fn.sidenav = function (options?: SideNavOptions) {
  const configs: SideNavConfigs = $.extend(
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
        duration: 500,
        easing: 'swing',
      },
      mask: {
        display: true,
        css: {
          backgroundColor: 'black',
          opacity: 0.5,
          filter: 'Alpha(opacity=50)',
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
    });

    // Define Mask
    const $mask = $('<div>').attr(baseAttr, 'mask');

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
        display: configs.open ? 'block' : 'none',
      },
      configs.mask.css
    );

    if (configs.mask.display) {
      $mask.appendTo('body').css(maskStyle);
    }

    /** Events triggered on sidebar opening. */
    const onSidebarOpenEvent = () => {
      if (configs.mask.display) {
        $mask.fadeIn(configs.animation.duration);
      }

      if (configs.freezePage) {
        $('body').css('overflow-y', 'hidden');
      }

      setSidebarAttrOpen(true);
      configs.events.always();
      configs.events.onOpen();
    };

    /** Events triggerd after sidebar opening action. */
    const afterSidebarOpenEvent = () => {
      configs.events.always();
      configs.events.afterOpen();
    };

    /** Events triggered on sidebar closing. */
    const onSidebarCloseEvent = () => {
      if (configs.mask.display) {
        $mask.fadeOut(configs.animation.duration);
      }

      if (configs.freezePage) {
        $('body').css('overflow-y', 'visible');
      }

      setSidebarAttrOpen(false);
      configs.events.always();
      configs.events.onClose();
    };

    /** Events triggerd after sidebar closing action. */
    const afterSidebarCloseEvent = () => {
      configs.events.always();
      configs.events.afterClose();
    };

    /** Triggers sidebar action open. */
    const openSidebar = () => {
      $sidebar.animate(
        { [configs.align]: 0 },
        configs.animation.duration,
        configs.animation.easing,
        afterSidebarOpenEvent
      );
      onSidebarOpenEvent();
    };

    /** Triggers sidebar action close. */
    const closeSidebar = () => {
      $sidebar.animate(
        { [configs.align]: -$sidebar.outerWidth()! },
        configs.animation.duration,
        configs.animation.easing,
        afterSidebarCloseEvent
      );
      onSidebarCloseEvent();
    };

    $(configs.toggler).on('click', () => {
      if (isSidebarOpen()) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    $mask.on('click', closeSidebar);

    $sidebar.on('click', configs.quitter, closeSidebar);

    $window.on('resize', () => {
      const windowWidth = $window.width() || 0;
      const newWidth = setSidebarWidth(windowWidth);

      $sidebar.css('width', newWidth);

      if (!isSidebarOpen()) {
        $sidebar.css(configs.align, -$sidebar.outerWidth()!);
      }
    });
  });
};
