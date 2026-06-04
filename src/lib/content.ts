import type { CSSProperties } from "react";

export type Language = "english" | "arabic" | "urdu";
export type ThemeKey = "radiant" | "emerald" | "rose" | "midnight";
export type Tone = "spiritual" | "emotional" | "formal" | "poetic";

export const HADITH_TEXT =
  "مَنْ كُنْتُ مَوْلَاهُ فَهَذَا عَلِيٌّ مَوْلَاهُ";

export const LANGUAGES: Array<{ key: Language; label: string; dir: "ltr" | "rtl" }> = [
  { key: "english", label: "English", dir: "ltr" },
  { key: "arabic", label: "العربية", dir: "rtl" },
  { key: "urdu", label: "اردو", dir: "rtl" }
];

export const TONES: Array<{ key: Tone; label: string }> = [
  { key: "spiritual", label: "Spiritual" },
  { key: "emotional", label: "Emotional" },
  { key: "formal", label: "Formal" },
  { key: "poetic", label: "Poetic" }
];

export const THEMES: Record<
  ThemeKey,
  {
    label: string;
    sky: string;
    skyDeep: string;
    accent: string;
    accentAlt: string;
    ink: string;
    glow: string;
    panel: string;
  }
> = {
  radiant: {
    label: "Radiant Gold",
    sky: "#f8cf72",
    skyDeep: "#8c4d17",
    accent: "#fff1aa",
    accentAlt: "#2f7d72",
    ink: "#26140a",
    glow: "#f7d36a",
    panel: "rgba(72, 36, 7, 0.68)"
  },
  emerald: {
    label: "Emerald Dawn",
    sky: "#b7d88d",
    skyDeep: "#114e45",
    accent: "#ffe59a",
    accentAlt: "#86d9c3",
    ink: "#071c19",
    glow: "#b7f0c1",
    panel: "rgba(8, 48, 42, 0.72)"
  },
  rose: {
    label: "Rose Noor",
    sky: "#f4b7a1",
    skyDeep: "#5a2243",
    accent: "#ffe6a7",
    accentAlt: "#78b9b0",
    ink: "#26101d",
    glow: "#ffd1bd",
    panel: "rgba(77, 25, 54, 0.72)"
  },
  midnight: {
    label: "Midnight Lantern",
    sky: "#9ab7ff",
    skyDeep: "#11193e",
    accent: "#f9d978",
    accentAlt: "#7bd4b5",
    ink: "#070b1c",
    glow: "#b5c7ff",
    panel: "rgba(12, 18, 49, 0.76)"
  }
};

export const LANGUAGE_COPY: Record<
  Language,
  {
    title: string;
    defaultMessage: string;
    recipientLabel: string;
    nameLabel: string;
    messageLabel: string;
    themeLabel: string;
    languageLabel: string;
    fromLabel: string;
    generateLabel: string;
    shareLabel: string;
    createdFor: string;
  }
> = {
  english: {
    title: "Eid al-Ghadir Mubarak",
    defaultMessage:
      "May Allah keep us steadfast upon the Wilayah of Imam Ali (AS) and the Ahl al-Bayt (AS).",
    recipientLabel: "Recipient",
    nameLabel: "Your name",
    messageLabel: "Custom message",
    themeLabel: "Theme",
    languageLabel: "Language",
    fromLabel: "From",
    generateLabel: "Generate Wish",
    shareLabel: "Copy Share Link",
    createdFor: "Created for"
  },
  arabic: {
    title: "عيد الغدير مبارك",
    defaultMessage:
      "نسأل الله أن يثبتنا على ولاية أمير المؤمنين علي بن أبي طالب وأهل البيت عليهم السلام.",
    recipientLabel: "المستلم",
    nameLabel: "اسمك",
    messageLabel: "رسالتك",
    themeLabel: "النمط",
    languageLabel: "اللغة",
    fromLabel: "من",
    generateLabel: "إنشاء تهنئة",
    shareLabel: "نسخ الرابط",
    createdFor: "إهداء إلى"
  },
  urdu: {
    title: "عید غدیر مبارک",
    defaultMessage:
      "اللہ ہمیں ولایت امام علیؑ اور اہل بیتؑ کے راستے پر ثابت قدم رکھے۔",
    recipientLabel: "وصول کنندہ",
    nameLabel: "آپ کا نام",
    messageLabel: "پیغام",
    themeLabel: "تھیم",
    languageLabel: "زبان",
    fromLabel: "منجانب",
    generateLabel: "پیغام بنائیں",
    shareLabel: "لنک کاپی کریں",
    createdFor: "یہ پیغام ہے"
  }
};

