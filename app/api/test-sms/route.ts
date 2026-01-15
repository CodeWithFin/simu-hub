import { NextRequest, NextResponse } from 'next/server'
import { sendSMS } from '@/app/lib/sms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, message } = body
    
    if (!phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Phone and message required' },
        { status: 400 }
      )
    }
    
    console.log('Testing SMS to:', phone)
    const result = await sendSMS(phone, message)
    
    return NextResponse.json({
      success: result.success,
      data: result.data,
      error: result.error
    })
  } catch (error: any) {
    console.error('Test SMS error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
