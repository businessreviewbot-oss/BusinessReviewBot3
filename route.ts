import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

/**
 * AI Response Generator API Route
 *
 * Generates professional, empathetic review responses optimized for local SEO.
 * Uses OpenAI's GPT model to analyze sentiment and create contextual responses.
 */

interface GenerateRequestBody {
  review: string;
  businessName?: string;
  businessType?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let body: GenerateRequestBody;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('[Generate Response API] JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { review, businessName, businessType } = body;

    console.log('[Generate Response API] Request received:', {
      reviewLength: review?.length,
      businessName,
      businessType,
      timestamp: new Date().toISOString()
    });

    // Validate request
    if (!review || review.trim().length === 0) {
      console.error('[Generate Response API] Validation error: Review text is required');
      return NextResponse.json(
        { error: 'Review text is required' },
        { status: 400 }
      );
    }

    // Check for API key with detailed logging
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    console.log('[Generate Response API] API key check:', {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      prefix: apiKey?.substring(0, 7) || 'none',
      envKeys: Object.keys(process.env).filter(k => k.includes('OPENAI')).join(', ') || 'no OPENAI keys found'
    });

    if (!apiKey || apiKey === '' || apiKey === 'your-openai-api-key-here' || apiKey.startsWith('sk-') === false) {
      console.error('[Generate Response API] Error: OPENAI_API_KEY not configured properly', {
        isEmpty: !apiKey || apiKey === '',
        isPlaceholder: apiKey === 'your-openai-api-key-here',
        hasValidPrefix: apiKey?.startsWith('sk-')
      });
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    console.log('[Generate Response API] OpenAI API key validated, initializing client');

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Create a highly optimized prompt for professional review responses
    const systemPrompt = `You are an expert business review response writer specializing in creating professional, empathetic, and SEO-optimized responses to customer reviews.

Your responses should:
1. Be genuinely empathetic and personal (not robotic)
2. Address specific points mentioned in the review
3. Maintain a professional yet warm tone
4. Include subtle local SEO keywords when appropriate (location, business type)
5. Be between 50-150 words
6. End with a forward-looking statement or call to action
7. For negative reviews: acknowledge, apologize sincerely, and offer to make it right
8. For positive reviews: express gratitude and encourage return visits
9. For mixed reviews: balance appreciation with acknowledgment of concerns

DO NOT:
- Use generic templates
- Over-apologize or sound desperate
- Make unrealistic promises
- Include placeholder text like [contact info]
- Be overly promotional`;

    const userPrompt = businessName && businessType
      ? `Write a professional response to this customer review for ${businessName}, a ${businessType}:\n\n"${review}"\n\nGenerate only the response text, no additional commentary.`
      : `Write a professional response to this customer review:\n\n"${review}"\n\nGenerate only the response text, no additional commentary.`;

    // Call OpenAI API with streaming disabled for simplicity
    // In production, you might want to enable streaming for better UX
    console.log('[Generate Response API] Calling OpenAI API...', {
      model: 'gpt-4o-mini',
      promptLength: systemPrompt.length + userPrompt.length
    });

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Fast and cost-effective model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8, // Slightly creative while maintaining professionalism
        max_tokens: 300,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });
    } catch (openaiError) {
      console.error('[Generate Response API] OpenAI API call failed:', {
        error: openaiError,
        message: openaiError instanceof Error ? openaiError.message : 'Unknown error',
        stack: openaiError instanceof Error ? openaiError.stack : undefined
      });
      throw openaiError;
    }

    console.log('[Generate Response API] OpenAI API call successful', {
      choices: completion.choices?.length || 0,
      tokensUsed: completion.usage?.total_tokens || 0
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    if (!responseText) {
      console.error('[Generate Response API] Error: No response text generated');
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      );
    }

    console.log('[Generate Response API] Response generated successfully, length:', responseText.length);

    // Return the generated response
    return NextResponse.json({
      response: responseText,
      sentiment: analyzeSentiment(review),
      tokensUsed: completion.usage?.total_tokens || 0,
    });

  } catch (error) {
    // Comprehensive error logging
    console.error('[Generate Response API] Error occurred:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: error?.constructor?.name || typeof error,
      timestamp: new Date().toISOString()
    });

    // Handle OpenAI-specific errors
    if (error instanceof OpenAI.APIError) {
      console.error('[Generate Response API] OpenAI API Error:', {
        message: error.message,
        status: error.status,
        type: error.type,
        code: error.code,
        headers: error.headers
      });
      return NextResponse.json(
        {
          error: 'OpenAI API error',
          message: error.message,
          status: error.status,
          details: error.type
        },
        { status: error.status || 500 }
      );
    }

    // Handle other known error types
    if (error instanceof TypeError) {
      console.error('[Generate Response API] TypeError:', error.message);
      return NextResponse.json(
        { error: 'Type error occurred', message: error.message },
        { status: 500 }
      );
    }

    console.error('[Generate Response API] Unexpected error:',
      error instanceof Error ? error.message : 'Unknown error',
      error instanceof Error ? error.stack : ''
    );

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        type: error?.constructor?.name || 'UnknownError'
      },
      { status: 500 }
    );
  }
}

/**
 * Simple sentiment analysis helper
 * This provides a basic sentiment classification for UI purposes
 */
function analyzeSentiment(review: string): 'positive' | 'negative' | 'mixed' {
  const lowerReview = review.toLowerCase();

  // Negative indicators
  const negativeWords = [
    'terrible', 'awful', 'horrible', 'worst', 'bad', 'poor',
    'disappointed', 'disappointing', 'rude', 'unprofessional',
    'never', 'not recommend', 'waste', 'avoid', 'disgusting'
  ];

  // Positive indicators
  const positiveWords = [
    'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
    'love', 'best', 'perfect', 'awesome', 'outstanding',
    'recommend', 'highly', 'definitely', 'impressed'
  ];

  // Mixed indicators
  const mixedWords = [
    'but', 'however', 'though', 'although', 'decent', 'okay',
    'could be better', 'some issues', 'mostly'
  ];

  const negativeCount = negativeWords.filter(word => lowerReview.includes(word)).length;
  const positiveCount = positiveWords.filter(word => lowerReview.includes(word)).length;
  const mixedCount = mixedWords.filter(word => lowerReview.includes(word)).length;

  if (mixedCount > 0 || (positiveCount > 0 && negativeCount > 0)) {
    return 'mixed';
  }

  if (negativeCount > positiveCount) {
    return 'negative';
  }

  if (positiveCount > 0) {
    return 'positive';
  }

  // Default to mixed if unclear
  return 'mixed';
}
