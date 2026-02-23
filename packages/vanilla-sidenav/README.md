# @dcdavidev/vanilla-sidenav

A lightweight, high-performance side navigation library written in **pure vanilla JavaScript**. With zero dependencies, it provides a smooth, native-like mobile sidebar experience while maintaining a tiny footprint.

## Features

- 🚀 **Zero Dependencies**: Pure JavaScript, no jQuery or other libraries required.
- ⚡ **High Performance**: Optimized animations using CSS3 transitions.
- 🧊 **Page Freezing**: Automatically prevents background scrolling when the menu is active.
- 🎭 **Smart Masking**: Generates a clickable background overlay to dim the page content.
- ⌨️ **TypeScript First**: Written in TypeScript with full type definitions included.

## Installation

```shell
# pnpm
pnpm add @dcdavidev/vanilla-sidenav

# npm
npm install @dcdavidev/vanilla-sidenav

# yarn
yarn add @dcdavidev/vanilla-sidenav
```

## Quick Start

### 1. HTML Structure

Your template requires a trigger element and the sidenav container.

```html
<!-- Trigger -->
<header>
  <button id="toggle-sidenav">Open Menu</button>
</header>

<!-- Sidenav -->
<nav id="sidenav">
  <div class="sidenav-wrapper">
    <button class="quit-sidenav">Close</button>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Products</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
</nav>
```

### 2. Basic Initialization

Import the class and initialize it with your selectors:

```javascript
import { Sidenav } from '@dcdavidev/vanilla-sidenav';

const sidenav = new Sidenav({
  selector: '#sidenav',
  triggerer: '#toggle-sidenav',
  quitter: '.quit-sidenav'
});
```

## Advanced Usage

### Handling Content Overflow

For long menus that require scrolling, add the following CSS to your wrapper element:

```css
#sidenav .sidenav-wrapper {
  height: 100%;
  overflow-y: auto;
}
```

### Manual Control

You can also control the sidenav programmatically:

```javascript
const sidenav = new Sidenav({ ... });

// Open the menu
sidenav.open();

// Close the menu
sidenav.close();
```

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selector` | `string` | `'#sidenav'` | The CSS selector for your sidenav container. |
| `triggerer` | `string` | **Required** | The CSS selector for the element that toggles the menu. |
| `quitter` | `string` | **Required** | Selector for elements inside the menu that close it when clicked. |
| `align` | `'left' \| 'right'` | `'left'` | Which side the sidenav should appear on. |
| `width` | `string` | `'300px'` | The width of the sidenav (with unit). |
| `gap` | `number` | `56` | Minimum distance from the screen edge on small screens (in pixels). |
| `top` | `string` | `'56px'` | The top offset of the sidenav. |
| `opened` | `boolean` | `false` | Whether the sidenav starts open. |
| `mask` | `boolean` | `true` | Enable/disable the background mask. |
| `easing` | `string` | `'ease-in-out'` | CSS transition timing function. |
| `zIndex` | `number` | `3000` | The z-index of the sidenav element. |

## License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)
