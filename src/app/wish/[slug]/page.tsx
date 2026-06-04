import { SharedWish } from "@/components/SharedWish";
import {
  LANGUAGE_COPY,
  type Language,
  type ThemeKey
} from "@/lib/content";

const languages: Language[] = ["english", "arabic", "urdu"];
const themes: ThemeKey[] = ["radiant", "emerald", "rose", "midnight"];

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function asLanguage(value: string | undefined): Language {
  return languages.includes(value as Language) ? (value as Language) : "english";
}

function asTheme(value: string | undefined): ThemeKey {
  return themes.includes(value as ThemeKey) ? (value as ThemeKey) : "radiant";
}

export default async function WishPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const language = asLanguage(first(resolvedSearch.language));
  const theme = asTheme(first(resolvedSearch.theme));

  return (
    <SharedWish
      slug={resolvedParams.slug}
      name={first(resolvedSearch.name) || "Sayed Hafeez"}
      recipient={first(resolvedSearch.recipient) || ""}
      message={first(resolvedSearch.message) || LANGUAGE_COPY[language].defaultMessage}
      language={language}
      theme={theme}
    />
  );
}
