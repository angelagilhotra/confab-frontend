import { DatePickerField } from "./eventDateTime";
import { Session as ClientSession } from 'types';
import { useState, useEffect, ReactElement } from "react";
import { isPast, getDateTimeString } from 'utils';
import { DateTime } from "luxon";
import FieldLabel from "components/atomic/StrongText";

export const EditSessions = ({sessions}: {sessions: ClientSession[]}) => {
  const [activeSessions, setActiveSessions] = useState<ClientSession[]>(sessions);
  const [inactiveSessions, setInactiveSessions] = useState<ClientSession[]>(sessions);
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
    setActiveSessions([...activeSessions]);
    setInactiveSessions([...inactiveSessions]);
  }, [sessions]);
  return(
    <div>
      <FieldLabel>Upcoming</FieldLabel>
      {
          activeSessions.map((session) => {
            return (
              <div key={session.id} className="pb-4">
              <div className="text-xxs font-primary text-gray-800">Start</div>
                <div className="mb-2">
                <DatePickerField
                  name={ `date-start-${session.id}` }
                  value={
                    DateTime.fromISO(session.startDateTime!).toJSDate()
                  }
                />
                </div>
              <div className="text-xxs font-primary text-gray-800">End</div>
                <div className="mb-2">
                <DatePickerField
                  name={ `date-end-${session.id}` }
                  value={
                    DateTime.fromISO(session.endDateTime!).toJSDate()
                  }
                />
                </div>
              </div>
            )
        })
      }
      <FieldLabel>Past</FieldLabel>
      <div className="text-xxs font-primary text-gray-800">Past sessions are not editable</div>
      {
        inactiveSessions.map((session) => {
          return (
            <div key={session.id}>
              {
                getDateTimeString(session.startDateTime!, 'date')
                + ', '
                + getDateTimeString(session.startDateTime!, 'time')
              }
            </div>
          )
        })
      }
    </div>
  )
}