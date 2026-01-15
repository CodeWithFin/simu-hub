import { supabase } from './supabase'

export const sendSMS = async (to: string, message: string, orderId?: string) => {
  try {
    // Tilil API configuration
    const smsUrl = process.env.SMS_ENDPOINT || process.env.TILIL_SMS_URL || 'https://api.tililtech.com/sms/v3/sendsms'
    const apiKey = process.env.TILIL_API_KEY
    const shortcode = process.env.TILIL_SHORTCODE || process.env.TILIL_SENDER_ID || 'SIMUHUB'
    
    if (!apiKey) {
      console.warn('Tilil API key not configured. SMS not sent.')
      console.warn('Required: TILIL_API_KEY')
      return { success: false, error: 'SMS service not configured' }
    }
    
    // Format phone number - Tilil accepts multiple formats
    // Remove + prefix if present (Tilil accepts local or international without +)
    const formattedPhone = to.replace(/\s+/g, '').replace(/^\+/, '')
    
    console.log('Sending SMS via Tilil to:', formattedPhone)
    console.log('Using endpoint:', smsUrl)
    console.log('Using shortcode:', shortcode)
    
    // Tilil API v3 request format (from official documentation)
    const requestBody = {
      api_key: apiKey,
      service: 0,                    // 0 = bulk SMS service
      mobile: formattedPhone,        // recipient phone number
      response_type: "json",         // response format
      shortcode: shortcode,          // sender ID/name
      message: message               // SMS content
    }
    
    console.log('Tilil SMS Request:', JSON.stringify({
      ...requestBody,
      api_key: `${apiKey.substring(0, 10)}...`,
      message: `${message.substring(0, 50)}...`
    }, null, 2))
    
    const response = await fetch(smsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    
    const result = await response.json()
    
    console.log('Tilil SMS response status:', response.status)
    console.log('Tilil SMS response:', JSON.stringify(result, null, 2))

    // Tilil returns an array of results (even for single SMS)
    const responseData = Array.isArray(result) ? result[0] : result
    
    // Check for error status codes
    // 1000 or 1 = Success
    // 1001 = Invalid sender name/shortcode
    // 1003 = Invalid mobile number
    // 1004 = Insufficient credits
    // 1006 = Invalid credentials/API key
    // 1013 = Invalid API key
    if (responseData && responseData.status_code && 
        responseData.status_code !== '1000' && 
        responseData.status_code !== '1' &&
        responseData.status_code !== 1000 &&
        responseData.status_code !== 1) {
      
      const errorMsg = responseData.status_desc || 'SMS sending failed'
      console.error('❌ Tilil SMS error:', errorMsg)
      console.error('Status code:', responseData.status_code)
      console.error('Full response:', responseData)
      
      // Provide helpful error messages
      if (responseData.status_code === '1001') {
        console.error('⚠️  SENDER ID ERROR: The shortcode/sender ID is not registered with Tilil')
        console.error('💡 Solution: Log into your Tilil dashboard and verify your approved sender IDs')
        console.error('Current shortcode:', shortcode)
      } else if (responseData.status_code === '1006' || responseData.status_code === '1013') {
        console.error('⚠️  API KEY ERROR: The API key is invalid or expired')
        console.error('💡 Solution: Verify your TILIL_API_KEY in .env.local')
      } else if (responseData.status_code === '1003') {
        console.error('⚠️  PHONE NUMBER ERROR: Invalid mobile number format')
        console.error('Current number:', formattedPhone)
      } else if (responseData.status_code === '1004') {
        console.error('⚠️  CREDIT ERROR: Insufficient SMS credits')
        console.error('💡 Solution: Top up your Tilil account')
      }
      
      // Log failed SMS to database
      if (orderId) {
        await supabase.from('sms_logs').insert({
          order_id: orderId,
          recipient_phone: to,
          message_type: 'notification',
          message_content: message,
          status: 'failed',
          response: JSON.stringify(result)
        })
      }
      
      return { success: false, error: errorMsg }
    }

    // Check HTTP status
    if (!response.ok) {
      console.error('❌ Tilil SMS HTTP error:', result)
      
      // Log failed SMS
      if (orderId) {
        await supabase.from('sms_logs').insert({
          order_id: orderId,
          recipient_phone: to,
          message_type: 'notification',
          message_content: message,
          status: 'failed',
          response: JSON.stringify(result)
        })
      }
      
      return { success: false, error: result.message || 'SMS sending failed' }
    }
    
    // Success!
    console.log('✅ SMS sent successfully!')
    console.log('Message ID:', responseData.message_id)
    console.log('Credit balance:', responseData.credit_balance)
    
    // Log successful SMS to database
    if (orderId) {
      await supabase.from('sms_logs').insert({
        order_id: orderId,
        recipient_phone: to,
        message_type: 'notification',
        message_content: message,
        status: 'sent',
        sent_at: new Date().toISOString(),
        response: JSON.stringify(result)
      })
    }
    
    return { success: true, data: result }
  } catch (error: any) {
    console.error('❌ SMS sending exception:', error)
    
    // Log failed SMS
    if (orderId) {
      await supabase.from('sms_logs').insert({
        order_id: orderId,
        recipient_phone: to,
        message_type: 'notification',
        message_content: message,
        status: 'failed',
        response: JSON.stringify({ error: error.message })
      })
    }
    
    return { success: false, error: error.message }
  }
}
