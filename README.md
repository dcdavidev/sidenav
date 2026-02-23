# Sidenav Monorepo

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A modern collection of high-performance side navigation libraries for the web. This monorepo provides flexible solutions for implementing native-like mobile sidebars, whether you are using jQuery or prefer a zero-dependency vanilla JavaScript approach.

## 📦 Packages

| Package                           | Description                                                              | Documentation                                        |
| :-------------------------------- | :----------------------------------------------------------------------- | :--------------------------------------------------- |
| **@dcdavidev/jquery-sidenav**     | Robust jQuery plugin with animation easing and jQuery UI support.        | [Read More](./packages/jquery-sidenav/README.md)     |
| **@dcdavidev/jquery-sidenav-css** | Performance-optimized jQuery plugin leveraging CSS3 transitions.         | [Read More](./packages/jquery-sidenav-css/README.md) |
| **@dcdavidev/vanilla-sidenav**    | Zero-dependency, lightweight library written in pure vanilla JavaScript. | [Read More](./packages/vanilla-sidenav/README.md)    |

## 🚀 Tech Stack

This monorepo is engineered for speed, reliability, and maintainability:

- **Orchestration**: [Turborepo](https://turbo.build/repo) for lightning-fast incremental builds and task execution.
- **Package Management**: [pnpm](https://pnpm.io/) for disk-efficient, workspace-first dependency management.
- **Bundling**: [tsdown](https://github.com/rolldown/tsdown) for ultra-fast TypeScript compilation and multi-format (ESM/CJS) outputs.
- **Quality Control**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [CSpell](https://cspell.org/) integrated via [Lefthook](https://github.com/evilmartians/lefthook).

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v24.x recommended)
- [pnpm](https://pnpm.io/) (v10.x recommended)

### Getting Started

```shell
# Clone the repository
git clone git@github.com:dcdavidev/sidenav.git
cd sidenav

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Useful Commands

- `pnpm build`: Build all packages in the workspace.
- `pnpm lint`: Run ESLint across the entire project.
- `pnpm fmt`: Format the codebase using Prettier.
- `pnpm commit`: Invoke the Commitizen CLI for conventional commits.

## 📄 License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)
