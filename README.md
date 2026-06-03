# Bart Roels Terminal Portfolio

A modern Linux terminal-inspired portfolio for bartroels.be, built with Vite, React and TypeScript.

## Local Development

```bash
npm install
npm run dev
```

Vite will print the local development URL, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
```

The static production output is written to `dist/`.

## Static Hosting

Deploy the contents of `dist/` to any static host. For GitHub Pages, keep the `CNAME` file at the project root and make sure the built `dist/CNAME` is also published. Vite copies files from `public/` into `dist/`; the root `CNAME` remains available for repository-level Pages configuration.

If you are replacing the old single-file site manually, use this project structure instead of only replacing `index.html`:

```text
index.html
package.json
vite.config.ts
tsconfig.json
tsconfig.node.json
public/
src/
```
