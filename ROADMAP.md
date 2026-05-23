# POWER GENERATION CAMP — Landing Roadmap
> Cyberpunk minimal · Next.js 15 · Vercel · Breaking Event

---

## PHASE 0 — Инициализация проекта

### 0.1 Scaffold

```bash
pnpm create next-app@latest pgc-landing \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd pgc-landing
```

### 0.2 Зависимости — одна команда

```bash
pnpm add \
  framer-motion \
  lucide-react \
  @studio-freight/lenis \
  zod \
  react-hook-form \
  @hookform/resolvers \
  embla-carousel-react \
  embla-carousel-autoplay \
  next-themes \
  clsx \
  tailwind-merge \
  class-variance-authority \
  @vercel/analytics \
  @vercel/speed-insights

pnpm add -D \
  @types/node \
  prettier \
  prettier-plugin-tailwindcss \
  eslint-config-prettier
```

**Стек — обоснование каждой библиотеки:**

| Библиотека | Зачем |
|---|---|
| `framer-motion` | Анимации секций, hero, карточки гостей, FAQs |
| `lucide-react` | Единая иконочная система из дизайн-системы (tree-shaking) |
| `@studio-freight/lenis` | Плавный скролл — важен для киберпанк-feel |
| `zod` | Валидация схем форм (регистрация + батл) |
| `react-hook-form` + `@hookform/resolvers` | Формы без лишних ре-рендеров |
| `embla-carousel-react` | Слайдеры гостей и архива смен — легковесный |
| `embla-carousel-autoplay` | Автоплей для архивного слайдера |
| `clsx` + `tailwind-merge` | Безопасное склейка классов (cn-утилита) |
| `class-variance-authority` | Варианты компонентов (Button, Badge) |
| `@vercel/analytics` + `speed-insights` | Аналитика и Web Vitals из коробки |

### 0.3 Конфигурация

**`tailwind.config.ts`** — токены из дизайн-системы:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#08090b',
          1: '#0d0f12',
          2: '#111418',
          3: '#181c21',
          4: '#1e232a',
        },
        green: {
          DEFAULT: '#39ff14',
          dim: '#2bcc10',
          10: 'rgba(57,255,20,.10)',
          16: 'rgba(57,255,20,.16)',
          24: 'rgba(57,255,20,.24)',
        },
        red: {
          DEFAULT: '#ff2b2b',
          10: 'rgba(255,43,43,.10)',
          16: 'rgba(255,43,43,.16)',
          24: 'rgba(255,43,43,.24)',
        },
        t: {
          high: 'rgba(255,255,255,.92)',
          mid:  'rgba(255,255,255,.55)',
          low:  'rgba(255,255,255,.28)',
          hint: 'rgba(255,255,255,.14)',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,.07)',
          mid: 'rgba(255,255,255,.12)',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      borderRadius: {
        xs: '3px',
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      animation: {
        'blink': 'blink 2.4s ease-in-out infinite',
        'scan':  'scan 1.8s linear infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.3' } },
        scan:  { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
    },
  },
  plugins: [],
}
export default config
```

**`src/lib/cn.ts`:**
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**`next.config.ts`:**
```ts
import type { NextConfig } from 'next'
const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [], // добавить CDN если нужно
  },
  experimental: {
    optimizeCss: true,
  },
}
export default config
```

**`src/app/layout.tsx`** — подключение шрифтов через `next/font/google`:
```ts
import { Syne, DM_Sans, DM_Mono } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

---

## PHASE 1 — Дизайн-система в коде

### 1.1 Структура папок

```
src/
├── app/
│   ├── layout.tsx          # Root layout, шрифты, провайдеры
│   ├── page.tsx            # Главная — сборка секций
│   ├── globals.css         # CSS-переменные + base styles
│   └── api/
│       ├── register/route.ts   # POST регистрация лагерь
│       └── battle/route.ts     # POST регистрация батл
├── components/
│   ├── ui/                 # Атомарные компоненты DS
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── chip.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── hud-frame.tsx
│   ├── layout/
│   │   ├── nav.tsx
│   │   └── footer.tsx
│   └── sections/           # Секции лендинга
│       ├── hero.tsx
│       ├── about.tsx
│       ├── guests.tsx
│       ├── stats-dashboard.tsx
│       ├── register-form.tsx
│       ├── archive.tsx
│       ├── faq.tsx
│       ├── battle.tsx
│       ├── video-poster.tsx
│       ├── battle-form.tsx
│       └── index.ts
├── lib/
│   ├── cn.ts
│   ├── schemas.ts          # Zod-схемы форм
│   ├── lenis.tsx           # SmoothScroll provider
│   └── constants.ts        # Контент: гости, FAQ, архив
├── hooks/
│   ├── use-in-view.ts      # Intersection для анимаций
│   └── use-embla.ts        # Хук карусели
└── types/
    └── index.ts
```

