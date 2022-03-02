import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from 'utils/env';
import {ServerEvent, ClientEvent} from 'types';
import { htmlToText } from 'html-to-text';
import { DateTime } from 'luxon';

const fetchSessions = (editData: any, allSessions: any) => {
  const keys = Object.keys(editData);
  let sessions: any[] = [];
  keys.forEach((k) => {
    if (k.startsWith("date-")) {
      let pieces = k.split("-");
      let id = pieces[2];
      let old = allSessions.find((o: any) => {
        console.log({
          id: o.id,
          curr: id
        })
        return o.id.toString() === id
      }) ?? {id};
      console.log(old)
      console.log(allSessions.find((o: any) => o.id === id))
      let session = sessions.find((o) => o.id === id) ?? old;

      switch(pieces[1]) {
        case 'start':
          //@ts-ignore
          Object.assign(session, {startDateTime: editData[k]})
          break;
        case 'end':
          //@ts-ignore
          Object.assign(session, {endDateTime: editData[k]})
          break;
        default:
          break;
      }
      if (!sessions.find((o) => o.id === id)) sessions.push(session);
    }
  })
  console.log(sessions);
  return sessions;
}

const fromClientToServerEvent = (e: ClientEvent): ServerEvent[] => {
  const serverEvents: ServerEvent[] | undefined = e.sessions?.map((session) => {
    if (
      !e.title
      || !e.location
      || !session.startDateTime
      || !session.endDateTime
    ) {
      console.log({
        title: e.title,
        sessionStartDateTime: session.startDateTime,
        sessionEndDateTime: session.endDateTime
      })
      throw new Error("check fields");
    }
    return {
        id: session.id,
        title: e.title,
        descriptionHtml: e.descriptionHtml ?? "",
        descriptionText: htmlToText(e.descriptionHtml ?? ""),
        location: e.location,
        startDateTime: session.startDateTime,
        endDateTime: session.endDateTime,
      }
    }
  )
  return serverEvents ?? [];
}

export default async function updateEvents (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    magic,
    ts,
    hash,
    data: editData
  } = req.body;
  console.log(editData);
  const sessions = fetchSessions(editData, editData.allSessions);
  sessions.forEach((session) => {
    if (DateTime.fromISO(session.startDateTime) > DateTime.fromISO(session.endDateTime)) {
      throw new Error ("Error in dates/times");
    }
  })
  let toSubmit;
  if (sessions.length > 0) {
    toSubmit = fromClientToServerEvent({
      title: editData.title,
      description: editData.description,
      location: editData.location,
      descriptionHtml: editData.descriptionHtml,
      descriptionText: editData.descriptionText,
      sessions
    })
  }
  if (editData.allSessions.length > 0) {
    toSubmit = fromClientToServerEvent({
      title: editData.title,
      description: editData.description,
      location: editData.location,
      descriptionHtml: editData.descriptionHtml,
      descriptionText: editData.descriptionText,
      sessions: editData.allSessions
    })
  }
  const r = (await (await fetch(`${serverUrl}/edit/${hash}`, {
    method: 'POST',
    body: JSON.stringify({
      ts,
      magic,
      data: JSON.stringify(toSubmit)
    }),
    headers: { 'Content-type': 'application/json' },
  })).json());
  console.log(r);
  return res.status(200).json({ r });
}
