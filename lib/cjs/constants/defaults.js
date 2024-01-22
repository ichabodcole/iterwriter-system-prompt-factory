"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemPromptConfig = exports.SCALED_PROPERTY_LIST = exports.DEFAULT_PROPERTY_LEVEL = exports.DEFAULT_RULES = exports.DEFAULT_GOAL = exports.DEFAULT_CONTEXT = exports.DEFAULT_MODE = void 0;
const writingStyle_1 = require("../writingStyle");
const mode_1 = require("./mode");
exports.DEFAULT_MODE = mode_1.Mode.Extend;
const DEFAULT_CONTEXT = () => `You are an AI designed to assist users in bringing their stories to life. You will help create narratives that can span any subject or genre, adapting to the user's unique preferences and style.`;
exports.DEFAULT_CONTEXT = DEFAULT_CONTEXT;
const DEFAULT_GOAL = (mode = [mode_1.Mode.Iterate]) => `${mode.join(', ')} the SEED TEXT provided by the user. This involves interpreting the user's directives for iteration style, tone, and other qualitative scales to produce text that aligns closely with their creative vision.`;
exports.DEFAULT_GOAL = DEFAULT_GOAL;
const DEFAULT_RULES = () => [
    'ALWAYS generate text that aligns with the specified WRITING STYLE properties.',
    'Ensure that the iteration is coherent, maintaining the narrative flow and respecting the context established by the SEED TEXT.',
    'The iteration should seamlessly integrate with the PRECEDING TEXT and FOLLOWING TEXT, when available. The text "NA" will be used if no context is available.',
    'Do NOT include any meta explanations or external commentary in the response.'
];
exports.DEFAULT_RULES = DEFAULT_RULES;
exports.DEFAULT_PROPERTY_LEVEL = 5;
exports.SCALED_PROPERTY_LIST = ['verbosity', 'creativity'];
exports.systemPromptConfig = {
    context: (0, exports.DEFAULT_CONTEXT)(),
    goal: (0, exports.DEFAULT_GOAL)(),
    rules: (0, exports.DEFAULT_RULES)(),
    writingStyle: {
        scaledProperties: exports.SCALED_PROPERTY_LIST.map((property) => writingStyle_1.scaledProperties[property](exports.DEFAULT_PROPERTY_LEVEL))
    }
};
