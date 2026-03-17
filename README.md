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
2. Install dependencies with `npm install`.
3. Run `npm run dev` to preview the site with Vite (recommended).
4. Update the content inside `index.html`, `assets/css/styles.css`, and `assets/js/main.js` as needed for your deployment.

### Quick local preview

Recommended (includes correct public asset handling):

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (usually `http://localhost:5173`).

Static build preview:

```bash
npm run build
npm run start
```


> Note: Binary media files (e.g., `.png`, `.mp4`) are kept under `public/assets/` for preview/deploy workflows; avoid duplicating them into `assets/`.

## Features

- Lightweight loading screen with an animated white border around the yellow EDS badge.
- Responsive layout with sections for services, benefits, clients, and contact information.
- Smooth scrolling navigation, mobile menu, and contact form feedback written in vanilla JavaScript.
- All assets organised under `assets/` to keep the project ready for GitHub Pages or similar hosting platforms.
