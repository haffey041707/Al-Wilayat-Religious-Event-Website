create table if not exists users (
  id uuid primary key,
  name text not null,
  email text not null unique,
  password_hash text not null,
  google_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists wishes (
  id uuid primary key,
  user_id uuid references users(id) on delete set null,
  slug text not null unique,
  name text not null,
  recipient text not null default '',
  message text not null,
  language text not null check (language in ('english', 'arabic', 'urdu')),
  theme text not null check (theme in ('radiant', 'emerald', 'rose', 'midnight')),
  created_at timestamptz not null default now()
);

create table if not exists posters (
  id uuid primary key,
  wish_id uuid references wishes(id) on delete cascade,
  format text not null check (format in ('instagram', 'story', 'cover', 'wallpaper')),
  cloudinary_public_id text,
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists wishes_slug_idx on wishes(slug);
create index if not exists wishes_user_id_idx on wishes(user_id);