export type WishCardMessage = {
  text: string;
  language: Language;
  style: "classic" | "calligraphy" | "noor" | "emerald";
};

export type WishCardTextLayout = {
  x: number;
  y: number;
  width: number;
  tone: "light" | "dark" | "gold";
  align: "left" | "center" | "right";
};

export const GHADIR_CARD_BACKGROUNDS = Array.from(
  { length: 10 },
  (_, index) => `/ghadir/cards/card-${String(index + 1).padStart(2, "0")}.jpg?v=first-ten-only-1`
);

export const GHADIR_CARD_TEXT_LAYOUTS: WishCardTextLayout[] = [
  { x: 50, y: 74, width: 78, tone: "light", align: "center" },
  { x: 50, y: 12, width: 72, tone: "dark", align: "center" },
  { x: 50, y: 68, width: 74, tone: "gold", align: "center" },
  { x: 50, y: 72, width: 76, tone: "light", align: "center" },
  { x: 50, y: 70, width: 80, tone: "dark", align: "center" },
  { x: 50, y: 12, width: 74, tone: "light", align: "center" },
  { x: 50, y: 75, width: 78, tone: "light", align: "center" },
  { x: 50, y: 76, width: 78, tone: "gold", align: "center" },
  { x: 50, y: 12, width: 78, tone: "light", align: "center" },
  { x: 50, y: 12, width: 78, tone: "dark", align: "center" },
  { x: 50, y: 13, width: 76, tone: "gold", align: "center" },
  { x: 50, y: 42, width: 70, tone: "dark", align: "center" },
  { x: 50, y: 12, width: 78, tone: "dark", align: "center" },
  { x: 50, y: 13, width: 74, tone: "light", align: "center" },
  { x: 60, y: 56, width: 64, tone: "gold", align: "center" },
  { x: 62, y: 43, width: 48, tone: "dark", align: "center" },
  { x: 50, y: 12, width: 74, tone: "dark", align: "center" },
  { x: 50, y: 12, width: 74, tone: "gold", align: "center" },
  { x: 50, y: 42, width: 70, tone: "gold", align: "center" },
  { x: 50, y: 76, width: 74, tone: "gold", align: "center" },
  { x: 65, y: 36, width: 46, tone: "dark", align: "center" },
  { x: 50, y: 78, width: 72, tone: "dark", align: "center" },
  { x: 50, y: 78, width: 62, tone: "dark", align: "center" },
  { x: 50, y: 14, width: 74, tone: "light", align: "center" },
  { x: 50, y: 12, width: 76, tone: "dark", align: "center" },
  { x: 50, y: 12, width: 72, tone: "light", align: "center" },
  { x: 50, y: 74, width: 70, tone: "light", align: "center" },
  { x: 50, y: 73, width: 62, tone: "gold", align: "center" },
  { x: 50, y: 78, width: 78, tone: "gold", align: "center" },
  { x: 35, y: 58, width: 54, tone: "light", align: "center" }
];

