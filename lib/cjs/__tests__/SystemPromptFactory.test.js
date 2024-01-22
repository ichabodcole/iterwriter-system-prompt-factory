"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemPromptFactory_1 = require("../SystemPromptFactory");
const defaults_1 = require("../constants/defaults");
const genre_1 = require("../constants/genre");
const mode_1 = require("../constants/mode");
const pov_1 = require("../constants/pov");
const style_1 = require("../constants/style");
const theme_1 = require("../constants/theme");
const tone_1 = require("../constants/tone");
const writingStyle_1 = require("../writingStyle");
describe('SystemPromptFactory', () => {
    let precedingText;
    let followingText;
    let seedText;
    let config;
    let spf;
    beforeEach(() => {
        config = defaults_1.systemPromptConfig;
        config.writingStyle.genre = [genre_1.Genre.Horror, genre_1.Genre.Mystery];
        config.writingStyle.tone = [tone_1.Tone.Dark, tone_1.Tone.Sarcastic];
        config.writingStyle.style = [style_1.Style.Poetic, style_1.Style.Descriptive];
        config.writingStyle.pov = pov_1.POV.ThirdPersonLimited;
        precedingText = 'The preceding text.';
        followingText = 'The following text.';
        seedText = 'The seed text.';
        spf = new SystemPromptFactory_1.SystemPromptFactory(config);
    });
    describe('createSystemPrompt', () => {
        it('should create a system prompt string', () => {
            const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
            expect(typeof systemPrompt).toBe('string');
        });
        describe('Context', () => {
            it('should include a CONTEXT title', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain('# CONTEXT');
            });
            it('should include the context', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain(config.context);
            });
        });
        describe('Goal', () => {
            it('should include a GOAL title', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain('# GOAL');
            });
            it('should include the goal', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain(config.goal);
            });
        });
        describe('Rules', () => {
            it('should include a RULES title', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain('# RULES');
            });
            it('should include the rules', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                const rulesStringList = config.rules.map((rule) => `- ${rule}`).join('\n');
                expect(systemPrompt).toContain(rulesStringList);
            });
        });
        describe('Writing Style', () => {
            it('should include a WRITING STYLE title', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain('# WRITING STYLE');
            });
            describe('Mode', () => {
                it('should include a Mode entry', () => {
                    spf.config.writingStyle.mode = [mode_1.Mode.Extend, mode_1.Mode.Iterate];
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    const heading = `Mode: ${mode_1.Mode.Extend}, ${mode_1.Mode.Iterate} - (The desired approach to iterating on the SEED TEXT)\n`;
                    expect(systemPrompt).toContain(heading);
                });
                it('should not be present if no modes are provided', () => {
                    spf.config.writingStyle.mode = undefined;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).not.toContain('Mode:');
                });
            });
            describe('Genre', () => {
                it('should include a Genre entry', () => {
                    spf.config.writingStyle.genre = [genre_1.Genre.Action, genre_1.Genre.Adventure];
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    const heading = `Genre: ${genre_1.Genre.Action}, ${genre_1.Genre.Adventure} - (The narrative genre and style)\n`;
                    expect(systemPrompt).toContain(heading);
                });
                it('should not be present if no genres are provided', () => {
                    spf.config.writingStyle.genre = undefined;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).not.toContain('Genre:');
                });
            });
            describe('Theme', () => {
                it('should include a Theme entry', () => {
                    spf.config.writingStyle.theme = [theme_1.Theme.Exploration, theme_1.Theme.Technology];
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    const heading = `Theme: ${theme_1.Theme.Exploration}, ${theme_1.Theme.Technology} - (The narrative theme)\n`;
                    expect(systemPrompt).toContain(heading);
                });
                it('should not be present if no themes are provided', () => {
                    spf.config.writingStyle.theme = undefined;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).not.toContain('Theme:');
                });
            });
            describe('Tone', () => {
                it('should include a Tone entry', () => {
                    spf.config.writingStyle.tone = [tone_1.Tone.Dark, tone_1.Tone.Humorous];
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    const heading = `Tone: Dark, Humorous - (The emotional and stylistic mood of the narrative)\n`;
                    expect(systemPrompt).toContain(heading);
                });
                it('should not be present if no tones are provided', () => {
                    spf.config.writingStyle.tone = undefined;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).not.toContain('Tone:');
                });
            });
            describe('Style', () => {
                it('should include a Style entry', () => {
                    spf.config.writingStyle.style = [style_1.Style.Expository, style_1.Style.Descriptive];
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    const heading = `Style: Expository, Descriptive - (The writing style and structure of the narrative)\n`;
                    expect(systemPrompt).toContain(heading);
                });
                it('should not be present if no styles are provided', () => {
                    spf.config.writingStyle.style = undefined;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).not.toContain('Style:');
                });
            });
            describe('POV', () => {
                it('should include a POV entry', () => {
                    spf.config.writingStyle.pov = pov_1.POV.FirstPerson;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    const heading = `POV: First Person - (The narrative point of view)\n`;
                    expect(systemPrompt).toContain(heading);
                });
                it('should not be present if no POV is provided', () => {
                    spf.config.writingStyle.pov = undefined;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).not.toContain('POV:');
                });
            });
            describe('Scaled Properties', () => {
                it('should include a Scaled Properties heading', () => {
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).toContain('Scaled Properties (1-10 scale):\n');
                });
                it('should include the list of scaled properties', () => {
                    var _a, _b;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    const scaledPropertiesStringList = (_b = (_a = config.writingStyle) === null || _a === void 0 ? void 0 : _a.scaledProperties) === null || _b === void 0 ? void 0 : _b.map((prop) => `- ${prop}`).join('\n');
                    expect(systemPrompt).toContain(scaledPropertiesStringList);
                });
                it('should include the scaled property values', () => {
                    spf.config.writingStyle.scaledProperties = [writingStyle_1.scaledProperties.contentLength(2)];
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).toContain('Content Length: 2 (controls the length of the response)');
                });
                it('should not be present if no scaled properties are provided', () => {
                    spf.config.writingStyle.scaledProperties = undefined;
                    const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                    expect(systemPrompt).not.toContain('Scaled Properties (1-10 scale):\n');
                });
            });
        });
        describe('Preceding Text', () => {
            it('should include a PRECEDING TEXT title', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain('# PRECEDING TEXT (directly before the SEED TEXT)\n');
            });
            it('should include the preceding text', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain(precedingText);
            });
            it('should include multiple preceding texts if provided', () => {
                const precedingText1 = 'The first line of preceding text 1.\nThe second line of preceding text 1.';
                const precedingText2 = 'The first line of preceding text 2.\n\nThe second line of preceding text 2.';
                const systemPrompt = spf.createPrompt(seedText, [precedingText1, precedingText2]);
                expect(systemPrompt).toContain(precedingText1);
                expect(systemPrompt).toContain(precedingText2);
            });
            xit('should have a value of "NA" if no preceding text is provided', () => {
                const systemPrompt = spf.createPrompt(seedText);
                expect(systemPrompt).toContain(`# PRECEDING TEXT (directly before the SEED TEXT)\nNA\n\n`);
            });
        });
        describe('Following Text', () => {
            it('should include a FOLLOWING TEXT title', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain('# FOLLOWING TEXT (directly after the SEED TEXT)\n');
            });
            it('should include the following text', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain(followingText);
            });
            it('should include multiple following texts if provided', () => {
                const followingText1 = 'The first line of following text 1.\nThe second line of following text 1.';
                const followingText2 = 'The first line of following text 2.\n\nThe second line of following text 2.';
                const systemPrompt = spf.createPrompt(seedText, precedingText, [
                    followingText1,
                    followingText2
                ]);
                expect(systemPrompt).toContain(followingText1);
                expect(systemPrompt).toContain(followingText2);
            });
            it('should have a value of "NA" if no following text is provided', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText);
                expect(systemPrompt).toContain(`# FOLLOWING TEXT (directly after the SEED TEXT)\nNA\n\n`);
            });
        });
        describe('Seed Text', () => {
            it('should include a SEED TEXT title', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain('# SEED TEXT');
            });
            it('should include the seed text', () => {
                const systemPrompt = spf.createPrompt(seedText, precedingText, followingText);
                expect(systemPrompt).toContain(seedText);
            });
        });
    });
});
