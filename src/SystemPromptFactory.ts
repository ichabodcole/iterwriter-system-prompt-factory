import { ScaledPropertyName, scaledProperties } from './constants/scaledProperties'
import { ScaledPropertiesConfig, SystemPromptConfig } from './types'

export class SystemPromptFactory {
  __config: SystemPromptConfig

  constructor(systemPromptConfig: SystemPromptConfig) {
    this.__config = systemPromptConfig
  }

  get config(): SystemPromptConfig {
    return this.__config
  }

  set config(config: Partial<SystemPromptConfig>) {
    this.__config = {
      ...this.__config,
      ...config
    }
  }

  private scaledPropertiesToString(scaledPropertiesConfig: ScaledPropertiesConfig): string {
    return Object.entries(scaledPropertiesConfig).reduce((acc, [key, value]) => {
      acc += `- ${scaledProperties[key as ScaledPropertyName](value)}\n`

      return acc
    }, '')
  }

  private writingStyleToString(): string {
    const { mode, genre, theme, tone, style, pov, scaledProperties } = this.config.writingStyle

    let writingStyle = ''

    if (mode) {
      writingStyle += `Mode: ${mode.join(', ')} - (The desired approach to iterating on the SEED TEXT)\n`
    }

    if (genre) {
      writingStyle += `Genre: ${genre.join(', ')} - (The narrative genre and style)\n`
    }

    if (theme) {
      writingStyle += `Theme: ${theme.join(', ')} - (The narrative theme)\n`
    }

    if (tone) {
      writingStyle += `Tone: ${tone.join(', ')} - (The emotional and stylistic mood of the narrative)\n`
    }

    if (style) {
      writingStyle += `Style: ${style.join(', ')} - (The writing style and structure of the narrative)\n`
    }

    if (pov) {
      writingStyle += `POV: ${pov} - (The narrative point of view)\n`
    }

    if (scaledProperties) {
      writingStyle += 'Scaled Properties (1-10 scale):\n'
      writingStyle += this.scaledPropertiesToString(scaledProperties) + '\n\n'
    }

    return writingStyle
  }

  public createSystemPrompt(): string {
    return Object.entries(this.config).reduce((acc, [key, value]) => {
      // writingStyle is a special case
      if (key === 'writingStyle') {
        acc += '# WRITING STYLE\n'
        acc += this.writingStyleToString()
        acc += '\n'

        return acc
      }

      const title = `# ${key.toUpperCase()}`

      acc += title + '\n'

      if (Array.isArray(value)) {
        acc += value.map((v) => `- ${v}`).join('\n')
        acc += '\n'
      } else {
        acc += value + '\n'
      }

      return acc
    }, '')
  }

  public createPrompt(
    seedText: string,
    precedingText?: string | string[],
    followingText?: string | string[]
  ): string {
    let prompt = ''

    if (precedingText) {
      prompt += '# PRECEDING TEXT\n'
      const texts = Array.isArray(precedingText) ? precedingText : [precedingText]
      prompt += texts.join('\n') + '\n\n'
    }

    if (followingText) {
      prompt += '# FOLLOWING TEXT\n'
      const texts = Array.isArray(followingText) ? followingText : [followingText]
      prompt += texts.join('\n') + '\n\n'
    }

    prompt += '# SEED TEXT\n'
    prompt += seedText + '\n'

    return prompt
  }
}
