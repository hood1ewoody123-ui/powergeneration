import { ASSETS } from '@/lib/assets'
import type { ArchiveShift, FaqItem, GuestShowcaseItem } from '@/types'

export const CAMP_NAME = 'Power Generation Camp'
export const CAMP_TAGLINE = 'Breaking camp · cybercore edition'

export const NAV_LINKS = [
  { href: '#about', label: 'лагерь' },
  { href: '#guests', label: 'гости' },
  { href: '#pricing', label: 'цены' },
] as const

export const HERO_CONTENT = {
  title: 'Power Generation Camp',
  description: 'Лагерь по брейкингу · июль 2025',
  cta: { label: 'Занять место', href: '#register' },
  ctaSecondary: { label: 'Гости', href: '#guests' },
} as const

export const ABOUT_INTRO = {
  paragraphs: [
    'С 27 июля по 3 августа участников ждут две ежедневные тренировки в оборудованном зале, мастер-классы от секретных зарубежных гостей, а также вечерние баттлы и стриты на центральной улице Казани. В стоимость включены проживание в комфортных номерах и 4-разовое питание, благодаря чему дети постоянно находятся в плотном коннекте и под присмотром тренеров.',
    'Кульминацией программы станет открытый фестиваль по брейкингу, который пройдет 2 августа. Победители в номинации 2х2 получат главный приз — путевку во Францию на легендарный международный чемпионат PESSAC BATTLE ARENA в Бордо.',
  ],
} as const

export const GUEST_SHOWCASE = [
  {
    id: 'dias',
    lines: ['DIAS', 'PREDATORZ'],
    left: { src: ASSETS.guests.diasFreeze, glow: true },
    right: { src: ASSETS.guests.dias, glow: true, mobileScale: 0.7 },
  },
  {
    id: 'gekkon',
    lines: ['GEKKON', 'PREDATORZ'],
    left: { src: ASSETS.guests.gekkon, glow: true, mobileOffsetX: -22 },
    right: { src: ASSETS.guests.gekkonFreeze, glow: true },
  },
  {
    id: 'tiger',
    lines: ['TIGER', 'PREDATORZ'],
    left: { src: ASSETS.guests.tigerFreeze, glow: true, scale: 1.2, offsetY: 30 },
    right: {
      src: ASSETS.guests.tiger,
      glow: true,
      offsetX: -30,
      mobileScale: 0.7,
      mobileOffsetX: -18,
    },
  },
  {
    id: 'explosion',
    lines: ['EXPLOSION'],
    left: { src: ASSETS.guests.explosion, glow: true, scale: 0.77 },
    right: {
      src: ASSETS.guests.explosionFreeze,
      glow: true,
      scale: 0.77,
      offsetX: -15,
    },
  },
  {
    id: 'joker',
    lines: ['JOKER', 'GREEN PANDA'],
    left: {
      src: ASSETS.guests.jokerFreeze,
      glow: true,
      scale: 1.2,
      offsetX: -15,
      offsetY: 15,
    },
    right: {
      src: ASSETS.guests.joker,
      glow: true,
      offsetY: 20,
      mobileScale: 0.7,
    },
  },
] as const satisfies readonly GuestShowcaseItem[]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Кто может участвовать?',
    answer:
      'Любой уровень: от beginner до advanced. Главное — мотивация и готовность тренироваться.',
  },
  {
    id: 'faq-2',
    question: 'Что взять с собой?',
    answer: 'Удобную одежду, сменку, бутылку воды и хорошее настроение.',
  },
]

export const ARCHIVE_SHIFTS: ArchiveShift[] = [
  {
    id: 'shift-2024',
    year: '2024',
    title: 'PGC · Vol. 3',
    cover: ASSETS.deskMuta,
  },
  {
    id: 'shift-2023',
    year: '2023',
    title: 'PGC · Vol. 2',
    cover: ASSETS.deskMuta,
  },
]

export const HERO_VIDEO = {
  desktop: ASSETS.video.mainDesk,
  mobile: ASSETS.video.mainMob,
  posterDesktop: ASSETS.video.posters.mainDesk,
  posterMobile: ASSETS.video.posters.mainMob,
} as const

export const BATTLE_VIDEO = {
  src: ASSETS.video.battle,
  poster: ASSETS.video.posters.battle,
} as const

export const SECTION_SHELL =
  'mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-10' as const
