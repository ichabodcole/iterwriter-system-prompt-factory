import { scaledProperties } from './constants/scaledProperties';
export class SystemPromptFactory {
    constructor(systemPromptConfig) {
        this.__config = systemPromptConfig;
    }
    get config() {
        return this.__config;
    }
    set config(config) {
        this.__config = Object.assign(Object.assign({}, this.__config), config);
    }
    scaledPropertiesToString(scaledPropertiesConfig) {
        return Object.entries(scaledPropertiesConfig).reduce((acc, [key, value]) => {
            acc += `- ${scaledProperties[key](value)}\n`;
            return acc;
        }, '');
    }
    writingStyleToString() {
        const { mode, genre, theme, tone, style, pov, scaledProperties } = this.config.writingStyle;
        let writingStyle = '';
        if (mode) {
            writingStyle += `Mode: ${mode.join(', ')} - (The desired approach to iterating on the SEED TEXT)\n`;
        }
        if (genre) {
            writingStyle += `Genre: ${genre.join(', ')} - (The narrative genre and style)\n`;
        }
        if (theme) {
            writingStyle += `Theme: ${theme.join(', ')} - (The narrative theme)\n`;
        }
        if (tone) {
            writingStyle += `Tone: ${tone.join(', ')} - (The emotional and stylistic mood of the narrative)\n`;
        }
        if (style) {
            writingStyle += `Style: ${style.join(', ')} - (The writing style and structure of the narrative)\n`;
        }
        if (pov) {
            writingStyle += `POV: ${pov} - (The narrative point of view)\n`;
        }
        if (scaledProperties) {
            writingStyle += 'Scaled Properties (1-10 scale):\n';
            writingStyle += this.scaledPropertiesToString(scaledProperties) + '\n\n';
        }
        return writingStyle;
    }
    createSystemPrompt() {
        return Object.entries(this.config).reduce((acc, [key, value]) => {
            // writingStyle is a special case
            if (key === 'writingStyle') {
                acc += '# WRITING STYLE\n';
                acc += this.writingStyleToString();
                acc += '\n';
                return acc;
            }
            const title = `# ${key.toUpperCase()}`;
            acc += title + '\n';
            if (Array.isArray(value)) {
                acc += value.map((v) => `- ${v}`).join('\n');
                acc += '\n';
            }
            else {
                acc += value + '\n';
            }
            return acc;
        }, '');
    }
    createPrompt(seedText, precedingText, followingText) {
        let prompt = '';
        if (precedingText) {
            prompt += '# PRECEDING TEXT\n';
            const texts = Array.isArray(precedingText) ? precedingText : [precedingText];
            prompt += texts.join('\n') + '\n\n';
        }
        if (followingText) {
            prompt += '# FOLLOWING TEXT\n';
            const texts = Array.isArray(followingText) ? followingText : [followingText];
            prompt += texts.join('\n') + '\n\n';
        }
        prompt += '# SEED TEXT\n';
        prompt += seedText + '\n';
        return prompt;
    }
}
