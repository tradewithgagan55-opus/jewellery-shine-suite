
-- ==== ROLES ====
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles for select to authenticated
  using (auth.uid() = user_id);
create policy "Admins view all roles" on public.user_roles for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Auto-grant admin on signup for the owner email
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) = 'cheluvecreations@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
      on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ==== SHARED UPDATED_AT ====
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- ==== PRODUCTS ====
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  product_name text not null,
  product_price numeric(10,2) not null default 0,
  rental_price numeric(10,2),
  sale_price numeric(10,2),
  category text,
  description text,
  sku text,
  availability text not null default 'available', -- available | out_of_stock | rental_only
  rental_available boolean not null default false,
  featured boolean not null default false,
  status text not null default 'visible', -- visible | hidden
  display_order integer not null default 0,
  image_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;

alter table public.products enable row level security;

create policy "Public reads visible products" on public.products for select to anon, authenticated
  using (status = 'visible');
create policy "Admins read all products" on public.products for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert products" on public.products for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update products" on public.products for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete products" on public.products for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

create index products_display_order_idx on public.products (display_order, created_at desc);
create index products_featured_idx on public.products (featured) where featured = true;

-- ==== SITE SETTINGS (singleton) ====
create table public.site_settings (
  id boolean primary key default true check (id = true),
  business_name text not null default 'Cheluve Creations',
  logo_url text,
  whatsapp_number text default '919380637389',
  instagram_url text default 'https://www.instagram.com/cheluve.creations',
  facebook_url text,
  contact_email text default 'cheluvecreations@gmail.com',
  contact_phone text default '+91 93806 37389',
  contact_location text default 'Bengaluru, Karnataka',
  updated_at timestamptz not null default now()
);

grant select on public.site_settings to anon, authenticated;
grant update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;

create policy "Public reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins update settings" on public.site_settings for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert settings" on public.site_settings for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

insert into public.site_settings (id) values (true);