export const GHADIR_CARD_MESSAGES: WishCardMessage[] = [
  {
    text: "Eid al-Ghadir Mubarak. May the covenant of Wilayah illuminate every step.",
    language: "english",
    style: "classic"
  },
  {
    text: "عيد الغدير مبارك، ثبتنا الله وإياكم على ولاية أمير المؤمنين عليه السلام.",
    language: "arabic",
    style: "calligraphy"
  },
  {
    text: "عید غدیر مبارک، اللہ ہمیں محبت اہل بیتؑ پر قائم رکھے۔",
    language: "urdu",
    style: "noor"
  },
  {
    text: "May your home be filled with the light of Ali (AS), justice, mercy, and loyalty.",
    language: "english",
    style: "emerald"
  },
  {
    text: "من كنت مولاه فهذا علي مولاه، اللهم وال من والاه.",
    language: "arabic",
    style: "calligraphy"
  },
  {
    text: "غدیر کا پیغام وفا، ولایت اور نورِ ایمان کا پیغام ہے۔",
    language: "urdu",
    style: "classic"
  },
  {
    text: "On Ghadir, hearts renew their pledge to truth, courage, and the Ahl al-Bayt (AS).",
    language: "english",
    style: "noor"
  },
  {
    text: "اللهم اجعلنا من المتمسكين بولاية علي وآل محمد عليهم السلام.",
    language: "arabic",
    style: "emerald"
  },
  {
    text: "یا علیؑ کی ولایت دلوں کو یقین، عمل کو عدل، اور زندگی کو نور دیتی ہے۔",
    language: "urdu",
    style: "calligraphy"
  },
  {
    text: "Ghadir Mubarak. May love for Imam Ali (AS) become courage in every choice.",
    language: "english",
    style: "classic"
  },
  {
    text: "في الغدير اكتمل النداء وارتفعت راية الولاية.",
    language: "arabic",
    style: "noor"
  },
  {
    text: "غدیر ہمیں حق کے ساتھ کھڑے ہونے کا حوصلہ دیتا ہے۔",
    language: "urdu",
    style: "emerald"
  },
  {
    text: "May Allah write your name among those who honor the covenant of Ghadir.",
    language: "english",
    style: "calligraphy"
  },
  {
    text: "يا رب ثبت قلوبنا على حب محمد وآل محمد.",
    language: "arabic",
    style: "classic"
  },
  {
    text: "عید غدیر کی خوشی آپ کے گھر میں رحمت اور سکون لائے۔",
    language: "urdu",
    style: "noor"
  },
  {
    text: "The message of Ghadir is love with responsibility and faith with action.",
    language: "english",
    style: "emerald"
  },
  {
    text: "الحمد لله على نعمة الولاية، والحمد لله على تمام الدين.",
    language: "arabic",
    style: "calligraphy"
  },
  {
    text: "ولایت علیؑ ایمان کا چراغ اور راہِ ہدایت کا نشان ہے۔",
    language: "urdu",
    style: "classic"
  },
  {
    text: "May every raised hand become a prayer for guidance, unity, and mercy.",
    language: "english",
    style: "noor"
  },
  {
    text: "عيد الولاية مبارك، رزقنا الله صدق الاتباع وحسن العاقبة.",
    language: "arabic",
    style: "emerald"
  },
  {
    text: "غدیر کی صدا آج بھی دلوں کو ولایت کی طرف بلاتی ہے۔",
    language: "urdu",
    style: "calligraphy"
  },
  {
    text: "Ghadir Mubarak to you and your family. May faith feel near and alive.",
    language: "english",
    style: "classic"
  },
  {
    text: "اللهم اهدنا بنور الولاية واجعلنا من أهل الوفاء.",
    language: "arabic",
    style: "noor"
  },
  {
    text: "اللہ ہمیں علیؑ کے عدل، شجاعت اور وفا سے سیکھنے کی توفیق دے۔",
    language: "urdu",
    style: "emerald"
  },
  {
    text: "Today we celebrate the hand raised at Ghadir and the trust carried by hearts.",
    language: "english",
    style: "calligraphy"
  },
  {
    text: "صلوات الله على محمد وآل محمد، ومبارك عليكم عيد الغدير.",
    language: "arabic",
    style: "classic"
  },
  {
    text: "عید غدیر مبارک، محبت اہل بیتؑ ہمیشہ دل میں روشن رہے۔",
    language: "urdu",
    style: "noor"
  },
  {
    text: "May Allah guide us toward Wilayah, sincerity, and service to His creation.",
    language: "english",
    style: "emerald"
  },
  {
    text: "بولاية علي تكتمل المحبة وتسمو الطاعة.",
    language: "arabic",
    style: "calligraphy"
  },
  {
    text: "غدیر مبارک، دعا ہے کہ دلوں میں ولایت کا نور بڑھتا رہے۔",
    language: "urdu",
    style: "classic"
  }
];

