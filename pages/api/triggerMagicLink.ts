import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from '../../utils/env';
import {ServerEvent, ClientEvent, Session} from '../../types';

export default async function getEvent(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const eventHash = req.body['eventHash'];
  if (!eventHash) {
    return res.status(500).send('error');
  }
  await fetch(`${serverUrl}/magic/${eventHash}`);
  res.status(200).json({edit: "ok"});
}
