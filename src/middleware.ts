import { NextResponse } from 'next/server'

export default function middleware() {
  // Store the response so we can modify its headers
  const response = NextResponse.next()

  // Set custom header
  response.headers.set('x-robots-tag', 'index')

  // Return response
  return response
}