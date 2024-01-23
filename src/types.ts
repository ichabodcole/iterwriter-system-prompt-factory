import { Genre } from './constants/genre'
import { Mode } from './constants/mode'
import { POV } from './constants/pov'
import { ScaledPropertyName } from './constants/scaledProperties'
import { Style } from './constants/style'
import { Theme } from './constants/theme'
import { Tone } from './constants/tone'

export type ScaledPropertiesConfig = Partial<Record<ScaledPropertyName, number>>

export interface SystemPromptConfig {
  context: string
  goal: string
  rules: string[]
  writingStyle: {
    mode?: Mode[]
    genre?: Genre[]
    theme?: Theme[]
    tone?: Tone[]
    style?: Style[]
    pov?: POV
    scaledProperties?: ScaledPropertiesConfig
  }
  customInstructions?: string
}

export interface SystemPrompt extends SystemPromptConfig {
  precedingText: string[]
  followingText: string[]
  seedText: string
}
