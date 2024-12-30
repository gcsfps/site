import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map()

export function rateLimiter(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const now = Date.now()
  const windowStart = now - 60000 // 1 minuto
  
  const requestCount = rateLimit.get(ip) ?? []
  const requestsInWindow = requestCount.filter(timestamp => timestamp > windowStart)
  
  if (requestsInWindow.length >= 100) { // limite de 100 requisições por minuto
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  
  requestsInWindow.push(now)
  rateLimit.set(ip, requestsInWindow)
  
  return NextResponse.next()
}