export type RobotWishLine = {
  language: Language;
  label: string;
  accentName: string;
  text: string;
  spokenText?: string;
  fallbackText?: string;
  romanFallbackText?: string;
  audioSrc?: string;
  voiceLang: string;
  fallbackLang?: string;
  voiceSearch: string[];
  fallbackVoiceSearch?: string[];
  rate: number;
  pitch: number;
  volume?: number;
  accentNote: string;
  audioDurationSeconds?: number;
};

export const ROBOT_WISH_LINES: RobotWishLine[] = [
  {
    language: "urdu",
    label: "Urdu",
    accentName: "Pakistani Urdu",
    text: "عید غدیر مبارک۔ اللہ آپ کے دل کو محبت اہل بیت علیہم السلام سے روشن رکھے، ولایتِ امیر المؤمنین امام علیؑ پر ثابت قدمی عطا فرمائے، ایمان میں مضبوطی دے، دل میں نور، گھر میں رحمت، رزق میں برکت، اور زندگی میں سکون عطا فرمائے۔ دعا ہے کہ غدیر کا پیغام آپ کے اعمال میں عدل، زبان میں نرمی، دل میں وفا، اور راستے میں ہدایت بن کر ہمیشہ زندہ رہے۔",
    spokenText:
      "عید غدیر مبارک۔ اللہ آپ کے دل کو محبت اہل بیت سے روشن رکھے، ولایت امیر المؤمنین امام علی پر ثابت قدمی عطا فرمائے، ایمان میں مضبوطی دے، دل میں نور، گھر میں رحمت، رزق میں برکت، اور زندگی میں سکون عطا فرمائے۔ دعا ہے کہ غدیر کا پیغام آپ کے اعمال میں عدل، زبان میں نرمی، دل میں وفا، اور راستے میں ہدایت بن کر ہمیشہ زندہ رہے۔",
    fallbackText:
      "Assalam o alaikum. Eid e Gha deer Mubarak. Allah aap ko hamesha khush rakhey. Aap ke ghar mein rehmat ho, barkat ho, aur sukoon ho. Imam Ali ki wilaayat ka noor, aap ke dil mein hamesha rahey. Allah aap ko hidaayat, aman, aur khair ata farmaaye.",
    romanFallbackText:
      "Assalam o alaikum. Eid e Gha deer Mubarak. Allah aap ko hamesha khush rakhey. Aap ke ghar mein rehmat ho, barkat ho, aur sukoon ho. Imam Ali ki wilaayat ka noor, aap ke dil mein hamesha rahey. Allah aap ko hidaayat, aman, aur khair ata farmaaye.",
    audioSrc: "/audio/ghadir-urdu.mp3",
    audioDurationSeconds: 25.08,
    voiceLang: "ur-PK",
    fallbackLang: "en-IN",
    voiceSearch: ["ur-pk", "urdu", "pakistan", "pakistani"],
    fallbackVoiceSearch: ["en-pk", "pakistan", "pakistani", "microsoft heera", "microsoft neerja", "microsoft prabhat", "google indian english", "english india", "en-in", "india", "veena", "heera", "swara", "lekha", "rishi", "tara", "samantha", "karen", "moira", "sandy", "shelley", "flo", "zira", "english"],
    rate: 0.72,
    pitch: 1,
    accentNote: "Pakistani Urdu is requested; if unavailable, Roman Urdu is spoken with the closest female Pakistani or South Asian voice."
  },
  {
    language: "arabic",
    label: "Arabic",
    accentName: "Arabic",
    text: "عيد الغدير مبارك. نسأل الله تعالى أن يثبت قلوبنا وقلوبكم على ولاية أمير المؤمنين علي بن أبي طالب عليه السلام، وأن يجعل هذا اليوم المبارك نورا في الإيمان، ورحمة في البيوت، وبركة في الأعمار، وهدى في الطريق. اللهم اجعل محبتنا لمحمد وآل محمد محبة صادقة، واجعلنا من أهل الوفاء بالعهد، ومن السائرين على طريق الحق والعدل والرحمة.",
    spokenText: "عيد الغدير مبارك. نسأل الله تعالى أن يثبت قلوبنا وقلوبكم على ولاية أمير المؤمنين علي بن أبي طالب عليه السلام، وأن يجعل هذا اليوم المبارك نورا في الإيمان، ورحمة في البيوت، وبركة في الأعمار، وهدى في الطريق. اللهم اجعل محبتنا لمحمد وآل محمد محبة صادقة، واجعلنا من أهل الوفاء بالعهد، ومن السائرين على طريق الحق والعدل والرحمة.",
    audioSrc: "/audio/ghadir-arabic.mp3",
    audioDurationSeconds: 35.088,
    voiceLang: "ar-SA",
    fallbackLang: "ar-SA",
    voiceSearch: ["ar-sa", "ar-001", "majed", "arabic", "العربية"],
    fallbackVoiceSearch: ["ar-001", "majed", "arabic"],
    rate: 0.74,
    pitch: 0.94,
    accentNote: "Arabic voice is requested first."
  },
  {
    language: "english",
    label: "English",
    accentName: "British female English",
    text: "Eid al-Ghadir Mubarak. May Allah guide us with Wilayah, keep our hearts loyal to truth, and bless your family with mercy, courage, and peace. May the message of Ghadir strengthen our love for Imam Ali, peace be upon him, and the Ahl al-Bayt, peace be upon them, so that our words become kinder, our choices become more just, and our lives become closer to the path of guidance. May every prayer today rise with sincerity and return as light.",
    spokenText:
      "Gha-deer Mubarak. May Allah guide us with wilaayat, keep our hearts loyal to truth, and bless your family with mercy, courage, and peace. May the message of Gha-deer strengthen our love for Imam Ali and the family of the Prophet, so that our words become kinder, our choices become more just, and our lives become closer to guidance. May every prayer today rise with sincerity and return as light.",
    audioSrc: "/audio/ghadir-english-neural-human.mp3",
    audioDurationSeconds: 27.408,
    voiceLang: "en-GB",
    fallbackLang: "en-GB",
    voiceSearch: ["sonia", "libby", "sandy", "shelley", "flo", "moira", "google uk english", "english (uk)", "en-gb", "british", "uk", "english"],
    fallbackVoiceSearch: ["sonia", "libby", "sandy", "shelley", "flo", "moira", "google uk english", "english (uk)", "en-gb", "british", "uk", "english"],
    rate: 0.8,
    pitch: 1.03,
    volume: 0.85,
    accentNote: "British female English voice is requested first."
  }
];