### 1.2 `globals.css` — CSS custom properties из DS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'DM Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    @apply bg-bg-0 text-t-high font-body;
    -webkit-font-smoothing: antialiased;
  }

  /* Dot grid */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: radial-gradient(circle, rgba(57,255,20,.04) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
    z-index: 0;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { @apply bg-line-mid rounded-full; }

  /* Selection */
  ::selection { background: rgba(57,255,20,.2); color: #39ff14; }
}
```

### 1.3 Компоненты UI

**`button.tsx`** — CVA-варианты:
```ts
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 font-body font-medium transition-all duration-180 whitespace-nowrap disabled:opacity-30 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        fill:         'bg-green text-black border border-green hover:bg-green-dim',
        tonal:        'bg-green-10 text-green border-transparent hover:bg-green-16',
        outline:      'bg-transparent text-green border border-green-24 hover:bg-green-10',
        surface:      'bg-bg-3 text-t-high border border-line hover:bg-bg-4',
        ghost:        'bg-transparent text-t-mid hover:bg-bg-3 hover:text-t-high',
        danger:       'bg-red text-white border border-red hover:opacity-90',
        'danger-tonal': 'bg-red-10 text-red hover:bg-red-16',
      },
      size: {
        sm: 'h-7 px-3 text-xs rounded-xs',
        md: 'h-9 px-5 text-sm rounded-sm',
        lg: 'h-11 px-6 text-sm rounded-sm',
        icon: 'h-9 w-9 rounded-sm',
        'icon-sm': 'h-7 w-7 rounded-xs',
      },
    },
    defaultVariants: { variant: 'fill', size: 'md' },
  }
)
```

### 1.4 Zod-схемы `src/lib/schemas.ts`

```ts
import { z } from 'zod'

export const RegisterSchema = z.object({
  name:     z.string().min(2, 'Минимум 2 символа'),
  city:     z.string().min(2, 'Укажи город'),
  age:      z.coerce.number().min(14).max(35),
  level:    z.enum(['beginner', 'intermediate', 'advanced']),
  phone:    z.string().regex(/^\+?[0-9]{10,15}$/, 'Неверный формат'),
  email:    z.string().email('Неверный email'),
  socials:  z.string().url().optional().or(z.literal('')),
  comment:  z.string().max(500).optional(),
})

