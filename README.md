# Dra Alejandra App

A React Native app built with Expo and Appwrite for authentication.

## Features

- ✅ Authentication with Appwrite
- ✅ Sign up and sign in functionality
- ✅ Protected routes
- ✅ User profile management
- ✅ Exercise tracking interface
- ✅ Modern UI with Tailwind CSS

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory with your Appwrite credentials:

```env
EXPO_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
```

### 2. Appwrite Configuration

1. Create a new project in Appwrite Console
2. Set up Authentication with Email/Password
3. Create a database and collection for users
4. Update the `lib/appwrite.ts` file with your project details

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the App

```bash
npm start
```

## Authentication Flow

1. **Sign Up**: Users can create new accounts with email verification
2. **Sign In**: Users can log in with their credentials
3. **Protected Routes**: App automatically redirects to auth screens when not logged in
4. **Sign Out**: Users can log out from the profile screen

## Project Structure

```
app/
├── _layout.tsx          # Root layout with auth provider
├── index.tsx           # Home screen with greeting
├── perfil.tsx          # Profile screen with sign out
├── ejercicios.tsx      # Exercises screen
└── auth/
    ├── sign-in.tsx     # Sign in screen
    └── sign-up.tsx     # Sign up screen

lib/
├── appwrite.ts         # Appwrite client and auth functions
└── auth-context.tsx    # Authentication context provider
```

## Next Steps

1. Add actual images to replace placeholders
2. Implement exercise detail screens
3. Add user data persistence
4. Implement exercise tracking functionality
5. Add notifications and reminders