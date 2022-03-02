import { DatePickerField } from "./eventDateTime";
import { Session as ClientSession } from 'types';
import { useState, useEffect, ReactElement } from "react";
import { isPast, getDateTimeString } from 'utils';
import { DateTime } from "luxon";

export const EditSessions = ({sessions}: {sessions: ClientSession[]}) => {
  const [sortedSessions, setSortedSessions] = useState<ClientSession[]>(sessions);
  useEffect(() => {
    const activeSessions:ClientSession[] = [];
    const inactiveSessions:ClientSession[] = [];
    sessions.forEach((s) => {
      const active = ((s.noLimit) &&
      !isPast(s.startDateTime!)) ||
      ((s.availableSeats! > 0) &&
        !isPast(s.startDateTime!));

      if (active) activeSessions.push(s);
      if (!active) inactiveSessions.push(s);
    });
    setSortedSessions([...activeSessions, ...inactiveSessions]);
  }, [sessions]);
  return(
    <div>
      {
        sortedSessions.map((session) => {
          let element: ReactElement;
          if (isPast(session.startDateTime!)) {
            element =
            <div key={session.id}>
              {
                getDateTimeString(session.startDateTime!, 'date')
                + ', '
                + getDateTimeString(session.startDateTime!, 'time')
              }
            </div>
          } else {
            element =
            <div key={session.id} className="pb-4">
              <DatePickerField
                name={ `date-start-${session.id}` }
                value={
                  DateTime.fromISO(session.startDateTime!).toJSDate()
                }
              />
              <DatePickerField
                name={ `date-end-${session.id}` }
                value={
                  DateTime.fromISO(session.endDateTime!).toJSDate()
                }
              />
            </div>
          }
          return element;
          }
        )
      }
    </div>
  )
}