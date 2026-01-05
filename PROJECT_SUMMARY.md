# Project Summary

## File Tree

```
cumanlly/
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── README.md                       # Complete setup and usage guide
├── PROJECT_SUMMARY.md              # This file
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript config for Node
├── vite.config.ts                  # Vite configuration
└── src/
    ├── assets/                     # Place PNG mock images here
    ├── components/                 # Reusable UI components
    │   ├── ScreenLayout.tsx
    │   ├── ScreenLayout.css
    │   ├── PrimaryButton.tsx
    │   ├── PrimaryButton.css
    │   ├── AnswerButton.tsx
    │   ├── AnswerButton.css
    │   ├── ProgressBar.tsx
    │   ├── ProgressBar.css
    │   ├── BackButton.tsx
    │   └── BackButton.css
    ├── lib/
    │   └── analytics.ts            # Amplitude integration
    ├── screens/                    # All 16 screen components
    │   ├── StartScreen.tsx
    │   ├── StartScreen.css
    │   ├── Quiz0Screen.tsx
    │   ├── Quiz0Screen.css
    │   ├── Quiz1Screen.tsx
    │   ├── Quiz2Screen.tsx
    │   ├── Quiz3Screen.tsx
    │   ├── Quiz4Screen.tsx
    │   ├── Quiz5Screen.tsx
    │   ├── Quiz6Screen.tsx
    │   ├── Quiz7Screen.tsx
    │   ├── QuizScreen.css          # Shared styles for quiz screens
    │   ├── LoaderScreen.tsx
    │   ├── LoaderScreen.css
    │   ├── PlanScreen.tsx
    │   ├── PlanScreen.css
    │   ├── MailScreen.tsx
    │   ├── MailScreen.css
    │   ├── PriceStandartScreen.tsx
    │   ├── PriceOfferScreen.tsx
    │   ├── PriceScreen.css         # Shared styles for price screens
    │   ├── ThanksScreen.tsx
    │   ├── ThanksScreen.css
    │   ├── ErrorScreen.tsx
    │   └── ErrorScreen.css
    ├── store/
    │   └── funnelStore.ts          # Zustand state management
    ├── App.tsx                     # Main app with routing
    ├── main.tsx                    # React entry point
    ├── index.css                   # Global styles
    └── vite-env.d.ts               # Vite type definitions
```

## Key Implementation Details

### 1. Analytics (Amplitude)
- **File**: `src/lib/analytics.ts`
- **Initialization**: Called once in `App.tsx` on mount
- **Session ID**: Generated once per session, stored in `sessionStorage`
- **Event Format**: All events include `screen`, `timestamp`, and `session_id`
- **Answer Formatting**: Spaces converted to underscores (e.g., "Had some prior experience" → "Had_some_prior_experience")

### 2. State Management
- **File**: `src/store/funnelStore.ts`
- **Library**: Zustand
- **State**:
  - `answers`: Record<string, string> - Question → formatted answer
  - `email`: string - User email
  - `selectedPlanWeeks`: 4 | 12 | 24 - Selected plan duration (default: 12)

### 3. Routing
- **Library**: React Router v6
- **Routes**: 16 routes covering all screens
- **Default**: `/` redirects to `/start`

### 4. Responsive Layout
- **Background**: Full viewport gradient (100vw/100vh)
- **Content Container**: Centered, max-width 390px (92vw on larger screens)
- **No Desktop Reflow**: Content stays centered, preserves mobile proportions

### 5. Screen Flow
1. Start → Quiz Intro → Quiz 1-7 → Loader → Plan → Mail → Pricing → Thanks/Error
2. Back buttons on Quiz 1-4 only
3. Close buttons on pricing screens
4. Auto-navigation after answers (300ms delay for visual feedback)

### 6. Loader Animation
- **Duration**: 4 seconds (4000ms)
- **Progress**: 0-100% calculated from elapsed time
- **Update Rate**: requestAnimationFrame (~60fps)
- **Auto-navigate**: To `/plan` when complete

### 7. Email Validation
- **Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Visual Feedback**: Red border on invalid email when submit attempted
- **Button State**: Disabled until valid email entered

### 8. Event Tracking Summary

#### View Events (fired once per screen entry)
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

#### Interaction Events
- `clicked_continue` (Start screen)
- `clicked_start_quiz` (Quiz intro)
- `answear_question_1` through `answear_question_7` (with `answer` param)
- `clicked_next` (Plan screen)
- `mail_input_click` (Email input focus)
- `clicked_mail_complete` (with `email` param)
- `clicked_plan_4`, `clicked_plan_12`, `clicked_plan_24` (Plan selection)
- `clicked_pay_standart` (with `weeks` param)
- `clicked_pay_offer`
- `clicked_cancel_standart`
- `clicked_cancel_offer`

### 9. Quiz Progress
- Progress bar shown on Quiz 1-7 (screens 3-9)
- Progress calculation: `questionNumber / 7`
- Visual: Gradient fill from pink to purple

### 10. Answer Selection
- **Visual Feedback**: Pink border on selected answer
- **Auto-navigate**: 300ms delay after selection
- **State**: Saved to Zustand store immediately

## Testing Checklist

- [ ] All 16 screens render correctly
- [ ] Navigation flows work (forward and back)
- [ ] Amplitude events fire correctly (check browser console/network)
- [ ] Email validation works
- [ ] Loader progresses 0-100% over 4 seconds
- [ ] Plan selection works (12 weeks default)
- [ ] State persists across navigation
- [ ] Responsive layout works on different screen sizes
- [ ] All buttons are clickable and functional
- [ ] Progress bar updates correctly on quiz screens

## Next Steps

1. Add PNG mock images to `src/assets/` (optional - app works without them)
2. Set `VITE_AMPLITUDE_API_KEY` in `.env` file
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development server
5. Test the complete funnel flow
6. Verify Amplitude events in Amplitude dashboard

