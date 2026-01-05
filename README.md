# Cumanlly

A 16-screen marketing funnel web application built with React, TypeScript, and Vite. Features Amplitude analytics integration, responsive mobile-first design, and a complete user journey from quiz to purchase.

## Features

- **16 Complete Screens**: Full funnel flow from start to completion
- **Amplitude Analytics**: Comprehensive event tracking for all user interactions
- **UTM Tracking**: Automatic UTM parameter tracking and persistence across sessions
- **Vercel Deployment**: Production-ready deployment configuration
- **Responsive Design**: Centered mobile layout that works on any viewport
- **Quiz Flow**: 7-question personalized quiz with progress tracking
- **Email Validation**: Real-time email validation with visual feedback
- **Animated Loader**: Smooth progress animation (0-100% over 4 seconds)
- **State Management**: Zustand store for funnel state persistence
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation and routing
- **Zustand** - State management
- **Amplitude Analytics** - Event tracking (via CDN with session replay)

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone or navigate to the project directory:
```bash
cd cumanlly
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Set your Amplitude API key in `.env`:
```bash
VITE_AMPLITUDE_API_KEY=your_amplitude_api_key_here
```

Get your Amplitude API key from [https://amplitude.com](https://amplitude.com)

### Running the Development Server

```bash
npm run dev
```

The app will be available at the URL shown in your terminal (typically `http://localhost:5173` in development).

**Note**: Make sure you have set `VITE_AMPLITUDE_API_KEY` in your `.env` file for analytics to work.

### Building for Production

```bash
npm run build
```

The production build will be in the `docs` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

This project is configured for deployment to Vercel with zero configuration changes needed.

### Prerequisites