-- ==== SEED 29 PRODUCTS ====
insert into public.products (slug, product_name, product_price, category, image_urls, display_order) values
('sri-lakshmi-heritage-haram-set','Sri Lakshmi Heritage Haram Set',700,'Bridal Sets', array['/images/collections/01-sri-lakshmi-heritage-haram-set.jpg'],1),
('emerald-kasu-heritage-necklace-set','Emerald Kasu Heritage Necklace Set',800,'Necklaces', array['/images/collections/02-emerald-kasu-heritage-necklace-set.jpg'],2),
('ruby-royale-choker-set','Ruby Royale Choker Set',500,'Necklaces', array['/images/collections/03-ruby-royale-choker-set.jpg'],3),
('pink-lotus-kasu-necklace-set','Pink Lotus Kasu Necklace Set',500,'Necklaces', array['/images/collections/04-pink-lotus-kasu-necklace-set.jpg'],4),
('mayura-pearl-ear-cuff-earrings','Mayura Pearl Ear Cuff Earrings',650,'Earrings', array['/images/collections/05-mayura-pearl-ear-cuff-earrings.jpg'],5),
('peacock-pearl-heritage-ear-cuff-earrings','Peacock Pearl Heritage Ear Cuff Earrings',500,'Earrings', array['/images/collections/06-peacock-pearl-heritage-ear-cuff-earrings.jpg'],6),
('mahalakshmi-royal-bridal-haram-set','Mahalakshmi Royal Bridal Haram Set',1500,'Bridal Sets', array['/images/collections/07-mahalakshmi-royal-bridal-haram-set.jpg'],7),
('emerald-paisley-elegance-set','Emerald Paisley Elegance Set',500,'Necklaces', array['/images/collections/08-emerald-paisley-elegance-set.jpg'],8),
('ruby-radiance-pendant-set','Ruby Radiance Pendant Set',500,'Pendants', array['/images/collections/09-ruby-radiance-pendant-set.jpg'],9),
('pearl-chandrika-pendant-set','Pearl Chandrika Pendant Set',500,'Pendants', array['/images/collections/10-pearl-chandrika-pendant-set.jpg'],10),
('ruby-blossom-pearl-pendant-set','Ruby Blossom Pearl Pendant Set',500,'Pendants', array['/images/collections/11-ruby-blossom-pearl-pendant-set.jpg'],11),
('navaratna-heritage-bangles','Navaratna Heritage Bangles',280,'Bangles', array['/images/collections/12-navaratna-heritage-bangles.jpg'],12),
('suvarna-classic-bangles','Suvarna Classic Bangles',280,'Bangles', array['/images/collections/13-suvarna-classic-bangles.jpg'],13),
('lakshmi-heritage-bangles','Lakshmi Heritage Bangles',250,'Bangles', array['/images/collections/14-lakshmi-heritage-bangles.jpg'],14),
('lakshmi-ratna-heritage-bangles','Lakshmi Ratna Heritage Bangles',250,'Bangles', array['/images/collections/15-lakshmi-ratna-heritage-bangles.jpg'],15),
('mayura-chandrika-jadabilla','Mayura Chandrika Jadabilla',500,'Hair Accessories', array['/images/collections/16-mayura-chandrika-jadabilla.jpg'],16),
('mahalakshmi-lotus-temple-jadabilla','Mahalakshmi Lotus Temple Jadabilla',500,'Hair Accessories', array['/images/collections/17-mahalakshmi-lotus-temple-jadabilla.jpg'],17),
('lakshmi-surya-temple-jadabilla','Lakshmi Surya Temple Jadabilla',500,'Hair Accessories', array['/images/collections/18-lakshmi-surya-temple-jadabilla.jpg'],18),
('mahalakshmi-emerald-temple-necklace-set','Mahalakshmi Emerald Temple Necklace Set',700,'Temple Jewelry', array['/images/collections/19-mahalakshmi-emerald-temple-necklace-set.jpg'],19),
('mahalakshmi-pearl-temple-haram-set','Mahalakshmi Pearl Temple Haram Set',700,'Temple Jewelry', array['/images/collections/20-mahalakshmi-pearl-temple-haram-set.jpg'],20),
('navaratna-jhumka-earrings','Navaratna Jhumka Earrings',400,'Earrings', array['/images/collections/21-navaratna-jhumka-earrings.jpg'],21),
('mayura-navaratna-jhumka-earrings','Mayura Navaratna Jhumka Earrings',650,'Earrings', array['/images/collections/22-mayura-navaratna-jhumka-earrings.jpg'],22),
('royal-navaratna-chandbali-jhumkas','Royal Navaratna Chandbali Jhumkas',650,'Earrings', array['/images/collections/23-royal-navaratna-chandbali-jhumkas.jpg'],23),
('pushpa-pearl-jhumka-earrings','Pushpa Pearl Jhumka Earrings',300,'Earrings', array['/images/collections/24-pushpa-pearl-jhumka-earrings.jpg'],24),
('mayura-emerald-bridal-ear-chain','Mayura Emerald Bridal Ear Chain',1500,'Bridal Sets', array['/images/collections/25-mayura-emerald-bridal-ear-chain.jpg'],25),
('rajanigandha-long-jhumka-earrings','Rajanigandha Long Jhumka Earrings',700,'Earrings', array['/images/collections/26-rajanigandha-long-jhumka-earrings.jpg'],26),
('mayura-emerald-peacock-hair-pin','Mayura Emerald Peacock Hair Pin',250,'Hair Accessories', array['/images/collections/27-mayura-emerald-peacock-hair-pin.jpg'],27),
('lakshmi-pushpa-pendant-set','Lakshmi Pushpa Pendant Set',500,'Pendants', array['/images/collections/28-lakshmi-pushpa-pendant-set.jpg'],28),
('maharani-temple-jadabilla','Maharani Temple Jadabilla',1000,'Hair Accessories', array['/images/collections/29-maharani-temple-jadabilla.jpg'],29);
