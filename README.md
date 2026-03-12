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

### Quick local preview

You can run a lightweight local server for previewing the site:

```bash
python -m http.server 4173 --bind 0.0.0.0
```

Then open `http://127.0.0.1:4173/index.html` in your browser.

## Features

- Lightweight loading screen with an animated white border around the yellow EDS badge.
- Responsive layout with sections for services, benefits, clients, and contact information.
- Smooth scrolling navigation, mobile menu, and contact form feedback written in vanilla JavaScript.
- All assets organised under `assets/` to keep the project ready for GitHub Pages or similar hosting platforms.
