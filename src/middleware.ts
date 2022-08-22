import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.cookies.get('userCookie')) return;

  const random = Math.random().toString();
  console.log('Request cookies', req.cookies);

  const res = NextResponse.next();
  res.cookies.set('userCookie', random, { sameSite: 'strict' });

  return res;
}
