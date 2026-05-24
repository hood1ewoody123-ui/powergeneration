import { ASSETS } from '@/lib/assets'
import type { FaqItem, GuestShowcaseItem } from '@/types'

export const CAMP_NAME = 'Power Generation Camp'
export const CAMP_TAGLINE = 'Breaking camp · cybercore edition'

export const NAV_LINKS = [
  { href: '#about', label: 'лагерь' },
  { href: '#guests', label: 'гости' },
  { href: '#program', label: 'программа' },
  { href: '#pricing', label: 'цены' },
] as const

export const HERO_CONTENT = {
  title: 'Power Generation Camp',
} as const

export const MUTA_BORN_BATTLE = {
  href: '/muta-born-battle',
  label: 'mutaborn battle',
} as const

export const NAV_CTA_REGISTER = {
  href: '/#register',
  label: 'Занять место',
} as const

/** Единые заголовки секций (как faq — display, green, lowercase) */
export const SECTION_TITLES = {
  registration: 'registration',
  program: 'ptogramm',
  feedback: 'feedback',
  photo: 'photo',
  tickets: 'tickets',
  faq: 'faq',
} as const

/** Подпись под заголовком заявки — стиль имён гостей */
export const REGISTER_META =
  '27 июл — 3 авг · казань' as const

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
    left: { src: ASSETS.guests.diasFreeze, kind: 'freeze', glow: true },
    right: { src: ASSETS.guests.dias, kind: 'portrait', glow: true, mobileScale: 0.7 },
  },
  {
    id: 'gekkon',
    lines: ['GEKKON', 'PREDATORZ'],
    left: { src: ASSETS.guests.gekkon, kind: 'portrait', glow: true, mobileOffsetX: -22 },
    right: { src: ASSETS.guests.gekkonFreeze, kind: 'freeze', glow: true },
  },
  {
    id: 'tiger',
    lines: ['TIGER', 'PREDATORZ'],
    left: { src: ASSETS.guests.tigerFreeze, kind: 'freeze', glow: true, scale: 1.2, offsetY: 30 },
    right: {
      src: ASSETS.guests.tiger,
      kind: 'portrait',
      glow: true,
      offsetX: -30,
      mobileScale: 0.7,
      mobileOffsetX: -18,
    },
  },
  {
    id: 'explosion',
    lines: ['EXPLOSION'],
    left: { src: ASSETS.guests.explosion, kind: 'portrait', glow: true, scale: 0.77 },
    right: {
      src: ASSETS.guests.explosionFreeze,
      kind: 'freeze',
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
      kind: 'freeze',
      glow: true,
      scale: 1.2,
      offsetX: -15,
      offsetY: 15,
    },
    right: {
      src: ASSETS.guests.joker,
      kind: 'portrait',
      glow: true,
      offsetY: 20,
      mobileScale: 0.7,
    },
  },
] as const satisfies readonly GuestShowcaseItem[]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    tag: 'general',
    question: 'Кто может участвовать?',
    answer:
      'Участники 14–35 лет любого уровня: от начинающих до продвинутых. Главное — мотивация, дисциплина на тренировках и уважение к формату лагеря.',
  },
  {
    id: 'faq-2',
    tag: 'program',
    question: 'Что входит в программу?',
    answer:
      'Две тренировки в день в зале, мастер-классы от гостей, вечерние баттлы и стриты, финальный фестиваль 2 августа. Проживание и 4-разовое питание включены в пакет смены.',
  },
  {
    id: 'faq-3',
    tag: 'housing',
    question: 'Где проходит лагерь?',
    answer:
      'Казань, спортивно-оздоровительный комплекс: зал, столовая и жилой блок на одной территории. Точный адрес и схему проезда вышлем после подтверждения заявки.',
  },
  {
    id: 'faq-4',
    tag: 'housing',
    question: 'Как устроено проживание?',
    answer:
      'Номера на 2–4 человека с душем и кондиционером. Постельное бельё и полотенца включены. Тренеры и кураторы на связи круглосуточно.',
  },
  {
    id: 'faq-5',
    tag: 'payment',
    question: 'Как оплатить участие?',
    answer:
      'После заявки менеджер свяжется с вами, подтвердит слот и вышлет реквизиты. Бронь фиксируется после предоплаты — размер и сроки сообщаем индивидуально.',
  },
  {
    id: 'faq-6',
    tag: 'payment',
    question: 'Можно ли вернуть оплату?',
    answer:
      'При отказе более чем за 30 дней до начала смены — полный возврат за вычетом комиссии платёжной системы. Позже — по правилам оферты, которую пришлём при бронировании.',
  },
  {
    id: 'faq-7',
    tag: 'program',
    question: 'Нужен ли опыт для баттла на фестивале?',
    answer:
      'Фестиваль 2 августа — открытое мероприятие с номинациями для разных уровней. Участие в баттле согласуется с тренерами на месте; призы в 2×2 — путёвка на Pessac Battle Arena.',
  },
  {
    id: 'faq-8',
    tag: 'general',
    question: 'Что взять с собой?',
    answer:
      'Удобную спортивную одежду, сменку, кроссовки для зала, бутылку для воды, документы и то, что обычно берёте в поездку. Детальный чек-лист — в письме после регистрации.',
  },
]

export const ARCHIVE_PHOTOS = [
  ASSETS.archive.photo01,
  ASSETS.archive.photo02,
  ASSETS.archive.photo03,
  ASSETS.archive.photo04,
  ASSETS.archive.photo05,
] as const

export const SITE_CONTACTS = {
  phone: '+79120145413',
  phoneHref: 'tel:+79120145413',
  telegramHandle: '@powergenerationcamp',
  telegramHref: 'https://t.me/powergenerationcamp',
} as const

export const LEGAL_LINKS = {
  privacy: { href: '/privacy', label: 'Политика конфиденциальности' },
  offer: { href: '/offer', label: 'Оферта' },
} as const

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
