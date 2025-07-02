create table public.devex_rates (
  id uuid primary key default gen_random_uuid(),
  rate numeric(10,6) not null,
  fetched_at timestamptz not null default now(),
  source_url text not null,
  created_at timestamptz not null default now()
);

-- Index to quickly retrieve the most recent rate entries
create index on public.devex_rates (fetched_at desc); 