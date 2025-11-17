# Airport Management System (Frontend Only)

A complete **React + Vite** demo implementing the U Devs Frontend-Only Task using **Context API** (no prop drilling) and optional **localStorage** persistence.

## Tech
- React 18, React Router v6
- Context API for **Auth**, **Users**, **Tickets**
- Tailwind CSS for styling
- Vite for tooling

## Features
- Splash screen → routes to Login/Dashboard
- Frontend-only Auth (register/login/logout) stored in localStorage
- **User CRUD** (Create, Read, Update, Delete)
- **Ticket CRUD**
- **Booking system** linking users ↔ tickets (book/unbook)
- Flights view + "My Booked Flights"
- Confirmation modals, basic validation
- Responsive layout

## Scripts
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Folder Structure
```
/src
  /components
  /context        # AuthContext, UserContext, TicketContext
  /pages          # Splash, Login, Register, Dashboard, Users, Tickets, Bookings, Flights
  /styles         # Tailwind entry
  App.jsx
  main.jsx
```

## Context Usage
- `AuthContext` → registers/logs in users and remembers `currentUser`
- `UserContext` → manages system user list
- `TicketContext` → manages tickets and `bookedBy[]`; exposes `bookTicket`/`unbookTicket`

> Note: For simplicity, **Auth users** and **CRUD users** are separate. To see your bookings under *Flights → My Booked Flights*, create a user whose ID matches the logged-in user (or adapt the logic to auto-sync).

## Tailwind Setup
Already configured via `tailwind.config.cjs` and `postcss.config.cjs`. Main CSS at `src/styles/index.css`.

## Acceptance Checklist
- ✅ App runs without runtime errors
- ✅ CRUD for Users & Tickets
- ✅ Data via Context only
- ✅ Booking interlink
- ✅ Splash + proper routes
- ✅ Responsive
- ✅ README (this file)

## Notes
- This is frontend-only by design. Replace localStorage with an API later if needed.
- All destructive actions ask for confirmation.
```