export const BattleSchema = z.object({
  name:       z.string().min(2),
  city:       z.string().min(2),
  crew:       z.string().optional(),
  category:   z.enum(['solo', '2vs2', 'crew']),
  phone:      z.string().regex(/^\+?[0-9]{10,15}$/),
  email:      z.string().email(),
  video_link: z.string().url().optional().or(z.literal('')),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type BattleInput   = z.infer<typeof BattleSchema>
```

---

## PHASE 2 — Секции лендинга

### 2.1 NAV
- Sticky, `backdrop-blur`, `bg-bg-0/88`
- Логотип + якорные ссылки
- На мобайле — бургер (Framer drawer снизу)
- Active-секция через `IntersectionObserver`
- CTA-кнопка «Занять место» → `#register`

### 2.2 HERO
**Контент:** название лагеря, даты, локация, tagline, два CTA  
**Технически:**
- Фоновое видео или крупное фото с `object-cover` + `overlay`
- Заголовок — Framer `animate` по словам (stagger)
- Статус-пилюли (`pill-dot` анимация из DS)
- Обратный отсчёт до лагеря (`useEffect` + `setInterval`, SSR-safe через `suppressHydrationWarning`)
- Скролл-индикатор (animated chevron)

```
Узкое место: видео на мобайле — заменять на статик poster,
проверить autoplay policy (muted + playsInline обязательны)
```

### 2.3 ABOUT
**Контент:** 3–4 блока фич лагеря (стиль, уровень, место, команда)  
**Технически:**
- 2-колоночная сетка: текст + фото/медиа
- HUD-frame вокруг ключевой цитаты
- `useInView` → Framer `variants` (slide-up on enter)
- `mono-block` с «программой дня»

### 2.4 GUESTS SLIDER
**Контент:** карточки приглашённых судей/преподавателей (фото, имя, город, стиль)  
**Технически:**
- `embla-carousel` горизонтальный
- Карточка: фото `aspect-[3/4]`, имя, город, бейдж со стилем
- Drag + touch support (встроен в Embla)
- Стрелки навигации — кнопки из DS (`btn-surface btn-icon`)
- `autoplay` с паузой на hover

```
Узкое место: изображения гостей — обязательно next/image с
sizes, placeholder blur. Без этого LCP провалится.
```

### 2.5 STATS DASHBOARD
**Контент:** ключевые цифры лагеря  
**Данные (пример):**
- Участников смен: 500+
- Приглашённых судей: 24
- Дней программы: 7
- Городов-участников: 18
- Лет истории: 5

**Технически:**
- 4–5 stat-карточек из DS (`stat`, `stat-value`, `stat-delta`)
- `useInView` → анимация каунтера (0 → N за 1.2s, `easeOut`)
- Прогресс-бары с анимированным заполнением
- Status-bar внизу: «Регистрация открыта» с `badge-dot` зелёным

### 2.6 REGISTER FORM
**Контент:** форма записи в лагерь  
**Поля:** имя, город, возраст, уровень, телефон, email, соцсети, комментарий  
**Технически:**
- `react-hook-form` + `zodResolver(RegisterSchema)`
- Инлайн-валидация `onBlur` + submit
- API route `POST /api/register` → сохранение в Google Sheets или Notion через их API (или Resend для email-уведомления)
- Success-state: смена формы на HUD-frame «Заявка принята»
- Error-state: alert из DS
- `loading` состояние кнопки

```
Узкое место: rate limiting на API route — добавить
Vercel Edge middleware или простой IP-check
```

### 2.7 ARCHIVE SLIDER
**Контент:** фото с прошлых смен  
**Технически:**
- Полноширинный Embla с `loop: true`, `autoplay: 3000`
- Overlay с годом + тегами
- Lightbox при клике (простой Framer overlay без доп. библиотек)
- `next/image` с `fill` и `object-cover`

### 2.8 FAQ
**Контент:** 8–12 вопросов по лагерю  
**Технически:**
- Accordion — каждый item: `AnimatePresence` + `motion.div` height анимация
- Без внешних библиотек для аккордеона (только Framer)
- Фильтр по тегам (chips из DS): Общее / Программа / Проживание / Батл

### 2.9 BATTLE BLOCK
**Контент:** анонс батла (название, дата, категории, призы)  
**Технически:**
- HUD-frame акцентный
- Карточки категорий (1vs1, 2vs2, crew) — chip/badge DS
- Таблица призов — `table` из DS
- Countdown до батла (отдельный от hero)
- CTA → `#battle-form`

### 2.10 VIDEO / POSTER
**Контент:** embed видео (YouTube/VK) или афиша  
**Технически:**
- YouTube: `<iframe>` загружается только при клике (Facade pattern)
  → Статик превью `next/image`, кнопка play, затем монтируется iframe
- Это критично для производительности (YouTube iframe = +500KB)
- VK Video — аналогично

```
Узкое место: iframe блокирует TTI.
Facade — обязательно, не обсуждается.
```

### 2.11 BATTLE FORM
- Аналогично Register Form
- API route `POST /api/battle`
- Дополнительные поля: категория, crew name, ссылка на видео
- Те же паттерны валидации

### 2.12 FOOTER
- Логотип + tagline
- Быстрые ссылки (якоря)
- Соцсети (иконки Lucide или SVG)
- Юр. инфо / контакты
- `© 2025 Power Generation Camp`

---

## PHASE 3 — Анимации (Framer Motion)

### Стратегия

```ts
// src/lib/motion-variants.ts

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: .4, ease: [0,0,.2,1] } },
}

export const stagger = {
  show: { transition: { staggerChildren: .08 } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: .96 },
  show:   { opacity: 1, scale: 1, transition: { duration: .35, ease: [.34,1.4,.64,1] } },
}
```

**Паттерн для всех секций:**
```tsx
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-80px' })

<motion.div
  ref={ref}
  variants={fadeUp}
  initial="hidden"
  animate={inView ? 'show' : 'hidden'}
>
```

### Lenis (smooth scroll)

```tsx
// src/lib/lenis.tsx
'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - 2**(-10*t)) })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

---

## PHASE 4 — Производительность

### Чеклист

| Задача | Инструмент | Где |
|---|---|---|
| Все изображения через `next/image` | `next/image` | Везде |
| `sizes` prop на всех изображениях | `next/image` | Везде |
| `blur placeholder` для hero/slider img | `plaiceholder` или static blur | Hero, Archive |
| Видео — facade pattern | Vanilla JS | Video section |
| YouTube iframe — lazy | `loading="lazy"` + facade | Video section |
| Шрифты через `next/font` с `display: swap` | `next/font/google` | layout.tsx |
| Нет layout shift | CSS `aspect-ratio` на медиа | Везде |
| `dynamic()` для тяжёлых компонентов | `next/dynamic` | Slider, Video |
| `useInView` с `once: true` | Framer | Все анимации |
| Аналитика | `@vercel/analytics` | layout.tsx |
| Web Vitals | `@vercel/speed-insights` | layout.tsx |

### `next/dynamic` для слайдеров

```ts
const GuestsSlider = dynamic(() => import('@/components/sections/guests'), {
  loading: () => <SliderSkeleton />,
  ssr: false,
})
```

### Image optimization

```tsx
// Всегда так, никогда без sizes:
<Image
  src="/guests/dias.jpg"
  alt="Dias Predatorz"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  priority  // только для hero
/>
```

---

## PHASE 5 — SEO & Meta

**`src/app/page.tsx`:**
```ts
export const metadata: Metadata = {
  title: 'Power Generation Camp 2025 — Летний брейкинг лагерь',
  description: 'Летний брейкинг лагерь для танцоров всех уровней. 7 дней интенсивных тренировок с топовыми судьями. Регистрация открыта.',
  keywords: ['брейкинг', 'лагерь', 'breaking camp', 'bboy', 'bgirl', 'лето 2025'],
  openGraph: {
    title: 'Power Generation Camp 2025',
    description: '7 дней. Топовые судьи. Breaking.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Generation Camp 2025',
  },
}
```

**Структурированные данные** (Event schema):
```tsx
// В layout или page
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Power Generation Camp 2025",
      "startDate": "2025-07-10",
      "endDate": "2025-07-17",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Название локации, Город" },
      "description": "Летний брейкинг лагерь",
    })
  }}