- A Vercel account ([sign up here](https://vercel.com))
- Your Amplitude API key

### Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import your repository to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your repository

3. **Configure Environment Variables:**
   
   After importing your project, you need to add the Amplitude API key as an environment variable:
   
   a. **Navigate to Project Settings:**
      - In your Vercel project dashboard, click on the **"Settings"** tab (top navigation)
      - Click on **"Environment Variables"** in the left sidebar
   
   b. **Add the Environment Variable:**
      - Click the **"Add New"** button
      - Enter the following:
        - **Key**: `VITE_AMPLITUDE_API_KEY`
        - **Value**: `41d0ce55db9afc24cd09179c31ff9b41` (or your Amplitude API key)
        - **Environment**: Select all three options:
          - ✅ Production
          - ✅ Preview
          - ✅ Development
      - Click **"Save"**
   
   c. **Redeploy (if needed):**
      - If you've already deployed, go to the **"Deployments"** tab
      - Click the **"⋯"** (three dots) menu on the latest deployment
      - Select **"Redeploy"** to apply the new environment variable

4. **Deploy:**
   - Vercel will automatically detect Vite and use the configuration from `vercel.json`
   - The build will run automatically on every push to your main branch
   - Your app will be available at `https://your-project.vercel.app`

### Vercel Configuration

The project includes `vercel.json` with:
- Automatic SPA routing (all routes redirect to `index.html`)
- Vite framework detection
- Build and output directory configuration

### Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the browser. The app reads them via `import.meta.env`.

**Required:**
- `VITE_AMPLITUDE_API_KEY` - Your Amplitude Analytics API key

**For Local Development (.env file):**
```bash
VITE_AMPLITUDE_API_KEY=41d0ce55db9afc24cd09179c31ff9b41
```

**For Vercel Deployment:**
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Key**: `VITE_AMPLITUDE_API_KEY`
   - **Value**: `41d0ce55db9afc24cd09179c31ff9b41`
   - **Environments**: Select Production, Preview, and Development
3. Save and redeploy if needed

**Important:** After adding environment variables in Vercel, you may need to redeploy your project for the changes to take effect.

## Project Structure

```
cumanlly/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ScreenLayout.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── AnswerButton.tsx
│   │   ├── ProgressBar.tsx
│   │   └── BackButton.tsx
│   ├── screens/             # Screen components (16 screens)
│   │   ├── StartScreen.tsx
│   │   ├── Quiz0Screen.tsx
│   │   ├── Quiz1Screen.tsx - Quiz7Screen.tsx
│   │   ├── LoaderScreen.tsx
│   │   ├── PlanScreen.tsx
│   │   ├── MailScreen.tsx
│   │   ├── PriceStandartScreen.tsx
│   │   ├── PriceOfferScreen.tsx
│   │   ├── ThanksScreen.tsx
│   │   └── ErrorScreen.tsx
│   ├── lib/
│   │   ├── analytics.ts     # Amplitude integration
│   │   └── utm.ts           # UTM parameter parsing and management
│   ├── store/
│   │   ├── funnelStore.ts   # Zustand state management
│   │   └── utmStore.ts      # UTM parameters global store
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Routes

- `/start` - Start screen
- `/quiz0` - Quiz introduction
- `/quiz1` - `/quiz7` - Quiz questions 1-7
- `/loader` - Loading screen with progress
- `/plan` - Personalized plan ready
- `/mail` - Email capture
- `/price-standart` - Standard pricing selection
- `/price-offer` - Special offer pricing
- `/thanks` - Thank you page
- `/error` - Error page

## UTM Tracking

The app automatically tracks UTM parameters from the URL and persists them throughout the session.

### Supported UTM Parameters

- `utm_campaign` - Campaign name
- `utm_adset` - Ad set identifier
- `utm_ad` - Ad creative identifier
- `utm_ad_id` - Ad ID
- `utm_source` - Traffic source (e.g., "facebook", "google")
- `utm_medium` - Marketing medium (e.g., "cpc", "email")

### How It Works

1. **On First Load:**
   - UTM parameters are parsed from the URL query string
   - If present, they are saved to `sessionStorage`
   - If a parameter exists in URL, it takes precedence
   - If a parameter doesn't exist in URL but exists in `sessionStorage`, the stored value is reused

2. **Persistence:**
   - UTM parameters persist across page navigations within the same session
   - Parameters are stored in `sessionStorage` (not `localStorage`) for privacy
   - Parameters are available globally via the UTM store

3. **Analytics Integration:**
   - All UTM parameters are automatically included in every Amplitude event
   - UTM parameters are set as user properties in Amplitude on initialization
   - Missing UTM values are `undefined` (not empty strings)

### Example UTM URL

```
https://your-funnel.vercel.app/?utm_source=facebook&utm_campaign=test&utm_adset=set1&utm_ad=creative1&utm_ad_id=123&utm_medium=cpc
```

### Accessing UTM Parameters

UTM parameters are available globally via the Zustand store:

```typescript
import { useUTMStore } from './store/utmStore'

function MyComponent() {
  const utmSource = useUTMStore((state) => state.utm_source)
  const allUTM = useUTMStore((state) => state.getAll())
  
  // Use UTM parameters as needed
}
```

### Utility Functions

```typescript
import { getUTMParams } from './lib/utm'

// Get all UTM parameters
const utmParams = getUTMParams()
// Returns: { utm_source?: string, utm_campaign?: string, ... }
```

## Amplitude Integration

Amplitude is initialized dynamically from JavaScript using environment variables:
- Session Replay (100% sample rate)
- Autocapture enabled for: attribution, file downloads, form interactions, page views, sessions, element interactions, network tracking, web vitals, and frustration interactions
- UTM parameters are automatically set as user properties on initialization

## Amplitude Events

All events automatically include:
- `screen` - Current route (pathname)
- `timestamp` - Event timestamp (milliseconds since epoch)
- `session_id` - Unique session identifier (UUID)
- `utm_campaign` - UTM campaign (if present)
- `utm_adset` - UTM ad set (if present)
- `utm_ad` - UTM ad (if present)
- `utm_ad_id` - UTM ad ID (if present)
- `utm_source` - UTM source (if present)
- `utm_medium` - UTM medium (if present)

### Screen View Events
- `view_start_screen`
- `view_quiz`
- `view_question_1` through `view_question_7`
- `view_loader`
- `view_plan`
- `view_mail`
- `view_price_standart`
- `view_price_offer`
- `view_thanks_page`
- `view_error_page`

### Interaction Events
- `clicked_continue`
- `clicked_start_quiz`
- `answear_question_1` through `answear_question_7` (with `answer` parameter)
- `clicked_next`
- `mail_input_click`
- `clicked_mail_complete` (with `email` parameter)
- `clicked_plan_4`, `clicked_plan_12`, `clicked_plan_24`
- `clicked_pay_standart` (with `weeks` parameter)
- `clicked_pay_offer`
- `clicked_cancel_standart`
- `clicked_cancel_offer`

## Answer Formatting

Answer text is automatically formatted for analytics:
- Spaces are converted to underscores
- Example: "Had some prior experience" → "Had_some_prior_experience"

## State Management

The funnel state is managed using Zustand and includes:
- `answers`: Record of question → answer mappings
- `email`: User's email address
- `selectedPlanWeeks`: Selected plan duration (4, 12, or 24 weeks)

## Responsive Design

- Background gradient fills entire viewport (100vw/100vh)
- Content is centered in a mobile frame (max-width: 390px, 92vw on larger screens)
- Layout preserves mobile proportions on all screen sizes
- No desktop reflow - content stays centered

## Assets

Place PNG mock images in `src/assets/` with these names:
- `start.png`
- `quiz0.png` through `quiz7.png`
- `loader.png`
- `plan.png`
- `mail.png`
- `price_standart.png`
- `price_offer.png`
- `completed_thanks.png`
- `completed_error.png`

Note: The app is built with HTML/CSS components, not just displaying the PNGs.

## Development Notes

- Events fire exactly once per screen entry (guarded against React strict mode double-firing)
- All event names match the specification exactly (including `answear_...` spelling)
- TypeScript types are used throughout for type safety
- Session ID is generated once per session and stored in sessionStorage
- UTM parameters are initialized on app startup and persist throughout the session
- All analytics events automatically include UTM parameters and session_id
- The app works without UTM parameters (they will be undefined, not empty strings)

## License

Private project - All rights reserved

