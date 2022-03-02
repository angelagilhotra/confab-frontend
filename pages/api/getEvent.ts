import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from '../../utils/env';
import {ServerEvent, ClientEvent, Session} from '../../types';

const prepareSessions = (e: ServerEvent[]): Session[] => {
  const sessions: Session[] = [];
  for (let i = 0; i < e.length; i ++) {
    const limit = e[i].limit!;
    const rsvpArray = e[i].RSVP![0] ? e[i].RSVP![0] : {attendees: []};
    const availableSeats = ((limit - rsvpArray.attendees.length) > 0) ? (limit - rsvpArray.attendees.length) : 0;
    const noLimit = (e[i].limit == 0);
    sessions.push({
      id: e[i].id,
      startDateTime: e[i].startDateTime,
      endDateTime: e[i].endDateTime,
      availableSeats,
      totalSeats: e[i].limit,
      noLimit,
    });
  }
  return sessions;
};

const prepareResponse = (e: ServerEvent[]): ClientEvent => {
  const firstInSeries = e[0];
  return {
    title: firstInSeries.title,
    description: firstInSeries.descriptionHtml ? firstInSeries.descriptionHtml : (firstInSeries.descriptionText ? firstInSeries.descriptionText : 'No description provided'),
    proposerName: firstInSeries.proposer!.firstName ? firstInSeries.proposer!.firstName : 'Anonymous',
    sessionCount: e.length,
    sessions: prepareSessions(e),
    type: firstInSeries.type!.type,
    location: firstInSeries.location,
  };
};

export default async function getEvent(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const event = req.body['event'];
  let r: ServerEvent[];
  let eventDetails: ClientEvent = {};
  if (event) {
    r = (await (await fetch(`${serverUrl}/event/${req.body.event}`, {
      method: 'GET',
    })).json()).data;
    eventDetails = prepareResponse(r);
  }
  res.status(200).json({data: eventDetails});
}
