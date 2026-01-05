# Analytics Usage Examples

This document shows how to use the `trackEvent` function to send events to Amplitude with automatic marketing parameter inclusion.

## Automatic Event Properties

Every event automatically includes:
- **Marketing parameters**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- **Click IDs**: `gclid` (Google), `fbclid` (Facebook), `ttclid` (TikTok)
- **Custom query parameters**: Any other URL params stored as `custom_params` object
- **Page URL**: Full current URL (`page_url`)
- **Referrer**: Document referrer or `'direct'` (`referrer`)
- **Session ID**: Persistent session identifier (`session_id`)
- **Screen**: Current pathname (`screen`)
- **Timestamp**: Milliseconds since epoch (`timestamp`)

## Example Events

### 1. Quiz Started Event

```typescript
import { trackEvent } from './lib/analytics'

// When user starts the quiz
trackEvent('quiz_started', {
  quiz_type: 'sexual_wellness',
  entry_point: 'homepage',
})
```

**Event sent to Amplitude:**
```json
{
  "event_type": "quiz_started",
  "event_properties": {
    "quiz_type": "sexual_wellness",
    "entry_point": "homepage",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "summer_promo",
    "gclid": "abc123",
    "page_url": "https://your-funnel.vercel.app/start",
    "referrer": "https://www.google.com/",
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "screen": "/start",
    "timestamp": 1699123456789
  }
}
```

### 2. Quiz Answer Selected Event

```typescript
import { trackEvent } from './lib/analytics'

// When user selects an answer
trackEvent('quiz_answer_selected', {
  question_id: 'question_1',
  question_text: 'Do you or your partner usually take more initiative in sex?',
  answer: 'I usually take more initiative',
  answer_index: 0,
  question_number: 1,
  total_questions: 7,
})
```

**Event sent to Amplitude:**
```json
{
  "event_type": "quiz_answer_selected",
  "event_properties": {
    "question_id": "question_1",
    "question_text": "Do you or your partner usually take more initiative in sex?",
    "answer": "I usually take more initiative",
    "answer_index": 0,
    "question_number": 1,
    "total_questions": 7,
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "summer_promo",
    "gclid": "abc123",
    "page_url": "https://your-funnel.vercel.app/quiz1",
    "referrer": "https://your-funnel.vercel.app/start",
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "screen": "/quiz1",
    "timestamp": 1699123460000
  }
}
```

### 3. Quiz Completed Event

```typescript
import { trackEvent } from './lib/analytics'

// When user completes the quiz
trackEvent('quiz_completed', {
  total_questions: 7,
  questions_answered: 7,
  duration_seconds: 120,
  completion_rate: 1.0,
  final_screen: '/loader',
})
```

**Event sent to Amplitude:**
```json
{
  "event_type": "quiz_completed",
  "event_properties": {
    "total_questions": 7,
    "questions_answered": 7,
    "duration_seconds": 120,
    "completion_rate": 1.0,
    "final_screen": "/loader",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "summer_promo",
    "gclid": "abc123",
    "page_url": "https://your-funnel.vercel.app/loader",
    "referrer": "https://your-funnel.vercel.app/quiz7",
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "screen": "/loader",
    "timestamp": 1699123480000
  }
}
```

## Where to Place Code

### 1. Initialize Marketing Parameters (App.tsx)

```typescript
// src/App.tsx
import { useEffect } from 'react'
import { useUTMStore } from './store/utmStore'
import { initAnalytics } from './lib/analytics'

function App() {
  const initializeUTM = useUTMStore((state) => state.initialize)

  useEffect(() => {
    // Initialize marketing parameters from URL
    initializeUTM()
    
    // Initialize Amplitude analytics
    initAnalytics()
  }, [initializeUTM])

  // ... rest of your app
}
```

### 2. Track Events in Components

```typescript
// src/screens/StartScreen.tsx
import { trackEvent } from '../lib/analytics'

function StartScreen() {
  const handleContinue = () => {
    // Track quiz start event
    trackEvent('quiz_started', {
      quiz_type: 'sexual_wellness',
      entry_point: 'homepage',
    })
    
    // Navigate to next screen
    navigate('/quiz0')
  }
  
  // ... rest of component
}
```

```typescript
// src/screens/Quiz1Screen.tsx
import { trackEvent } from '../lib/analytics'

function Quiz1Screen() {
  const handleAnswer = (answer: string) => {
    // Track answer selection
    trackEvent('quiz_answer_selected', {
      question_id: 'question_1',
      question_text: 'Do you or your partner usually take more initiative in sex?',
      answer: answer,
      question_number: 1,
      total_questions: 7,
    })
    
    // Save answer and navigate
    setAnswer('question_1', answer)
    navigate('/quiz2')
  }
  
  // ... rest of component
}
```

## Marketing Parameters Capture

Marketing parameters are automatically captured from the URL on first page load:

**Example URL:**
```
https://your-funnel.vercel.app/start?utm_source=google&utm_medium=cpc&utm_campaign=summer_promo&gclid=abc123&custom_param=value
```

**Captured parameters:**
- `utm_source`: `"google"`
- `utm_medium`: `"cpc"`
- `utm_campaign`: `"summer_promo"`
- `gclid`: `"abc123"`
- `custom_params`: `{ custom_param: "value" }`

These parameters are:
1. **Stored in localStorage** (persists across page reloads)
2. **Set as Amplitude user properties** (on initialization)
3. **Included in every event** (automatically)

## Backward Compatibility

The existing `track()` function still works and is an alias for `trackEvent()`:

```typescript
import { track } from './lib/analytics'

// This still works (calls trackEvent internally)
track('quiz_started', { quiz_type: 'sexual_wellness' })
```

However, it's recommended to use `trackEvent()` for clarity.

