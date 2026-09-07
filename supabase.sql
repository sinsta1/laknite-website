create table if not exists public.enquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  business text not null check (char_length(business) between 1 and 150),
  city text not null check (char_length(city) between 1 and 100),
  type text not null check (type in ('Retailer', 'Wholesaler', 'Distributor', 'Chain store', 'Regional trader', 'Bulk buyer')),
  phone text not null check (char_length(phone) between 10 and 30),
  whatsapp text not null default '',
  requirement text not null default ''
);

alter table public.enquiries enable row level security;
revoke all on table public.enquiries from anon, authenticated;
grant insert, select, update, delete on table public.enquiries to service_role;

-- No public policies are created. Website visitors cannot read or write this
-- table directly; submissions go through server.js using the server-only key.
