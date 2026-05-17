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
    const { prompt, style = "hyper-realistic" } = await req.json();
    console.log('Generating image with prompt:', prompt, 'style:', style);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Enhance prompt for hyper-realistic output based on style
    const stylePrompts: Record<string, string> = {
      "hyper-realistic": "Create a hyper-realistic, photorealistic image with stunning detail, professional lighting, 8K resolution quality, ultra high definition. The image should look like a professional photograph with natural lighting and textures.",
      "cinematic": "Create a cinematic, movie-quality image with dramatic lighting, depth of field, and professional color grading. Film grain texture, anamorphic lens effect.",
      "editorial": "Create a high-end editorial magazine style image with clean composition, professional studio lighting, and polished aesthetic suitable for publication.",
      "vibrant": "Create a vibrant, colorful image with rich saturated colors, dynamic composition, and energetic feel. Professional quality with eye-catching appeal.",
      "minimalist": "Create a clean, minimalist image with simple composition, negative space, and elegant design. Professional and modern aesthetic.",
    };

    const styleEnhancement = stylePrompts[style] || stylePrompts["hyper-realistic"];
    const enhancedPrompt = `${styleEnhancement}\n\nSubject: ${prompt}\n\nEnsure the image is high quality, professional, and suitable for a blog or publication hero image. 16:9 aspect ratio.`;

    console.log('Enhanced prompt:', enhancedPrompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          { role: 'user', content: enhancedPrompt }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI image generation error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few moments.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI image generation failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('AI response received');
    
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error('No image URL in response:', JSON.stringify(data));
      throw new Error('No image URL returned from AI');
    }

    console.log('Image generated successfully');

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-image:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
