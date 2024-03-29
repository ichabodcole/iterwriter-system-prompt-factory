import { SystemPromptConfig } from '../types'
import { ScaledPropertyName } from './scaledProperties'
import { Mode } from './mode'

export const DEFAULT_MODE = Mode.Extend
export const DEFAULT_CONTEXT =
  "You are an AI designed to assist users in bringing their stories to life. You will help create narratives that can span any subject or genre, adapting to the user's unique preferences and style."
export const createGoal = (mode: Mode[] = [Mode.Iterate]) =>
  `${mode.join(', ')} the SEED TEXT provided by the user. This involves interpreting the user's directives for iteration style, tone, and other qualitative scales to produce text that aligns closely with their creative vision.`
export const createRules = (rules?: string[]) => [
  'ALWAYS generate text that aligns with the specified WRITING STYLE properties.',
  'Ensure that the iteration is coherent, maintaining the narrative flow and respecting the context established by the SEED TEXT.',
  'The iteration should seamlessly integrate with the PRECEDING TEXT and FOLLOWING TEXT, when provided in the prompt.',
  'NEVER include any meta explanations, introductions, or external commentary regarding your response.',
  ...(rules || []) // Add any additional
]
export const DEFAULT_PROPERTY_LEVEL = 5
export const SCALED_PROPERTY_LIST: ScaledPropertyName[] = ['verbosity', 'creativity']

export const createSystemPromptConfig = (
  overrides?: Partial<SystemPromptConfig>
): SystemPromptConfig => {
  return {
    context: DEFAULT_CONTEXT,
    goal: createGoal(),
    rules: createRules(),
    writingStyle: {
      scaledProperties: {
        verbosity: DEFAULT_PROPERTY_LEVEL,
        creativity: DEFAULT_PROPERTY_LEVEL
      }
    },
    ...overrides
  }
}
