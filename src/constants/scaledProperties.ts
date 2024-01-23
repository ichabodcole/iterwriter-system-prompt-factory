export type ScaledPropertyName = keyof typeof scaledProperties

export const scaledProperties = {
  contentLength: (length: number) =>
    `Content Length: ${length} (controls the length of the response)`,
  lexicalComplexity: (level: number) =>
    `Lexical Complexity: ${level} (controls the complexity of the vocabulary)`,
  lexicalDiversity: (level: number) =>
    `Lexical Diversity: ${level} (controls the diversity of the vocabulary)`,
  lexicalRichness: (level: number) =>
    `Lexical Richness: ${level} (controls the richness of the vocabulary)`,
  lexicalDensity: (level: number) =>
    `Lexical Density: ${level} (controls the density of the vocabulary)`,
  register: (level: number) =>
    `Register: ${level} (determines the level of formality in the writing style)`,
  syntacticComplexity: (level: number) =>
    `Syntactic Complexity: ${level} (controls the complexity of the sentence structure)`,
  creativity: (level: number) =>
    `Creativity: ${level} (controls the uniqueness and imaginative elements)`,
  descriptiveness: (level: number) =>
    `Descriptiveness: ${level} (dictates the richness of sensory and detail-oriented descriptions)`,
  personality: (level: number) =>
    `Personality: ${level} (determines the level of personality and emotion in the writing style)`,
  verbosity: (level: number) =>
    `Verbosity: ${level} (determines the level of verbosity in the writing style)`,
  pacing: (level: number) => `Pacing: ${level} (adjusts the speed at which the story unfolds)`,
  emotionalIntensity: (level: number) =>
    `Emotional Intensity: ${level} (sets the degree of emotional depth and impact)`,
  dialogueFocus: (level: number) =>
    `Dialogue Focus: ${level} (balances narrative description and character dialogue)`,
  complexity: (level: number) =>
    `Complexity: ${level} (determines the intricacy of the plot and character relationships)`,
  poetic: (level: number) =>
    `Poetic: ${level} (determines the level of poetic language in the writing style)`,
  ornateness: (level: number) =>
    `Ornateness: ${level} (determines the level of ornate language in the writing style)`,
  floweriness: (level: number) =>
    `Floweriness: ${level} (determines the level of floweriness in the writing style)`
}
