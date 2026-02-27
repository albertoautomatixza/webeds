# Engineering Design & Solutions static site

This repository contains a fully static version of the Engineering Design & Solutions landing page. The project is organised for direct deployment to any static hosting provider, including GitHub Pages.

## Project structure

```
webeds/
├── index.html          # Main entry point
├── assets/
│   ├── css/
│   │   └── styles.css  # Global styles and layout
│   ├── js/
│   │   └── main.js     # Interactivity and animations
│   └── images/         # Reserved for future static assets
└── README.md
```

## Getting started

1. Clone the repository or download the source code.
2. Open `index.html` directly in your browser, or serve the folder with any static server (for example, `python -m http.server`).
3. Update the content inside `index.html`, `assets/css/styles.css`, and `assets/js/main.js` as needed for your deployment.

## Features

- Lightweight loading screen with an animated white border around the yellow EDS badge.
- Responsive layout with sections for services, benefits, clients, and contact information.
- Smooth scrolling navigation, mobile menu, and contact form feedback written in vanilla JavaScript.
- All assets organised under `assets/` to keep the project ready for GitHub Pages or similar hosting platforms.


## Deploy to GitHub Pages

This repository now deploys automatically with GitHub Actions using `.github/workflows/deploy-pages.yml`.

1. Push your changes to the `main` branch.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Wait for the workflow **Deploy to GitHub Pages** to finish.

The workflow runs `npm ci` + `npm run build` and publishes the generated `dist/` folder, so you do not need to commit `dist` binary assets to the repository.
