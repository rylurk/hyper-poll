import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export function middleware(req: NextRequest) {
  if (req.cookies.get('poll-token')) return;

  const random = nanoid();
  console.log('Request cookies', req.cookies);

  const res = NextResponse.next();
  res.cookies.set('poll-token', random, { sameSite: 'strict' });

  return res;
}
