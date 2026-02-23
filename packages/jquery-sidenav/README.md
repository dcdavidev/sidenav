# @dcdavidev/jquery-sidenav

A simple side nav written in jQuery.

## Install

```shell
pnpm add @dcdavidev/jquery-sidenav
```

## Usage

Include jQuery and jQuery UI, then:

```javascript
$('#sidenav').sidenav({
  toggler: '#toggle-sidenav',
  quitter: '.quit-sidenav',
});
```

## Options

| Option               | Type                | Default          | Description                                       |
| -------------------- | ------------------- | ---------------- | ------------------------------------------------- |
| `quitter`            | `string`            | `'a'`            | Selector for elements that close the sidebar      |
| `toggler`            | `string`            | `''`             | Selector for the element that toggles the sidebar |
| `attr`               | `string`            | `'sidebar-main'` | Data attribute prefix                             |
| `open`               | `boolean`           | `false`          | Initial state                                     |
| `align`              | `'left' \| 'right'` | `'left'`         | Sidebar alignment                                 |
| `top`                | `number \| string`  | `0`              | Top offset                                        |
| `width`              | `number`            | `300`            | Sidebar width                                     |
| `gap`                | `number`            | `64`             | Gap when screen is narrow                         |
| `zIndex`             | `number`            | `3000`           | Z-index                                           |
| `freezePage`         | `boolean`           | `true`           | Disable body scroll when open                     |
| `animation.duration` | `number`            | `500`            | Animation duration in ms                          |
| `animation.easing`   | `string`            | `'swing'`        | Animation easing                                  |
| `mask.display`       | `boolean`           | `true`           | Show background mask                              |
| `mask.css`           | `object`            | `{...}`          | Mask CSS styles                                   |
