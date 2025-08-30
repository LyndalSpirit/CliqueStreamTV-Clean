CLIQUE Stream TV

A clean, AI-powered open-source streaming platform UI built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI components. Ready for rapid development and deployment to Netlify.

🚀 Features

Modern UI: Responsive layout with dark mode, built using Tailwind CSS and ShadCN UI.

Modular Architecture: App router, server components, and a clear src/ structure for pages, components, and utilities.

Creator Studio: Scaffolded pages for user profile, settings, and a placeholder studio.

Netlify-Ready: One-file netlify.toml for zero-config deploys.

/
├── netlify.toml            # Netlify deploy configuration
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS + Tailwind CSS setup
├── tailwind.config.ts      # Tailwind CSS theme & paths
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project manifest & scripts
├── README.md               # This file
├── components.json         # ShadCN UI component config
└── src/
    ├── app/                # Next.js App Router
    │   ├── globals.css     # Global CSS (Tailwind + custom)
    │   ├── layout.tsx      # Root layout & metadata
    │   ├── page.tsx        # Home page entry
    │   └── dashboard/
    │       └── page.tsx    # Creator Studio placeholder
    ├── components/         # Shared React components
    │   ├── ModelSelector.tsx
    │   ├── ScriptWriter.tsx
    │   └── ui/             # ShadCN UI wrappers
    ├── pages/              # Traditional pages (if used)
    ├── lib/                # Utility functions
    ├── hooks/              # Custom React hooks
    └── public/             # Static assets (favicon, icons)

