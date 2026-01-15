# SMS Debugging Report

## Current Issue
**Error:** Invalid short code (status_code: 1001)
**Date:** 2026-01-15

## Problem
Tilil API is rejecting the sender ID/shortcode. This means the shortcode is not registered with Tilil.

## What We've Tried
1. ✅ API endpoint: `https://api.tililtech.com/sms/v3/sendsms` (correct)
2. ✅ Phone number format: `+254746551520` (correct)
3. ✅ API authentication: Trying multiple methods (Bearer, x-api-key, body)
4. ❌ Sender ID: `SISCOM TECH`, `SISCOMTECH`, `SIMUHUB` (all rejected)

## API Key Status
- Error code `1013` = Invalid API Key
- Error code `1001` = Invalid short code
- Success code = `1000` or `200`

## Next Steps

### Option 1: Get Valid Sender ID from Tilil (RECOMMENDED)
1. Log into your Tilil dashboard: https://tililtech.com
2. Go to "Sender IDs" or "Shortcodes" section
3. Check which sender IDs are approved/active for your account
4. Use one of those approved sender IDs in `.env.local`

### Option 2: Register a New Sender ID
1. Contact Tilil support or use their dashboard
2. Register "SIMUHUB" or your preferred sender name
3. Wait for approval (can take 1-3 business days)
4. Update `.env.local` with the approved sender ID

### Option 3: Use Default/Generic Sender ID
Some providers allow generic sender IDs like:
- `TILILSMS`
- `INFO`
- Or the shortcode provided by Tilil

Check with Tilil what default sender ID is available.

## How to Update

1. Find your approved sender ID from Tilil dashboard
2. Update `.env.local`:
   ```env
   TILIL_SHORTCODE=YOUR_APPROVED_SENDER_ID
   TILIL_SENDER_ID=YOUR_APPROVED_SENDER_ID
   ```
3. Restart the dev server
4. Test again

## Testing Command
```bash
curl -X POST http://localhost:3000/api/test-sms \
  -H "Content-Type: application/json" \
  -d '{"phone": "+254746551520", "message": "Test SMS"}'
```

## Contact Tilil Support
- Website: https://tililtech.com
- Check their documentation for approved sender ID list
- Contact support to verify which sender IDs are active on your account
