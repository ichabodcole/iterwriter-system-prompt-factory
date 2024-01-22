import { SystemPromptConfig } from './types'

export class SystemPromptFactory {
  config: SystemPromptConfig

  constructor(systemPromptConfig: SystemPromptConfig) {
    this.config = systemPromptConfig
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
      writingStyle += scaledProperties.map((prop) => `- ${prop}`).join('\n') + '\n\n'
    }

    return writingStyle
  }

  private configToString(): string {
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
        acc += '\n\n'
      } else {
        acc += value + '\n\n'
      }

      return acc
    }, '')
  }

  public createPrompt(
    seedText: string,
    precedingText?: string | string[],
    followingText?: string | string[]
  ): string {
    let prompt = this.configToString()

    prompt += '# PRECEDING TEXT (directly before the SEED TEXT)\n'
    if (precedingText) {
      const texts = Array.isArray(precedingText) ? precedingText : [precedingText]
      prompt += texts.join('\n') + '\n\n'
    } else {
      prompt += 'NA\n\n'
    }

    prompt += '# FOLLOWING TEXT (directly after the SEED TEXT)\n'
    if (followingText) {
      const texts = Array.isArray(followingText) ? followingText : [followingText]
      prompt += texts.join('\n') + '\n\n'
    } else {
      prompt += 'NA\n\n'
    }

    prompt += '# SEED TEXT\n'
    prompt += seedText + '\n\n'

    prompt += '# END SYSTEM PROMPT\n'

    return prompt
  }
}
