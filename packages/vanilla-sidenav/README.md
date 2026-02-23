# @dcdavidev/vanilla-sidenav

**@dcdavidev/vanilla-sidenav** is a simple sidenav that aims to have zero dependencies. In fact, it is written in plain vanilla javascript!

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Install

**@dcdavidev/vanilla-sidenav** is available as a npm package

```shell
# pnpm
pnpm add @dcdavidev/vanilla-sidenav

# npm
npm install @dcdavidev/vanilla-sidenav

# yarn
yarn add @dcdavidev/vanilla-sidenav
```

## Usage

### 1. Prepare your template

You will need at least two HTML elements in your template:

- A trigger (toggler)
- The sidenav container

```html
<header>
  <button id="toggle-sidenav">Menu</button>
</header>

<nav id="sidenav">
  <div class="sidenav-wrapper">
    <button class="quit-sidenav">Close Menu</button>
    <!-- sidenav content -->
  </div>
</nav>
```

### 2. Include and configure `vanilla-sidenav`

```javascript
import { VanillaSidenav } from '@dcdavidev/vanilla-sidenav';

const sidenav = new VanillaSidenav({
  selector: '#sidenav',
  triggerer: '#toggle-sidenav',
  quitter: '.quit-sidenav',
});
```

## Options

```typescript
selector: string; // The sidenav selector (default: '#sidenav')
triggerer: string; // The element that will trigger the opening and closing event (ex: a menu button)
quitter: string; // Elements (preferably a class) inside the sidenav that once clicked will trigger the closing event
mask: boolean; // Whether to show the mask or not (default: true)
align: 'right' | 'left'; // The alignment of the sidenav (default: 'left')
top: string; // The top offset of the sidenav (default: '56px')
width: string; // The width of the sidenav (default: '300px')
gap: number; // The safe gap between the sidenav and the window when the sidenav is opened (default: 56)
opened: boolean; // Whether the sidenav is initialized opened or closed (default: false)
easing: string; // The animation easing (default: 'ease-in-out')
zIndex: number; // The z-index of the sidenav (default: 3000)
```

## License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)
