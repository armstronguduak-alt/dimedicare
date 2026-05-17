import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, category, tags } = await req.json();
    console.log('Generating article for:', { title, category, tags });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Generate article content
    const contentPrompt = `Write a comprehensive, SEO-optimized health and fitness article with the following details:

Title: ${title}
Category: ${category}
Tags: ${tags?.join(', ') || 'general health'}

Requirements:
- Write a 1000-1500 word article
- Use engaging, conversational tone
- Include practical tips and actionable advice
- Use subheadings (H2 and H3) to organize content
- Add bullet points for easy readability
- Include a compelling introduction and conclusion
- Make it informative and evidence-based
- Optimize for search engines with natural keyword usage

Format the article as HTML with proper heading tags (h2, h3), paragraphs (p), lists (ul, li), and emphasis tags (strong, em) where appropriate.`;

    const contentResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert health and fitness content writer. Write engaging, informative articles with proper HTML formatting.' },
          { role: 'user', content: contentPrompt }
        ],
      }),
    });

    if (!contentResponse.ok) {
      const errorText = await contentResponse.text();
      console.error('AI content generation error:', contentResponse.status, errorText);
      
      if (contentResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few moments.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (contentResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI content generation failed: ${contentResponse.status}`);
    }

    const contentData = await contentResponse.json();
    const content = contentData.choices[0].message.content;

    // Generate excerpt
    const excerptPrompt = `Based on this article, write a compelling 2-3 sentence excerpt (maximum 160 characters) that will make readers want to click and read more:

${content.substring(0, 500)}...`;

    const excerptResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert at writing compelling article excerpts and meta descriptions.' },
          { role: 'user', content: excerptPrompt }
        ],
      }),
    });

    const excerptData = await excerptResponse.json();
    const excerpt = excerptData.choices[0].message.content;

    // Calculate read time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    console.log('Article generated successfully');

    return new Response(
      JSON.stringify({
        content,
        excerpt,
        readTime,
        seoTitle: title,
        seoDescription: excerpt.substring(0, 160)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-article:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
