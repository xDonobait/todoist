# Todoist — Minimalist Task Manager

A clean, professional task management application built with Next.js 15, TypeScript, and SCSS. Features a minimalist black and white design with Grotesk typography.

## Features

- ✨ Create, complete, and delete tasks
- 🎯 Filter tasks (all / active / completed)
- 💾 Local persistence with localStorage
- 📱 Fully responsive design
- ⌨️ Keyboard shortcuts (Enter to add task)
- 🎨 Minimalist black and white aesthetic
- 🚫 No authentication, no backend, no external APIs

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** SCSS / CSS Modules
- **State Management:** React Hooks (useState, useEffect)
- **Persistence:** localStorage

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   ├── page.module.scss    # Page styles
│   └── globals.scss        # Global styles
├── components/
│   ├── TaskInput.tsx       # Input component
│   ├── TaskList.tsx        # List container
│   ├── TaskItem.tsx        # Individual task
│   ├── FilterBar.tsx       # Filter controls
│   ├── icons/
│   │   └── Icons.tsx       # SVG icons
│   └── *.module.scss       # Component styles
├── hooks/
│   └── useTasks.ts         # Tasks state management
└── types/
    └── task.ts             # TypeScript types
```

## Design Principles

- **Minimalist:** Clean black and white design, no gradients or shadows
- **Grotesk Typography:** Sans-serif, clear and legible
- **Responsive:** Works seamlessly on mobile and desktop
- **Accessible:** Clear visual states and keyboard support
- **Professional:** Production-ready code quality

## License

MIT
