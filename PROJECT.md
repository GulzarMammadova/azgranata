# AZGRANATA Website

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- SCSS Modules
- App Router

---

## Folder Structure

app/

components/

layout/

ui/

sections/

services/

hooks/

lib/

types/

utils/

constants/

styles/

public/

---

## Architecture Rules

### Components

Each component has its own folder.

Example:

Button/

- Button.tsx
- Button.module.scss
- index.ts

---

### Imports

Always use aliases.

Correct:

```tsx
import Button from "@components/ui/Button";
```

Never:

```tsx
import Button from "../../../Button";
```

---

### SCSS

Always use

```scss
@use "@styles/variables" as *;
```

Never use global styles inside components.

---

### Components

Server Component by default.

Use "use client" only when necessary.

---

### Git

Commit after every completed feature.

Example:

Initial project

Create Button component

Create Header

Create Footer

Hero section

WordPress integration

---

## UI Kit

- Container ✅
- Button ✅
- Section ✅
- Heading ✅

---

## Next Sprint

- Header
- Footer
- Layout

