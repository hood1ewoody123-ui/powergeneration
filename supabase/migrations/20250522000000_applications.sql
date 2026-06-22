-- Заявки с лендинга Power Generation Camp
-- Выполните в Supabase SQL Editor или через supabase db push

create table if not exists public.camp_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  city text not null,
  age smallint not null check (age >= 7 and age <= 99),
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  phone text not null,
  email text not null,
  socials text,
  comment text,
  source text not null default 'pgc-landing',
  ip text
);

create table if not exists public.battle_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  nickname text not null,
  age smallint not null check (age >= 7 and age <= 99),
  nomination text not null check (
    nomination in ('beginners', 'powermove', '2v2_random_kid', '2v2_random_pro')
  ),
  source text not null default 'pgc-battle',
  ip text
);

create index if not exists camp_applications_created_at_idx
  on public.camp_applications (created_at desc);

create index if not exists battle_applications_created_at_idx
  on public.battle_applications (created_at desc);

alter table public.camp_applications enable row level security;
alter table public.battle_applications enable row level security;

-- Публичный доступ только на чтение/запись через service role (API Next.js).
-- Anon/authenticated клиентам доступ закрыт.