export const SHIA_COUNTRY_STATS = [
  {
    country: "Iran",
    flag: "🇮🇷",
    shiaPopulation: "66-70M",
    muslimShare: "90-95%",
    worldShare: "37-40%",
    note: "Largest Shia population"
  },
  {
    country: "Iraq",
    flag: "🇮🇶",
    shiaPopulation: "19-22M",
    muslimShare: "65-70%",
    worldShare: "11-12%",
    note: "Shia-majority country"
  },
  {
    country: "Pakistan",
    flag: "🇵🇰",
    shiaPopulation: "17-26M",
    muslimShare: "10-15%",
    worldShare: "10-15%",
    note: "Among the largest communities"
  },
  {
    country: "India",
    flag: "🇮🇳",
    shiaPopulation: "16-24M",
    muslimShare: "10-15%",
    worldShare: "9-14%",
    note: "Large historic community"
  },
  {
    country: "Yemen",
    flag: "🇾🇪",
    shiaPopulation: "8-10M",
    muslimShare: "35-40%",
    worldShare: "~5%",
    note: "Major Zaydi presence"
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    shiaPopulation: "7-11M",
    muslimShare: "10-15%",
    worldShare: "4-6%",
    note: "Includes Alevi communities"
  },
  {
    country: "Azerbaijan",
    flag: "🇦🇿",
    shiaPopulation: "5-7M",
    muslimShare: "65-75%",
    worldShare: "3-4%",
    note: "Shia-majority country"
  },
  {
    country: "Afghanistan",
    flag: "🇦🇫",
    shiaPopulation: "3-4M",
    muslimShare: "10-15%",
    worldShare: "~2%",
    note: "Hazara and other communities"
  },
  {
    country: "Syria",
    flag: "🇸🇾",
    shiaPopulation: "3-4M",
    muslimShare: "15-20%",
    worldShare: "~2%",
    note: "Includes Alawite communities"
  },
  {
    country: "Saudi Arabia",
    flag: "🇸🇦",
    shiaPopulation: "2-4M",
    muslimShare: "10-15%",
    worldShare: "1-2%",
    note: "Concentrated in the Eastern Province"
  },
  {
    country: "Lebanon",
    flag: "🇱🇧",
    shiaPopulation: "1-2M",
    muslimShare: "45-55%",
    worldShare: "<1%",
    note: "Large national community"
  },
  {
    country: "Bahrain",
    flag: "🇧🇭",
    shiaPopulation: "400-500K",
    muslimShare: "65-75%",
    worldShare: "<1%",
    note: "Shia-majority country"
  }
] as const;

