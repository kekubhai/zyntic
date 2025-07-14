import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_SECRET_KEY || '');

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 400 });
  }

  const { type, data } = evt;

  if (type === 'user.created') {
    const { id, email_addresses, first_name, last_name, profile_image_url } = data;

    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address,
          firstName: first_name,
          lastName: last_name,
          imageUrl: profile_image_url,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Webhook received' });
}
