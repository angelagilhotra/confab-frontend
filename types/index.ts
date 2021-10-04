export type ClientInputSession = {
  date?: number
  month?: number
  year?: number
  time?: number[]
  count?:number
}

export type ClientInputEvent = {
  title?: string,
  descriptionText?: string,
  descriptionHtml?: string,
  eventType: number,
  location?: string,
  proposerName?: string,
  proposerEmail?: string
  timezone?:string
  limit?: number
}

export type Session = {
  id?:number
  startDateTime?: string
  availableSeats?: number
  totalSeats?: number
  noLimit?: boolean
}

export type ClientEvent = {
  title?: string,
  description?: string,
  type?: string,
  proposerName?: string,
  sessionCount?: number,
  sessions?: Session[]
}

export type ServerEvent = {
  id?: number
  title: string
  descriptionText: string | null
  descriptionHtml: string | null
  location: string
  series: boolean
  proposerEmail: string
  proposerName?: string
  startDateTime: string
  endDateTime: string
  hash?: string
  limit: number
  typeId: number
  postOnSlack?: boolean
  slackChannel?: string
  createGcalEvent?: boolean
  gcalCalendar?: string
  proposer?: {
    email: string
    username: string | null
    firstName: string | null
    lastName: string | null
    block: number | null
    sendReminders: boolean | null
  }
  type?: {
    id: number
    type: string
    emoji: string
  }
  RSVP?: {
    eventId: number
    attendees: string[]
  }[]
}
