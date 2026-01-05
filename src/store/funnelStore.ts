import { create } from 'zustand'

export type PlanWeeks = 4 | 12 | 24

interface FunnelState {
  answers: Record<string, string>
  email: string
  selectedPlanWeeks: PlanWeeks
  setAnswer: (question: string, answer: string) => void
  setEmail: (email: string) => void
  setSelectedPlanWeeks: (weeks: PlanWeeks) => void
  reset: () => void
}

export const useFunnelStore = create<FunnelState>((set) => ({
  answers: {},
  email: '',
  selectedPlanWeeks: 12,
  setAnswer: (question, answer) =>
    set((state) => ({
      answers: { ...state.answers, [question]: answer },
    })),
  setEmail: (email) => set({ email }),
  setSelectedPlanWeeks: (weeks) => set({ selectedPlanWeeks: weeks }),
  reset: () =>
    set({
      answers: {},
      email: '',
      selectedPlanWeeks: 12,
    }),
}))

