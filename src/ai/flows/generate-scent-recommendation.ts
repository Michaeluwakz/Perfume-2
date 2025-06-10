// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Personalized perfume recommendations based on user scent preferences.
 *
 * - generateScentRecommendation - A function that generates perfume recommendations.
 * - GenerateScentRecommendationInput - The input type for the generateScentRecommendation function.
 * - GenerateScentRecommendationOutput - The return type for the generateScentRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScentRecommendationInputSchema = z.object({
  scentPreferences: z
    .string()
    .describe('Description of preferred scents, brands, and fragrance families.'),
});
export type GenerateScentRecommendationInput = z.infer<
  typeof GenerateScentRecommendationInputSchema
>;

const GenerateScentRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of perfume recommendations based on the provided preferences.'),
});
export type GenerateScentRecommendationOutput = z.infer<
  typeof GenerateScentRecommendationOutputSchema
>;

export async function generateScentRecommendation(
  input: GenerateScentRecommendationInput
): Promise<GenerateScentRecommendationOutput> {
  return generateScentRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScentRecommendationPrompt',
  input: {schema: GenerateScentRecommendationInputSchema},
  output: {schema: GenerateScentRecommendationOutputSchema},
  prompt: `Based on the following scent preferences, provide a list of perfume recommendations:

{{{scentPreferences}}}

Respond in JSON format.`,
});

const generateScentRecommendationFlow = ai.defineFlow(
  {
    name: 'generateScentRecommendationFlow',
    inputSchema: GenerateScentRecommendationInputSchema,
    outputSchema: GenerateScentRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
