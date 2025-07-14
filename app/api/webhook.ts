import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_SECRET_KEY || '');

  const headersObject = {
    'webhook-id': Array.isArray(headers['webhook-id']) ? headers['webhook-id'].join(',') : headers['webhook-id'] || '',
    'webhook-timestamp': Array.isArray(headers['webhook-timestamp']) ? headers['webhook-timestamp'].join(',') : headers['webhook-timestamp'] || '',
    'webhook-signature': Array.isArray(headers['webhook-signature']) ? headers['webhook-signature'].join(',') : headers['webhook-signature'] || '',
  };

  let evt: { type: string; data: any };
  try {
    evt = wh.verify(payload, headersObject) as { type: string; data: any };
  } catch (err) {
    return res.status(400).json({ message: 'Invalid webhook signature' });
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
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  res.status(200).json({ message: 'Webhook received' });
};

export default handler;