export const GHADIR_HADITH_REFERENCES = [
  {
    tradition: "Sunni",
    source: "Jami` at-Tirmidhi",
    number: "3713",
    detail: "Book 49, Hadith 109",
    grade: "Sahih (Darussalam)",
    summary: "For whomever I am his Mawla, Ali is his Mawla.",
    url: "https://sunnah.com/tirmidhi:3713"
  },
  {
    tradition: "Sunni",
    source: "Mishkat al-Masabih",
    number: "Book 30, Hadith 107",
    detail: "Arabic reference 6091",
    grade: "Sahih (Al-Albani)",
    summary: "Zaid b. Arqam reports the Mawla narration, transmitted by Ahmad and Tirmidhi.",
    url: "https://sunnah.com/urn/5660910"
  },
  {
    tradition: "Sunni",
    source: "Musnad Ahmad",
    number: "961",
    detail: "Book 5, Hadith 386",
    grade: "Hasan by corroborating evidence",
    summary: "The day of Ghadeer Khumm narration with witnesses from Badr.",
    url: "https://sunnah.com/ahmad:961"
  },
  {
    tradition: "Shia",
    source: "Al-Kafi",
    number: "Vol. 4, Book 3, Chapter 225, Hadith 2",
    detail: "Masjid of Ghadir Khum",
    grade: "Graded sahih ala al-zahir in Mir'at al-Uqul",
    summary: "Identifies the place where the Prophet declared Ali's Wilayah at Ghadir.",
    url: "https://thaqalayn.net/hadith/4/3/225/2"
  },
  {
    tradition: "Shia",
    source: "Al-Kafi",
    number: "Vol. 2, Book 1, Chapter 13, Hadith 8",
    detail: "The Fundamentals of Islam",
    grade: "Referenced in Mir'at al-Uqul",
    summary: "Wilayah is listed among the foundations, with special emphasis on Ghadir.",
    url: "https://thaqalayn.net/hadith/2/1/13/8"
  },
  {
    tradition: "Shia",
    source: "Man La Yahduruhu al-Faqih",
    number: "Vol. 2, Book 3, Chapter 152, Hadith 3 / 3144",
    detail: "Prayer at the Mosque of Ghadir Khumm",
    grade: "Thaqalayn reference",
    summary: "Reports the Ghadir location and the raised-hands declaration.",
    url: "https://thaqalayn.net/hadith/35/3/152/3"
  }
] as const;

