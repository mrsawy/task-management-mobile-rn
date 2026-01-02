# Task Manager

A modern, cross-platform task management application built with React Native and Expo. Organize your tasks with status tracking, priority levels, and persistent local storage.

## Features

- **Task Management**: Create, edit, update, and delete tasks
- **Status Tracking**: Organize tasks by status (Todo, In Progress, Completed)
- **Priority Levels**: Set task priorities (Low, Medium, High)
- **Local Storage**: Persistent data storage using SQLite
- **Tab Navigation**: Filter tasks by status with tab-based navigation
- **Dark/Light Theme**: Automatic theme switching support
- **Pull to Refresh**: Refresh task list with pull-to-refresh gesture
- **Cross-Platform**: Runs on iOS, Android, and Web

## Tech Stack

### Core Framework
- **React Native** (0.81.5) - Mobile app framework
- **Expo** (~54.0.29) - Development platform and tooling
- **Expo Router** (~6.0.19) - File-based routing system
- **TypeScript** (~5.9.2) - Type safety

### State Management & Data
- **Zustand** (^5.0.2) - Lightweight state management for task store
- **Expo SQLite** (~15.0.5) - Local database for persistent task storage

### UI & Styling
- **Uniwind** (^1.2.2) - Tailwind CSS for React Native
- **Tailwind CSS** (^4.1.17) - Utility-first CSS framework
- **React Native Reusables** - Pre-built UI component library
- **Lucide React Native** (^0.545.0) - Icon library

### Navigation & Gestures
- **React Navigation** (^7.0.0) - Navigation library
- **React Native Gesture Handler** (~2.28.0) - Native gesture handling
- **React Native Reanimated** (~4.1.1) - Animation library

### Utilities
- **clsx** (^2.1.1) - Conditional class names
- **tailwind-merge** (^3.3.1) - Merge Tailwind classes
- **class-variance-authority** (^0.7.1) - Component variant management

## Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Expo CLI (installed globally or via npx)
- For iOS: Xcode (Mac only)
- For Android: Android Studio with Android SDK
- For physical device: Expo Go app ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

## Running the App

### Development Server

Start the Expo development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### Platform-Specific Commands

- **iOS Simulator** (Mac only): Press `i` or run `npm run ios`
- **Android Emulator**: Press `a` or run `npm run android`
- **Web Browser**: Press `w` or run `npm run web`
- **Physical Device**: Scan QR code with Expo Go app

### Clean Build

To clear cache and rebuild:

```bash
npm run clean
```

## Project Structure

```
src/
├── features/
│   └── tasks/
│       ├── data/              # Data layer
│       │   ├── datasources/   # SQLite database operations
│       │   ├── models/        # Task data models
│       │   ├── repositories/  # Data access layer
│       │   └── store/         # Zustand state management
│       └── presentation/      # UI layer
│           ├── components/    # Reusable components
│           └── pages/         # Screen components
├── components/                # Shared UI components
│   ├── atoms/                 # Basic components
│   ├── molecules/             # Composite components
│   └── organs/                # Complex components
└── lib/                       # Utilities and helpers
```

## Usage

### Creating a Task

1. Tap the "Add New Task" button at the bottom
2. Enter task title (required)
3. Optionally add description, set status, and priority
4. Tap "Create" to save

### Managing Tasks

- **Edit**: Tap on any task card to edit
- **Toggle Status**: Tap the status icon to cycle through statuses
- **Delete**: Tap the trash icon on a task card
- **Filter**: Use tabs to filter by status (Todo, In Progress, Completed)

### Task Status Flow

Tasks progress through statuses: `Todo` → `In Progress` → `Completed` (final status)

## Data Persistence

Tasks are stored locally using SQLite database (`tasks.db`). Data persists across app restarts and is device-specific.

## Architecture

The app follows a clean architecture pattern:

- **Data Layer**: Repository pattern with SQLite datasource
- **State Management**: Zustand store for global task state
- **Presentation Layer**: Component-based UI with separation of concerns
- **Type Safety**: Full TypeScript coverage

## Development

### Adding Components

Use React Native Reusables CLI to add UI components:

```bash
npx react-native-reusables/cli@latest add [component-name]
```

### Code Style

- Uses Prettier for code formatting
- Follows TypeScript best practices
- Component structure: `index.tsx` (exports), `[name].tsx` (component), `[name].types.ts` (types)

