-- ゲーム改造研究所 アクセス集計セットアップ (Supabase SQL Editorで1回実行)
-- 集計開始前のアクセスは復元できません。
-- 匿名のセッションID・訪問日時・流入元分類のみを保存します。

create table if not exists public.site_visit_sessions (
  id uuid primary key,
  visited_at timestamptz not null default now(),
  source text not null default 'other' check (source in ('x', 'other'))
);
create index if not exists site_visit_sessions_visited_at_idx
  on public.site_visit_sessions (visited_at);
create table if not exists public.site_analytics_state (
  id boolean primary key default true check (id = true),
  peak_online integer not null default 0 check (peak_online >= 0)
);
insert into public.site_analytics_state (id, peak_online)
values (true, 0) on conflict (id) do nothing;
alter table public.site_visit_sessions enable row level security;
alter table public.site_analytics_state enable row level security;
revoke all on public.site_visit_sessions from public, anon, authenticated;
revoke all on public.site_analytics_state from public, anon, authenticated;

create or replace function public.site_stats_read()
returns jsonb language sql security definer set search_path = ''
as $$
  select jsonb_build_object(
    'today', (
      select count(*) from public.site_visit_sessions
      where visited_at >= (((now() at time zone 'Asia/Tokyo')::date)::timestamp at time zone 'Asia/Tokyo')
    ),
    'total', (select count(*) from public.site_visit_sessions),
    'from_x', (select count(*) from public.site_visit_sessions where source = 'x'),
    'peak', (select peak_online from public.site_analytics_state where id = true)
  );
$$;

create or replace function public.site_visit_once(p_visit_id uuid, p_source text default 'other')
returns jsonb language plpgsql security definer set search_path = ''
as $$
begin
  if p_visit_id is null then raise exception 'visit ID required'; end if;
  insert into public.site_visit_sessions(id, source)
  values (p_visit_id, case when lower(coalesce(p_source, '')) = 'x' then 'x' else 'other' end)
  on conflict (id) do nothing;
  return public.site_stats_read();
end;
$$;

create or replace function public.site_peak_report(p_online integer)
returns integer language plpgsql security definer set search_path = ''
as $$
declare new_peak integer;
begin
  if p_online is null or p_online < 1 or p_online > 1000 then
    return (select peak_online from public.site_analytics_state where id = true);
  end if;
  insert into public.site_analytics_state(id, peak_online)
  values (true, p_online)
  on conflict (id) do update
    set peak_online = greatest(public.site_analytics_state.peak_online, excluded.peak_online)
  returning peak_online into new_peak;
  return new_peak;
end;
$$;

revoke execute on function public.site_stats_read() from public, anon, authenticated;
revoke execute on function public.site_visit_once(uuid, text) from public, anon, authenticated;
revoke execute on function public.site_peak_report(integer) from public, anon, authenticated;
grant execute on function public.site_stats_read() to anon, authenticated;
grant execute on function public.site_visit_once(uuid, text) to anon, authenticated;
grant execute on function public.site_peak_report(integer) to anon, authenticated;
select public.site_stats_read() as stats;
