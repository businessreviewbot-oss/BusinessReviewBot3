# BusinessReviewBot - Setup Guide

## Overview
BusinessReviewBot is now fully integrated with OpenAI's API to generate professional, empathetic review responses optimized for local SEO.

## Current Status
✅ OpenAI API integration complete and functional
✅ Environment variables configured
✅ Magic Response Generator connected to real API
✅ Build successful
✅ Development server running on port 3000

## What's Working

### 1. AI Response Generation
- **Endpoint**: `/api/generate-response`
- **Model**: GPT-4o-mini (fast and cost-effective)
- **Features**:
  - Professional, empathetic responses
  - Sentiment analysis (positive, negative, mixed)
  - SEO-optimized content
  - Context-aware responses
  - Typewriter effect in UI

### 2. Environment Configuration
- OpenAI API key: ✅ Configured
- Google Client ID: ✅ Configured
- Stripe: ⏳ Ready for configuration (skeleton in place)

## Environment Variables

The following environment variables are configured in `.env.local`:

```
OPENAI_API_KEY=sk-proj-sydx1hj-... (configured)
GOOGLE_CLIENT_ID=820438343045-... (configured)
```

For production deployment, copy `.env.local.example` and add your keys.

## API Endpoints

### POST /api/generate-response
Generates AI-powered responses to customer reviews.

**Request Body**:
```json
{
  "review": "Customer review text",
  "businessName": "Optional business name",
  "businessType": "Optional business type"
}
```

**Response**:
```json
{
  "response": "Generated professional response",
  "sentiment": "positive|negative|mixed",
  "tokensUsed": 123
}
```

**Error Responses**:
- `400`: Missing or invalid review text
- `500`: OpenAI API error or server error

### POST /api/checkout
Stripe checkout endpoint (ready for integration).

**Status**: Skeleton implemented, needs Stripe Secret Key to be fully functional.

## Next Steps for Production

### 1. Stripe Integration (Optional)
To enable payment processing:

1. Get your Stripe keys from https://dashboard.stripe.com/apikeys
2. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```
3. Uncomment the Stripe integration code in `/app/api/checkout/route.ts`
4. Set up webhook handler at `/api/webhooks/stripe`

### 2. Google OAuth (Optional)
If implementing Google Sign-In:

1. Add `GOOGLE_CLIENT_SECRET` to `.env.local`
2. Implement OAuth flow in your authentication logic

### 3. Production Deployment

**Environment Variables to Set**:
- `OPENAI_API_KEY` (required)
- `GOOGLE_CLIENT_ID` (if using OAuth)
- `GOOGLE_CLIENT_SECRET` (if using OAuth)
- `STRIPE_SECRET_KEY` (if using payments)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (if using payments)
- `STRIPE_WEBHOOK_SECRET` (if using payments)
- `NEXT_PUBLIC_APP_URL` (your production URL)

**Deploy to Vercel**:
```bash
npm install -g vercel
vercel --prod
```

Add environment variables in Vercel dashboard under Settings > Environment Variables.

## Testing the Integration

1. Open http://localhost:3000
2. Scroll to the "Magic Response Generator" section
3. Click any "Sample" button or paste your own review
4. Click "Generate Response"
5. Watch the AI generate a professional response in real-time

## Cost Optimization

The API uses **GPT-4o-mini** which is highly cost-effective:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- Average response: ~200-300 tokens
- Cost per response: ~$0.0002-0.0003

For higher quality responses, you can switch to `gpt-4o` in `/app/api/generate-response/route.ts` (line 65).

## Security Notes

1. ✅ API keys are in `.env.local` (gitignored)
2. ✅ `.env.local.example` provided for reference (no actual keys)
3. ✅ Server-side API calls only (keys never exposed to client)
4. ⚠️ Remember to rotate API keys if they're ever exposed

## Troubleshooting

### "OpenAI API key not configured" error
- Ensure `.env.local` exists in the root directory
- Verify `OPENAI_API_KEY` is set correctly
- Restart the dev server: `npm run dev`

### Build failures
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run build`

### API timeout errors
- OpenAI API can take 2-5 seconds for responses
- Frontend shows loading state during this time
- Consider implementing streaming for faster perceived performance

## File Structure

```
app/
├── api/
│   ├── checkout/route.ts          # Stripe checkout (skeleton)
│   └── generate-response/route.ts # AI response generation (active)
├── page.tsx                        # Main landing page
components/
└── MagicResponseGenerator.tsx     # AI demo component (connected)
.env.local                          # Your environment variables (gitignored)
.env.local.example                  # Template for environment variables
```

## Support

For issues or questions:
1. Check the API logs in the terminal
2. Verify environment variables are set correctly
3. Test the API endpoint directly using curl or Postman
4. Check OpenAI API status: https://status.openai.com/

---

**Status**: ✅ Production Ready (AI functionality)
**Last Updated**: February 10, 2026
