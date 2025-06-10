'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateScentRecommendation, GenerateScentRecommendationInput, GenerateScentRecommendationOutput } from '@/ai/flows/generate-scent-recommendation';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

export default function ScentProfilerPage() {
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!preferences.trim()) {
      setError("Please describe your scent preferences.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const input: GenerateScentRecommendationInput = { scentPreferences: preferences };
      const result: GenerateScentRecommendationOutput = await generateScentRecommendation(input);
      setRecommendations(result.recommendations);
    } catch (e) {
      console.error("Error generating recommendations:", e);
      setError("Sorry, we couldn't generate recommendations at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
              <Wand2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold font-headline">AI Scent Profiler</CardTitle>
            <CardDescription className="text-lg">
              Let our AI help you find your perfect perfume. Describe your favorite scents, notes, or even a mood, and we'll suggest some matches!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="scentPreferences" className="text-lg font-semibold">Your Scent Preferences</Label>
                <Textarea
                  id="scentPreferences"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g., 'I love fresh, citrusy scents like bergamot and grapefruit, but also enjoy a hint of vanilla. I usually wear light floral perfumes for daytime and something woody or spicy for evenings. My favorite brands are Jo Malone and Byredo.'"
                  rows={6}
                  className="mt-2 focus:ring-accent"
                  required
                />
                {error && <p className="text-sm text-destructive mt-2">{error}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Finding Your Scents...' : 'Get Recommendations'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {recommendations && recommendations.length > 0 && (
          <Card className="mt-10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-center">Your Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc list-inside">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-md text-foreground/90">{rec}</li>
                ))}
              </ul>
            </CardContent>
             <CardFooter className="text-center block">
                <p className="text-sm text-muted-foreground">We hope you find your new favorite!</p>
            </CardFooter>
          </Card>
        )}
         {recommendations && recommendations.length === 0 && !isLoading && (
           <Card className="mt-10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-center">No specific recommendations found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">We couldn't find specific matches based on your input. Try being more detailed or broader in your description.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
