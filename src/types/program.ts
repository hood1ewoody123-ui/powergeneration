export interface ProgramStat {
  id: string
  label: string
  value: string
  suffix?: string
  valueTone?: 'green' | 'red' | 'white'
  delta?: string
}

export interface ProgramRoom {
  id: string
  name: string
  capacity: string
  note: string
  image: string
}

export interface ProgramModalContent {
  title: string
  intro: string
  bullets?: string[]
  rooms?: ProgramRoom[]
  scheduleDays?: ProgramScheduleDay[]
}

export interface ProgramScheduleDay {
  day: string
  focus: string
  items: string[]
}

export interface ProgramPillar {
  id: string
  title: string
  tag: string
  summary: string
  icon: 'bed' | 'calendar' | 'dumbbell'
  modal?: ProgramModalContent
  highlights?: string[]
}

export interface ProgramScheduleLine {
  time: string
  label: string
  tone?: 'ok' | 'warn' | 'err' | 'muted'
}

export interface ProgramReview {
  id: string
  name: string
  city: string
  year: string
  text: string
  rating: number
}
