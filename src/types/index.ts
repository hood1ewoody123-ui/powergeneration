export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type BattleCategory = 'solo' | '2vs2' | 'crew'

export type FaqTag = 'general' | 'program' | 'housing' | 'payment'

export interface FaqItem {
  id: string
  question: string
  answer: string
  tag: FaqTag
}

export type GuestFigureKind = 'freeze' | 'portrait'

export interface GuestFigureAsset {
  src: string
  kind: GuestFigureKind
  glow?: boolean
  /** Множитель размера: 1.2 = +20%, 0.7 = −30% */
  scale?: number
  /** Сдвиг по X в % от ширины фигуры (− = влево) */
  offsetX?: number
  /** Сдвиг по Y в % от высоты фигуры (+ = вниз) */
  offsetY?: number
  /** Доп. множитель размера только в мобильном слоте (0.7 = −30%) */
  mobileScale?: number
  /** Сдвиг X только в мобильном слоте */
  mobileOffsetX?: number
}

export interface GuestShowcaseItem {
  id: string
  lines: readonly [string] | readonly [string, string]
  left: GuestFigureAsset
  right: GuestFigureAsset
}