export function themeVars(themeKey: ThemeKey): CSSProperties {
  const theme = THEMES[themeKey];

  return {
    "--theme-sky": theme.sky,
    "--theme-sky-deep": theme.skyDeep,
    "--theme-accent": theme.accent,
    "--theme-accent-alt": theme.accentAlt,
    "--theme-ink": theme.ink,
    "--theme-glow": theme.glow,
    "--theme-panel": theme.panel
  } as CSSProperties;
}

export function createSlug(name: string) {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "ghadir-wish";
  const suffix = Math.random().toString(36).slice(2, 6);

  return `${base}-${suffix}`;
}

export function generateWish({
  recipient,
  tone,
  language,
  sender
}: {
  recipient: string;
  tone: Tone;
  language: Language;
  sender: string;
}) {
  const to = recipient.trim() || "your loved ones";
  const from = sender.trim() || "your family";

  const english: Record<Tone, string> = {
    spiritual: `For ${to}, may the light of Ghadir strengthen your faith, deepen your love for Imam Ali (AS), and keep your heart close to the Ahl al-Bayt (AS).`,
    emotional: `${to}, on this blessed Eid al-Ghadir, may every prayer in your heart be wrapped in mercy, loyalty, and the luminous love of Imam Ali (AS). With duas from ${from}.`,
    formal: `Warm Eid al-Ghadir greetings to ${to}. May this day renew our commitment to Wilayah, justice, and devotion to the Ahl al-Bayt (AS).`,
    poetic: `${to}, may Ghadir rise in your life like a golden dawn, carrying love, courage, and the noble banner of Imam Ali (AS).`
  };

  const arabic: Record<Tone, string> = {
    spiritual: `إلى ${to}، نسأل الله أن يجعل نور الغدير ثباتا في الإيمان ومحبة خالصة لأمير المؤمنين عليه السلام.`,
    emotional: `${to}، في عيد الغدير المبارك، أسأل الله أن يملأ قلبك رحمة وولاء ومحبة لأهل البيت عليهم السلام. بدعاء من ${from}.`,
    formal: `أطيب التهاني إلى ${to} بمناسبة عيد الغدير. نسأل الله أن يجدد فينا عهد الولاية والعدل والوفاء.`,
    poetic: `إلى ${to}، ليشرق الغدير في أيامك كنور الفجر، حاملا المحبة والشجاعة وراية علي عليه السلام.`
  };

  const urdu: Record<Tone, string> = {
    spiritual: `${to} کے لیے دعا ہے کہ غدیر کا نور آپ کے ایمان کو مضبوط کرے اور امام علیؑ و اہل بیتؑ کی محبت دل میں روشن رکھے۔`,
    emotional: `${to}، عید غدیر کے اس مبارک دن اللہ آپ کے دل کو رحمت، وفا اور محبت اہل بیتؑ سے بھر دے۔ دعاگو: ${from}`,
    formal: `${to} کو عید غدیر کی دلی مبارک باد۔ اللہ ہمیں ولایت، عدل اور اہل بیتؑ سے وابستگی پر قائم رکھے۔`,
    poetic: `${to}، غدیر آپ کی زندگی میں سنہری صبح کی طرح طلوع ہو، محبت، حوصلہ اور علیؑ کی روشنی کے ساتھ۔`
  };

  return { english, arabic, urdu }[language][tone];
}

export function encodeWishParams(values: {
  name: string;
  recipient: string;
  message: string;
  language: Language;
  theme: ThemeKey;
}) {
  const params = new URLSearchParams();
  params.set("name", values.name);
  params.set("recipient", values.recipient);
  params.set("message", values.message);
  params.set("language", values.language);
  params.set("theme", values.theme);
  return params.toString();
}
