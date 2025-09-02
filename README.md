# 📅 Infinite Scrollable Calendar
This project is a React + TypeScript infinite scrollable calendar that allows users to smoothly browse past and future months. Journal entries are displayed in their respective dates, and can be viewed in a swipable card modal for easy navigation.

The app is fully mobile-optimized, designed for smooth performance, and deployed online.

# 🚀 Features
- Infinite Vertical Scroll for past and future months.
- Smooth, Continuous Scrolling (not month-locked).
- Dynamic Header Month/Year — updates automatically based on visible month area.
- Calendar Grid Layout aligned by weeks (supports leap years).
- Journal Entry Integration:
- Entries load from local journals.json.
- Each entry shows image, rating, categories, description.
- Clicking opens a swipable modal for browsing entries.
- Responsive & Mobile-Optimized — adapts to all screen sizes.
- Performance Optimized with lightweight rendering.
## 🛠️ Tech Stack
React + TypeScript
Tailwind CSS / CSS for styling
date-fns for date manipulations
React Hooks for scroll tracking and state management
## 📦 Installation & Setup
Prerequisites
Node.js (>=16 recommended)
npm or yarn
Steps
Clone the repo:

``` bash
git clone https://github.com/siddharth-yd/infinite-calendar.git
cd infinite-calendar
```
Install dependencies:

``` bash
npm install
```
Run in development mode:

``` bash
npm start
```
🌍 Deployment
The app is live here:https://localhost:3000
👉 Live Demo URL: https://infinite-calendar-two.vercel.app/

## 🎯 Assumptions & Design Choices
- Month display logic: The header reflects the month occupying the largest portion in the viewport.
- Infinite scrolling: Implemented to render new months dynamically without flicker.
- Start of week: Default is Sunday (can be changed in dateUtils.ts).
- Journal entries: Read from src/data/journals.json, mapped to dates.
- Swipable modal: Supports left/right gestures (mobile) and click navigation (desktop).
- Performance: Keeps DOM light by only rendering visible & nearby months.