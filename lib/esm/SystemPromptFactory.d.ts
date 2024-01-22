import { SystemPromptConfig } from './types';
export declare class SystemPromptFactory {
    config: SystemPromptConfig;
    constructor(systemPromptConfig: SystemPromptConfig);
    private writingStyleToString;
    private configToString;
    createPrompt(seedText: string, precedingText?: string | string[], followingText?: string | string[]): string;
}
