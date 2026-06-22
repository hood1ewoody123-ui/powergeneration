-- Если таблицы уже созданы — выполните только этот файл в SQL Editor (один раз)

drop policy if exists "service_role insert camp" on public.camp_applications;
drop policy if exists "service_role read camp" on public.camp_applications;
drop policy if exists "service_role insert battle" on public.battle_applications;
drop policy if exists "service_role read battle" on public.battle_applications;

create policy "service_role insert camp"
  on public.camp_applications
  for insert
  to service_role
  with check (true);

create policy "service_role read camp"
  on public.camp_applications
  for select
  to service_role
  using (true);

create policy "service_role insert battle"
  on public.battle_applications
  for insert
  to service_role
  with check (true);

create policy "service_role read battle"
  on public.battle_applications
  for select
  to service_role
  using (true);
