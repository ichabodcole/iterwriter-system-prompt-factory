"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSystemPromptConfig = exports.SCALED_PROPERTY_LIST = exports.DEFAULT_PROPERTY_LEVEL = exports.createRules = exports.createGoal = exports.DEFAULT_CONTEXT = exports.DEFAULT_MODE = void 0;
const mode_1 = require("./mode");
exports.DEFAULT_MODE = mode_1.Mode.Extend;
exports.DEFAULT_CONTEXT = "You are an AI designed to assist users in bringing their stories to life. You will help create narratives that can span any subject or genre, adapting to the user's unique preferences and style.";
const createGoal = (mode = [mode_1.Mode.Iterate]) => `${mode.join(', ')} the SEED TEXT provided by the user. This involves interpreting the user's directives for iteration style, tone, and other qualitative scales to produce text that aligns closely with their creative vision.`;
exports.createGoal = createGoal;
const createRules = (rules) => [
    'ALWAYS generate text that aligns with the specified WRITING STYLE properties.',
    'Ensure that the iteration is coherent, maintaining the narrative flow and respecting the context established by the SEED TEXT.',
    'The iteration should seamlessly integrate with the PRECEDING TEXT and FOLLOWING TEXT, when provided in the prompt.',
    'NEVER include any meta explanations, introductions, or external commentary regarding your response.',
    ...(rules || []) // Add any additional
];
exports.createRules = createRules;
exports.DEFAULT_PROPERTY_LEVEL = 5;
exports.SCALED_PROPERTY_LIST = ['verbosity', 'creativity'];
const createSystemPromptConfig = (overrides) => {
    return Object.assign({ context: exports.DEFAULT_CONTEXT, goal: (0, exports.createGoal)(), rules: (0, exports.createRules)(), writingStyle: {
            scaledProperties: {
                verbosity: exports.DEFAULT_PROPERTY_LEVEL,
                creativity: exports.DEFAULT_PROPERTY_LEVEL
            }
        } }, overrides);
};
exports.createSystemPromptConfig = createSystemPromptConfig;
