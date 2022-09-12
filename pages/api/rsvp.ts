import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from '../../utils/env';

export default async function rsvp(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const rsvp: {
    name: string,
    email: string,
    events: number[]
  } = req.body['rsvp'];
  let r: boolean = false;
  if (rsvp) {
    r = (await (await fetch(`${serverUrl}/rsvp`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          email: rsvp.email,
          events: rsvp.events,
          name: rsvp.name
        },
      }),
    })).json()).ok;
  }
  res.status(200).json({ok: r});
}
