# Portfolio

The personal site of Esad Abdullah Kösedağ. Plain HTML/CSS/JS, no framework and no dependencies.

## Edit

All text lives in `content.mjs`: work, experience, repos, posts and the gradient palettes.
Styles are in `assets/style.css`, and the WebGL backgrounds are in `assets/gradient.js`.

## Build and preview

```bash
node build.mjs
node serve.mjs
```

`build.mjs` writes the finished site to `dist/`. `serve.mjs` serves it at http://localhost:4321.

## Adding things

- **A project:** add an object to `work` (copy an existing one). It gets a card on the home page and its own page at `work/<slug>.html`.
- **A post:** add an object to `posts`. The `body` is a list of `['h2' | 'h3' | 'p', text]` blocks.
- **A new gradient:** add an entry to `palettes` with `mode` (`flow`, `horizon` or `bloom`), a `seed`, and four colors from dark to light.
