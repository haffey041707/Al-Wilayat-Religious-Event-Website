# Ghadir Celebration Experience Platform

An interactive Eid al-Ghadir experience with an animated hero scene, five professional slides, multilingual wish cards, a virtual greeting robot, Shia country details, and hadith references.

## What Is Built

- Animated golden-sky Ghadir scene with moving clouds, light rays, floating particles, abstract faceless silhouettes, glow effects, camera movement, and letter-by-letter Arabic text.
- Five-slide animated Ghadir section replacing the old lower maker.
- Wish-card generator with 30 downloaded photo backgrounds and 30 English, Arabic, and Urdu messages.
- Virtual AI robot greeting with start, pause, stop, and a two-minute blessing script.
- Country flag section with Shia population details.
- Sunni and Shia Ghadir Khumm hadith reference section.
- Share URL route at `/wish/[slug]`.
- Express API scaffold for wishes, generated greetings, auth, and Cloudinary uploads.
- PostgreSQL schema for users and wishes.
- Standalone `prototype.html` that works without installing Node packages.

## Quick Preview

This machine currently does not expose `node` or `npm`, so the Next.js app cannot be installed or launched from this shell yet.

Open this file directly in a browser for an immediate preview:

```text
prototype.html
```

The standalone prototype includes the animated hero and the same five-slide Ghadir experience.

## Run The Full App

After installing Node.js:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Run the Express API in a second terminal:

```bash
npm run api:dev
```

API health check:

```text
http://localhost:4000/health
```

## Database

Create a PostgreSQL database and apply the schema:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Set environment values from `.env.example`.

## Project Structure

```text
src/app                 Next.js app routes
src/components          Animated scene, studio, five-slide Ghadir experience, shared wish page
src/lib/content.ts      Themes, translations, slide data, hadith references, URL helpers
server                  Express API scaffold
db/schema.sql           PostgreSQL schema
public/audio            Optional licensed audio assets
prototype.html          Zero-dependency browser preview
```

## Production Notes

- Replace the local wish templates in `generateWish` with an OpenAI or other LLM call if you want server-generated AI messages.
- Add licensed Takbir, Nasheed, or recitation files under `public/audio` for real audio playback.
- Wire Google OAuth into the auth routes after creating Google credentials.
- Use Cloudinary credentials if you later add uploads for generated cards.

## License

This project is source-available, not open-source. You may view and use the deployed website, but you may not modify, redistribute, republish, or reuse the source code or assets without written permission from Syed Muhammad Hafeez. See [LICENSE](LICENSE).
