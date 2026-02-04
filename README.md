#  Modern Admin Dashboard (Angular 21)

A high-performance, **Zoneless** admin template built with **Angular 21**, **Material 3**, and **Signals**. This project utilizes a dynamic JSON-driven architecture to minimize boilerplate and maximize rendering speed on low-resource systems.

##  2026 Tech Stack
- **Framework**: [Angular 21](https://angular.dev) (Zoneless by Default)
- **UI Library**: [Angular Material 3](https://material.angular.io) (Amber/Gold Palette)
- **State Management**: [Angular Signals](https://angular.devguide/signals)
- **Build Engine**: [esbuild](https://esbuild.github.io) (Blazing fast compilation)
- **Styling**: SCSS with Material 3 Design Tokens (CSS Variables)

##  Features
- **Dynamic UI Engine**: Stats cards, buttons, tables, and forms are generated via `public/data/admin-config.json`.
- **Theme Engine**: Seamless Light/Dark mode toggling with persisted user preference.
- **Optimized Routing**: Protected admin routes with **Lazy Loading** and **Auth Guards**.
- **Modern Control Flow**: Uses `@if`, `@for`, and `@switch` for high-performance DOM manipulation.
- **Low-Latency UX**: Ripple effects and complex animations optimized for slower hardware.

##  Folder Structure
- `public/data/`: JSON configuration files for the UI.
- `src/app/core/`: Singleton services (Auth, Theme, Config Service).
- `src/app/shared/`: Atomic UI components (Shared Buttons, Inputs, Tables).
- `src/app/layout/`: The Shell component (Sidenav + Toolbar).
- `src/app/features/`: Lazy-loaded business modules (Dashboard, Users, Settings).

##  Quick Start

1. **Clone & Install**:
   ```bash
   git clone https://github.com/sourabh11it25-lgtm/angular-material-admin.git
   cd angular-material-admin
   npm install
