import { Genre } from './constants/genre';
import { Mode } from './constants/mode';
import { POV } from './constants/pov';
import { Style } from './constants/style';
import { Theme } from './constants/theme';
import { Tone } from './constants/tone';
export interface SystemPromptConfig {
    context: string;
    goal: string;
    rules: string[];
    writingStyle: {
        mode?: Mode[];
        genre?: Genre[];
        theme?: Theme[];
        tone?: Tone[];
        style?: Style[];
        pov?: POV;
        scaledProperties?: string[];
    };
    customInstructions?: string;
}
export interface SystemPrompt extends SystemPromptConfig {
    precedingText: string[];
    followingText: string[];
    seedText: string;
}
