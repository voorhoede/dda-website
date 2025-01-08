# Dutch Digital Agencies (DDA) Website

**Base setup on top of headless services to help you quickly start a new website**

Codebase is based on [Head Start template](https://github.com/voorhoede/head-start).

## Documentation

All documentation is located in [`docs/`](docs/):

- [Accessibility (a11y)](docs/accessibility.md)
- [Blocks and Components](docs/blocks-and-components.md)
- [CMS Content Modelling](docs/cms-content-modelling.md)
- [CMS Data Loading](docs/cms-data-loading.md)
- [Project Structure](docs/project-structure.md)
- [Routing](docs/routing.md)
- [Search Engine Optimisation (SEO)](docs/seo.md)
- [Testing](docs/testing.md)

## Commands

All commands are run from the root of the project, from a terminal:

| Command (`npm run ...`) | Action
|:------------------------| :-----------------------------------------------
| `dev`                   | Starts local dev server at `localhost:4323` (head in T9)
| `build`                 | Build your production site to `./dist/`
| `preview`               | Preview your build locally, before deploying
| `astro ...`             | Run commands like `astro add` (see `astro -- --help`)
| `create`                | Scaffold new Block, Component, API or Page route
| `lint`                  | Check code style and valide HTML output
| `test`                  | Runs the test suite, individual tests are available using `test:...`
