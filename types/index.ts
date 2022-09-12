export type User = {
  email: string,
  username?: string,
  name?: string,
  block?:string
}

export type ClientInputSession = {
  startDateTime?: string
  endDateTime?: string
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
  postOnSlack?:boolean
}

export type Session = {
  id?:number
  startDateTime?: string
  endDateTime?:string
  availableSeats?: number
  totalSeats?: number
  noLimit?: boolean
}

export type ClientEvent = {
  title?: string,
  description?: string,
  descriptionHtml?:string,
  descriptionText?:string,
  type?: 'Junto' | 'Build Guild',
  proposerName?: string,
  sessionCount?: number,
  location?:string,
  sessions?: Session[],
  totalUniqueRSVPs?: number
}

export type ServerEvent = {
  id?: number
  title: string
  descriptionText: string | null
  descriptionHtml: string | null
  location: string
  series?: boolean
  proposerEmail?: string
  proposerName?: string
  startDateTime: string
  endDateTime: string
  hash?: string
  limit?: number
  typeId?: number
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
    type: 'Junto' | 'Build Guild'
    emoji: string
  }
  RSVP?: {
    eventId: number
    attendees: string[]
  }[] & number
}
