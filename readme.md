# WorkConsole

WorkConsole is a single-surface, state-driven work dashboard designed to make “starting” explicit.

Instead of fading into the background, WorkConsole behaves like a control panel for your work.  
Sessions are first-class entities. State is visible. Motion is semantic.

This is not a calming productivity app.  
It is an operational surface for work—opinionated, bounded, and intentional.

---

## Concept

WorkConsole models work as a finite system:


Each transition is reflected in both data *and* interface structure.

- Logging in reconfigures the entire workspace.
- Creating a session reshapes the main surface.
- Activating work becomes an event.
- Exiting collapses the system back into a dormant state.

Nothing scrolls.  
The workspace reconfigures.

---

## Features

- Session lifecycle: Planned → Active → Completed  
- Single-surface layout (no scrolling)  
- Semantic motion tied to state transitions  
- Global theming via Redux (environment profiles)  
- Authentication flow with spatial reconfiguration  
- Fixed operational zones:
  - Identity panel
  - Session states
  - Main workspace
  - Recent history

---

## Tech Stack

**Frontend**
- React  
- Redux Toolkit  
- Tailwind CSS (v4)  
- React Router  

**Backend**
- Node.js  
- Express  
- MongoDB  

**Auth**
- JWT (HTTPonly cookies)
The entire UI is driven by global state.  
Transitions are not animations layered on top—they are expressions of state change.

---

## Status

Active development.  
Designed as a portfolio project focused on:

- State modeling  
- System thinking  
- Frontend–backend coherence  
- Constraint-driven UI design  
