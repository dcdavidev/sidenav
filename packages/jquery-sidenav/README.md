# @dcdavidev/jquery-sidenav

A robust, flexible, and simple-to-use side navigation plugin for jQuery. Designed to mimic modern mobile application sidebars, it handles everything from basic animations to page freezing and background masks.

## Features

- 📱 **Mobile-Ready**: Smooth animations optimized for a native-like feel.
- ⚙️ **Highly Configurable**: Control width, alignment, animation easing, and more.
- 🧊 **Page Freezing**: Optionally prevent background scrolling when the menu is open.
- 🎭 **Auto-Masking**: Automatically generates a clickable background mask to close the menu.
- ⌨️ **TypeScript Powered**: Fully typed for a better developer experience.

## Installation

Install the package via your preferred package manager:

```shell
# pnpm
pnpm add @dcdavidev/jquery-sidenav

# npm
npm install @dcdavidev/jquery-sidenav

# yarn
yarn add @dcdavidev/jquery-sidenav
```

### Dependencies

This plugin requires **jQuery** (v4.0+) and **jQuery UI** (for animation easing).

```html
<script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.14.0/jquery-ui.min.js"></script>
```

## Quick Start

### 1. HTML Structure

Your sidebar needs a trigger (toggler) and the navigation container itself.

```html
<!-- The App Bar / Header -->
<header>
  <button id="toggle-sidenav">Menu</button>
</header>

<!-- The Sidenav -->
<nav id="sidenav">
  <div class="sidenav-wrapper">
    <button class="quit-sidenav">Close Menu</button>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
</nav>
```

### 2. Basic Initialization

Initialize the plugin by targeting your sidenav element:

```javascript
$(document).ready(function () {
  $('#sidenav').sidenav({
    toggler: '#toggle-sidenav',
    quitter: '.quit-sidenav',
  });
});
```

## Advanced Usage

### Handling Content Overflow

By default, the sidenav has a fixed height. If your menu is long, you should wrap your content in a container with scrolling enabled:

```css
#sidenav .sidenav-wrapper {
  height: 100%;
  overflow-y: auto;
}
```

### Using Event Callbacks

You can hook into the lifecycle of the sidenav to trigger custom logic:

```javascript
$('#sidenav').sidenav({
  toggler: '#toggle-sidenav',
  events: {
    onOpen: function () {
      console.log('Sidenav is starting to open!');
    },
    afterClose: function () {
      console.log('Sidenav is now fully closed.');
    },
    always: function () {
      // Triggered on every state change
      $('#toggle-sidenav').toggleClass('is-active');
    },
  },
});
```

## Options

| Option               | Type                | Default   | Description                                                                 |
| :------------------- | :------------------ | :-------- | :-------------------------------------------------------------------------- |
| `toggler`            | `string`            | `''`      | **Required**. Selector for the element that toggles the menu.               |
| `quitter`            | `string`            | `'a'`     | Selector for elements inside the menu that will close it when clicked.      |
| `align`              | `'left' \| 'right'` | `'left'`  | Which side the menu appears on.                                             |
| `width`              | `number`            | `300`     | Width of the menu in pixels.                                                |
| `gap`                | `number`            | `64`      | The minimum gap left between the menu and the screen edge on small devices. |
| `open`               | `boolean`           | `false`   | Whether the menu should be open on initialization.                          |
| `zIndex`             | `number`            | `3000`    | The z-index of the sidenav element.                                         |
| `freezePage`         | `boolean`           | `true`    | Set `body` overflow to `hidden` when the menu is open.                      |
| `animation.duration` | `number`            | `500`     | Animation speed in milliseconds.                                            |
| `animation.easing`   | `string`            | `'swing'` | jQuery UI easing function name.                                             |
| `mask.display`       | `boolean`           | `true`    | Whether to show the background overlay.                                     |
| `mask.css`           | `object`            | See below | Custom CSS for the mask element.                                            |

### Default Mask CSS

```javascript
{
  backgroundColor: 'black',
  opacity: 0.5,
  filter: 'Alpha(opacity=50)'
}
```

## License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)
