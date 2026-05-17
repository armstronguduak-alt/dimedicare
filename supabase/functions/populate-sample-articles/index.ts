import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sampleArticles = [
  { category: "fitness", title: "10 Minute Morning Workout Routine for Busy People", tags: ["workout", "morning", "time-efficient"] },
  { category: "fitness", title: "Complete Beginner's Guide to Weight Training", tags: ["strength", "beginner", "gym"] },
  { category: "fitness", title: "Best Home Exercises for Building Core Strength", tags: ["core", "home-workout", "abs"] },
  { category: "nutrition", title: "High Protein Meal Prep Ideas for the Week", tags: ["meal-prep", "protein", "recipes"] },
  { category: "nutrition", title: "Complete Guide to Intermittent Fasting", tags: ["fasting", "diet", "weight-loss"] },
  { category: "nutrition", title: "Best Superfoods for Energy and Vitality", tags: ["superfoods", "energy", "nutrition"] },
  { category: "wellness", title: "5 Science-Backed Ways to Reduce Stress", tags: ["stress", "mental-health", "wellness"] },
  { category: "wellness", title: "Ultimate Guide to Better Sleep Quality", tags: ["sleep", "rest", "recovery"] },
  { category: "wellness", title: "Daily Meditation Practices for Beginners", tags: ["meditation", "mindfulness", "mental-health"] },
  { category: "reviews", title: "Best Fitness Trackers of 2024", tags: ["fitness-tracker", "wearables", "technology"] },
  { category: "reviews", title: "Top 5 Protein Powders Compared", tags: ["protein", "supplements", "review"] },
  { category: "reviews", title: "Best Yoga Mats for Home Practice", tags: ["yoga", "equipment", "review"] },
  { category: "fitness", title: "HIIT Workouts for Maximum Fat Burn", tags: ["HIIT", "cardio", "fat-loss"] },
  { category: "nutrition", title: "Plant-Based Protein Sources Guide", tags: ["plant-based", "vegan", "protein"] },
  { category: "wellness", title: "Building Healthy Morning Routines", tags: ["routine", "habits", "productivity"] },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name, slug');

    if (catError) throw catError;

    console.log('Starting article generation...');
    const results = [];

    for (const article of sampleArticles) {
      try {
        const category = categories.find((c) => c.slug === article.category);
        if (!category) continue;

        // Generate article content
        console.log(`Generating: ${article.title}`);
        const contentResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: 'You are an expert health and fitness content writer.' },
              { role: 'user', content: `Write a comprehensive 1000-1500 word article about: ${article.title}. Category: ${category.name}. Include practical tips, format as HTML with h2, h3, p, ul, li tags.` }
            ],
          }),
        });

        const contentData = await contentResponse.json();
        const content = contentData.choices[0].message.content;

        // Generate excerpt
        const excerptResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'user', content: `Write a compelling 2-sentence excerpt (max 160 chars) for: ${article.title}` }
            ],
          }),
        });

        const excerptData = await excerptResponse.json();
        const excerpt = excerptData.choices[0].message.content;

        // Generate image
        const imagePrompt = `Professional hero image for health and fitness article: ${article.title}. Category: ${category.name}. Modern, clean, inspiring, 16:9 aspect ratio, ultra high resolution.`;
        
        const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash-image',
            messages: [{ role: 'user', content: imagePrompt }],
            modalities: ['image', 'text']
          }),
        });

        const imageData = await imageResponse.json();
        const imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        // Create article
        const slug = article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        const { error: insertError } = await supabase
          .from('articles')
          .insert({
            title: article.title,
            slug,
            excerpt,
            content,
            featured_image: imageUrl,
            category_id: category.id,
            status: 'published',
            seo_title: article.title,
            seo_description: excerpt.substring(0, 160),
            read_time: readTime,
            published_at: new Date().toISOString(),
          });

        if (insertError) throw insertError;

        results.push({ title: article.title, status: 'success' });
        console.log(`✓ Created: ${article.title}`);
        
        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`Error creating ${article.title}:`, error);
        results.push({ 
          title: article.title, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    return new Response(
      JSON.stringify({ message: 'Sample articles generated', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
