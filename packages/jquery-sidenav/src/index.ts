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

    /** Events triggered on sidenav opening. */
    const onSidenavOpenEvent = () => {
      if (configs.mask.display) {
        $mask.fadeIn(configs.animation.duration);
      }

      if (configs.freezePage) {
        $('body').css('overflow-y', 'hidden');
      }

      setSidenavAttrOpen(true);
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
      if (configs.mask.display) {
        $mask.fadeOut(configs.animation.duration);
      }

      if (configs.freezePage) {
        $('body').css('overflow-y', 'visible');
      }

      setSidenavAttrOpen(false);
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
      $sidenav.animate(
        { [configs.align]: 0 },
        configs.animation.duration,
        configs.animation.easing,
        afterSidenavOpenEvent
      );
      onSidenavOpenEvent();
    };

    /** Triggers sidenav action close. */
    const closeSidenav = () => {
      $sidenav.animate(
        { [configs.align]: -$sidenav.outerWidth()! },
        configs.animation.duration,
        configs.animation.easing,
        afterSidenavCloseEvent
      );
      onSidenavCloseEvent();
    };

    $(configs.toggler).on('click', () => {
      if (isSidenavOpen()) {
        closeSidenav();
      } else {
        openSidenav();
      }
    });

    $mask.on('click', closeSidenav);

    $sidenav.on('click', configs.quitter, closeSidenav);

    $window.on('resize', () => {
      const windowWidth = $window.width() || 0;
      const newWidth = setSidenavWidth(windowWidth);

      $sidenav.css('width', newWidth);

      if (!isSidenavOpen()) {
        $sidenav.css(configs.align, -$sidenav.outerWidth()!);
      }
    });
  });
};
