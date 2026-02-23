# @dcdavidev/jquery-sidenav-css

This plugin is a version of `@dcdavidev/jquery-sidenav` that uses CSS3 animations instead of jQuery animations. This should be more performant, but it comes with some compatibility considerations: CSS3 transitions are not compatible with very old browsers. If you need to support those, check out the [`@dcdavidev/jquery-sidenav`](https://github.com/dcdavidev/sidebar/tree/main/packages/jquery-sidenav) plugin instead.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Install

**@dcdavidev/jquery-sidenav-css** is available as a npm package

```shell
# pnpm
pnpm add @dcdavidev/jquery-sidenav-css

# npm
npm install @dcdavidev/jquery-sidenav-css

# yarn
yarn add @dcdavidev/jquery-sidenav-css
```

## Usage

### 1. Include jQuery

In your HTML file, include the jQuery library (v4.0+ recommended).

```html
<html>
  <head>
    <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  </head>
  <body>
    <!-- body content -->
  </body>
</html>
```

### 2. Prepare your template

You will need at least two HTML elements:

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

Example CSS for the wrapper to handle overflow:

```css
#sidenav .sidenav-wrapper {
  overflow-y: auto;
  height: 100%;
}
```

### 3. Initialize the plugin

```javascript
$(document).ready(function () {
  $('#sidenav').sidenav({
    toggler: '#toggle-sidenav',
    quitter: '.quit-sidenav',
  });
});
```

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `toggler` | `string` | `''` | **Required**. Selector for the element that toggles the menu. |
| `quitter` | `string` | `'a'` | Selector for elements inside the menu that will close it when clicked. |
| `attr` | `string` | `'sidenav-main'` | Data attribute prefix. |
| `align` | `'left' \| 'right'` | `'left'` | Which side the menu appears on. |
| `width` | `number` | `300` | Width of the menu in pixels. |
| `gap` | `number` | `64` | The minimum gap left between the menu and the screen edge on small devices. |
| `open` | `boolean` | `false` | Whether the menu should be open on initialization. |
| `zIndex` | `number` | `3000` | The z-index of the sidenav element. |
| `freezePage` | `boolean` | `true` | Set `body` overflow to `hidden` when the menu is open. |
| `animation.duration` | `number` | `300` | Animation speed in milliseconds. |
| `animation.easing` | `string` | `'ease-out'` | CSS transition easing function. |
| `mask.display` | `boolean` | `true` | Whether to show the background overlay. |
| `mask.opacity` | `number` | `0.5` | Mask opacity. |
| `mask.css` | `object` | `{...}` | Custom CSS for the mask element. |

## Differences with `@dcdavidev/jquery-sidenav`

- No dependency on `jquery-ui`.
- Uses CSS3 transitions for smoother animations.
- `mask.opacity` is now a direct option instead of being inside `mask.css`.
- `animation.easing` must be a valid CSS transition-timing-function (e.g., `ease-in-out`, `cubic-bezier(...)`).

## License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)
