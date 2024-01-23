import { SystemPromptConfig } from './types';
export declare class SystemPromptFactory {
    __config: SystemPromptConfig;
    constructor(systemPromptConfig: SystemPromptConfig);
    get config(): SystemPromptConfig;
    set config(config: Partial<SystemPromptConfig>);
    private writingStyleToString;
    createSystemPrompt(): string;
    createPrompt(seedText: string, precedingText?: string | string[], followingText?: string | string[]): string;
}