/>
```

---

## PHASE 6 — API Routes

### `src/app/api/register/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server'
import { RegisterSchema } from '@/lib/schemas'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = RegisterSchema.parse(body)  // бросит ZodError если невалидно

    // Вариант A: Отправить в Google Sheets через Apps Script URL
    // Вариант B: Отправить email через Resend
    // Вариант C: Сохранить в Notion Database

    // Пример с Resend:
    // await resend.emails.send({ from: '...', to: '...', subject: '...', ... })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
```

---

## PHASE 7 — Деплой на Vercel

### Подготовка

```bash
# Финальная проверка
pnpm lint
pnpm build   # должен пройти без ошибок и warnings

# Проверить bundle
pnpm build && pnpm analyze  # если добавить @next/bundle-analyzer
```

### `.env.example`

```env
# Заполнить в Vercel Dashboard → Settings → Environment Variables
RESEND_API_KEY=
GOOGLE_SHEETS_URL=
NOTION_TOKEN=
NOTION_DB_REGISTER=
NOTION_DB_BATTLE=
NEXT_PUBLIC_SITE_URL=https://pgc.example.com
```

### Vercel конфиг `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### Деплой

```bash
pnpm add -g vercel
vercel login
vercel --prod
```

Или через GitHub: подключить репо в Vercel Dashboard → автодеплой на `main`.

---

## PHASE 8 — Целевые Web Vitals

| Метрика | Цель | Как достичь |
|---|---|---|
| LCP | < 2.5s | `priority` на hero img, видео facade |
| FID / INP | < 100ms | Нет тяжёлых синхронных скриптов |
| CLS | < 0.1 | `aspect-ratio` на всех медиа |
| FCP | < 1.8s | Шрифты через `next/font`, нет render-blocking |
| TTFB | < 600ms | Vercel Edge Network |

---

## УЗКИЕ МЕСТА — Сводная таблица

| Место | Риск | Решение |
|---|---|---|
| Hero видео/фото | LCP | `priority`, AVIF/WebP, правильный `sizes` |
| YouTube iframe | TTI +500ms | Facade pattern обязателен |
| Slider изображения | LCP, CLS | `next/image fill`, `aspect-ratio` обёртки |
| Формы — двойная отправка | UX | Disabled кнопка на `isSubmitting` |
| API rate limit | Спам | Edge middleware или простой throttle |
| Lenis + Framer | Layout shift | Lenis только `'use client'`, Framer `layout` prop |
| Шрифты FOUT | CLS | `next/font` с `display: swap`, `preload` |
| Мобайл видео autoplay | Не играет | `muted playsInline autoPlay` — все три обязательны |
| OG-image | Соц. сети | Статичный `/og-image.jpg` 1200×630 |

---

## Порядок работы с Cursor

```
1. Открыть ROADMAP.md и .cursorrules в контексте
2. Phase 0 → проверить pnpm build зелёный
3. Phase 1 → UI компоненты (button, badge, input, card, hud-frame)
   Дать Cursor дизайн-систему HTML как референс
4. Phase 2 → секции по одной, снизу вверх (footer → hero)
   На каждую секцию: структура → анимация → адаптив → оптимизация
5. Phase 3 → финальный проход анимаций
6. Phase 4 → lighthouse до 90+
7. Phase 5 → SEO мета
8. Phase 6 → API routes + тест форм
9. Phase 7 → деплой
```
