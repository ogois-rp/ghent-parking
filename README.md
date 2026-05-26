# ParkGent

Real-time parking availability across Ghent, built with React and the [Stad Gent Open Data API](https://data.stad.gent/explore/dataset/bezetting-parkeergarages-real-time).

🚗 **Live demo:** https://ghent-parking-phi.vercel.app

---

## Features

- Real-time parking availability from the Ghent open data API
- Search parking structures by name
- Sort by name or available spaces (ascending / descending)
- Detail page with map, capacity bar, and full parking info
- Favourite parking spots — persisted on device
- Onboarding form to save your personal and vehicle details
- Profile page to edit your details or reset the app

---

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) — build tool
- [React Router](https://reactrouter.com) — client-side routing
- [Tailwind CSS](https://tailwindcss.com) — styling
- [React Leaflet](https://react-leaflet.js.org) — map on detail page
- [Lucide React](https://lucide.dev) — icons

---

## Architecture

Feature-based folder structure with a layered data flow:

pages → hooks → services → apiClient → Ghent API

- `pages/` — thin route components, compose hooks and components
- `components/` — UI components grouped by feature
- `hooks/` — custom hooks owning data fetching and local state
- `services/` — API call definitions, no Redux or UI logic
- `utils/` — apiClient, localStorage helpers, parsing utilities
- `types/` — shared TypeScript interfaces

All user data (profile, favourites, onboarding flag) is stored in `localStorage` — no backend required.

---

## Getting started

### Prerequisites
- Node.js 18+

### Install and run

```bash
git clone https://github.com/yourusername/ghent-parking.git
cd ghent-parking
npm install
npm run dev
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

VITE_API_BASE_URL=https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time

---

## Project structure

src/
pages/
Onboarding.tsx
Parking.tsx
ParkingDetail.tsx
Profile.tsx
components/
parking/
ParkingCard.tsx
ParkingFilter.tsx
ParkingMap.tsx
onboarding/
ProfileForm.tsx
shared/
FieldInput.tsx
Header.tsx
hooks/
useParking.ts
useParkingDetail.ts
useProfile.ts
useFavourites.ts
services/
parkingService.ts
utils/
apiClient.ts
localStorage.ts
parseLocation.ts
types/
parking.ts
user.ts