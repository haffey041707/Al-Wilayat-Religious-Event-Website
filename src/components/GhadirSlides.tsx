"use client";

import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import {
  BookOpen,
  Download,
  Flag,
  Globe2,
  Image as ImageIcon,
  Pause,
  Play,
  Sparkles,
  Square,
  type LucideIcon
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  GHADIR_CARD_BACKGROUNDS,
  GHADIR_HADITH_REFERENCES,
  HADITH_TEXT,
  ROBOT_WISH_LINES,
  SHIA_COUNTRY_STATS,
  type Language
} from "@/lib/content";

type SlideKey = "cards" | "robot" | "countries" | "hadith" | "guidance";

const SLIDES: Array<{
  key: SlideKey;
  label: string;
  icon: LucideIcon;
}> = [
  { key: "cards", label: "Wish Cards", icon: ImageIcon },
  { key: "robot", label: "AI Robot", icon: Sparkles },
  { key: "countries", label: "Shia World", icon: Globe2 },
  { key: "hadith", label: "Hadith", icon: BookOpen },
  { key: "guidance", label: "Guidance", icon: Flag }
];

const slideTransition: MotionProps = {
  initial: { opacity: 0, y: 26, rotateX: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  exit: { opacity: 0, y: -20, rotateX: 8, scale: 0.98 },
  transition: { duration: 0.42, ease: "easeOut" }
};

function languageDir(language: Language) {
  return language === "english" ? "ltr" : "rtl";
}

export function GhadirSlides() {
  const [activeSlide, setActiveSlide] = useState<SlideKey>("cards");

  return (
    <section className="relative px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-white/62">Ghadir celebration studio</p>
            <h2 className="mt-2 max-w-3xl text-[clamp(2rem,4.8vw,4.4rem)] font-black leading-none text-white">
              Eid al-Ghadir Mubarak
            </h2>
          </div>

          <div className="slide-tabs" role="tablist" aria-label="Ghadir slides">
            {SLIDES.map((slide) => {
              const Icon = slide.icon;
              return (
                <button
                  className="slide-tab"
                  data-active={activeSlide === slide.key}
                  key={slide.key}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === slide.key}
                  onClick={() => setActiveSlide(slide.key)}
                  title={slide.label}
                >
                  <Icon size={17} />
                  <span>{slide.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ghadir-slide-stage">
          <AnimatePresence mode="wait">
            {activeSlide === "cards" ? <WishCardsSlide key="cards" /> : null}
            {activeSlide === "robot" ? <RobotSlide key="robot" /> : null}
            {activeSlide === "countries" ? <CountrySlide key="countries" /> : null}
            {activeSlide === "hadith" ? <HadithSlide key="hadith" /> : null}
            {activeSlide === "guidance" ? <GuidanceSlide key="guidance" /> : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function WishCardsSlide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasGeneratedCard = selected !== null;
  const background = hasGeneratedCard ? GHADIR_CARD_BACKGROUNDS[selected] : null;

  function differentCardIndex(current: number | null) {
    if (current === null) {
      return Math.floor(Math.random() * GHADIR_CARD_BACKGROUNDS.length);
    }
    if (GHADIR_CARD_BACKGROUNDS.length < 2) {
      return current;
    }
    const next = Math.floor(Math.random() * (GHADIR_CARD_BACKGROUNDS.length - 1));
    return next >= current ? next + 1 : next;
  }

  function generateCard() {
    setSelected((current) => differentCardIndex(current));
  }

  async function handleDownload() {
    if (!cardRef.current || selected === null) {
      return;
    }

    const downloadIndex = selected;
    setIsDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const image = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#7a4516"
      });
      const link = document.createElement("a");
      link.download = `ghadir-card-${downloadIndex + 1}.png`;
      link.href = image;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <motion.div {...slideTransition} className="slide-grid">
      <div className="wish-card-zone">
        <div className="wish-card-3d-wrap">
          {background ? (
            <motion.div
              ref={cardRef}
              className="wish-photo-card"
              style={{ backgroundImage: `url(${background})` }}
              key={selected}
              initial={{ rotateY: -14, opacity: 0, scale: 0.96 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img src={background} alt="" className="wish-card-photo" loading="eager" />
            </motion.div>
          ) : (
            <div className="wish-card-placeholder">Click Generate</div>
          )}
        </div>
      </div>

      <aside className="slide-control-panel">
        <h3 className="mb-5 text-2xl font-black text-white">Wish card</h3>

        <button
          className="primary-button w-full px-4"
          type="button"
          onClick={generateCard}
        >
          <Sparkles size={18} />
          Generate
        </button>

        <button
          className="secondary-button mt-3 w-full px-4"
          type="button"
          onClick={handleDownload}
          disabled={isDownloading || !hasGeneratedCard}
        >
          <Download size={18} />
          {isDownloading ? "Preparing card..." : "Download card"}
        </button>
      </aside>
    </motion.div>
  );
}

function RobotSlide() {
  const [robotLanguage, setRobotLanguage] = useState<Language>("urdu");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remaining, setRemaining] = useState(120);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const robotModelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioProgressFrameRef = useRef<number | null>(null);
  const speechProgressFrameRef = useRef<number | null>(null);
  const speechPieceDurationsRef = useRef<number[]>([]);
  const speechElapsedBeforePieceRef = useRef(0);
  const speechEstimatedTotalRef = useRef(0);
  const speechPieceStartedAtRef = useRef(0);
  const runningRef = useRef(false);
  const pausedRef = useRef(false);
  const remainingRef = useRef(120);
  const languageRef = useRef<Language>("urdu");
  const speechRunRef = useRef(0);
  const speechPiecesRef = useRef<string[]>([]);
  const speechPieceIndexRef = useRef(0);
  const speechErrorCountRef = useRef(0);
  const speechUsingFallbackTextRef = useRef(false);
  const activeLine =
    ROBOT_WISH_LINES.find((line) => line.language === robotLanguage) ?? ROBOT_WISH_LINES[0];
  const displayRemaining =
    activeLine.audioSrc && remaining !== 0 ? activeLine.audioDurationSeconds ?? remaining : remaining;
  const progress = activeLine.audioSrc
    ? remaining === 0
      ? 100
      : 0
    : ((120 - remaining) / 120) * 100;

  function normalizeVoiceLang(lang: string) {
    return lang.toLowerCase().replace(/_/g, "-");
  }

  function cleanSpeechText(text: string) {
    return text
      .replace(/[ؑؒؓؔﷺ]/g, " ")
      .replace(/\([^)]*\)/g, " ")
      .replace(/\bAS\b/g, " ")
      .replace(/[0-9۰-۹٠-٩]+/g, " ")
      .replace(/[<>[\]{}_*#=~|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function fallbackSpeechText(
    line: (typeof ROBOT_WISH_LINES)[number],
    _fallbackVoice: SpeechSynthesisVoice | null
  ) {
    if (line.language === "urdu") {
      return line.romanFallbackText ?? line.fallbackText ?? line.spokenText ?? line.text;
    }

    return line.fallbackText ?? line.spokenText ?? line.text;
  }

  function findVoiceByTerms(terms: string[]) {
    for (const term of terms) {
      const match = voices.find((voice) => {
        const voiceName = voice.name.toLowerCase();
        const voiceLang = normalizeVoiceLang(voice.lang);
        return voiceName.includes(term) || voiceLang.includes(term);
      });

      if (match) {
        return match;
      }
    }

    return null;
  }

  function isUrduVoice(voice: SpeechSynthesisVoice) {
    const voiceName = voice.name.toLowerCase();
    const voiceLang = normalizeVoiceLang(voice.lang);
    return voiceLang.startsWith("ur") || voiceName.includes("urdu");
  }

  function pickPrimaryVoice(line: (typeof ROBOT_WISH_LINES)[number]) {
    const exactLang = line.voiceLang.toLowerCase();
    const baseLang = exactLang.split("-")[0];
    const searchTerms = line.voiceSearch.map((term) => term.toLowerCase());
    const exactVoice = voices.find((voice) => normalizeVoiceLang(voice.lang) === exactLang);

    if (line.language === "urdu") {
      return exactVoice ?? voices.find(isUrduVoice) ?? null;
    }

    return (
      exactVoice ??
      findVoiceByTerms(searchTerms) ??
      voices.find((voice) => normalizeVoiceLang(voice.lang).startsWith(baseLang)) ??
      null
    );
  }

  function pickFallbackVoice(line: (typeof ROBOT_WISH_LINES)[number]) {
    const terms = (line.fallbackVoiceSearch ?? []).map((term) => term.toLowerCase());
    const fallbackLang = normalizeVoiceLang(line.fallbackLang ?? line.voiceLang);
    const fallbackBase = fallbackLang.split("-")[0];

    return (
      findVoiceByTerms(terms) ??
      voices.find((voice) => normalizeVoiceLang(voice.lang) === fallbackLang) ??
      voices.find((voice) => normalizeVoiceLang(voice.lang).startsWith(fallbackLang)) ??
      voices.find((voice) => normalizeVoiceLang(voice.lang).startsWith(fallbackBase)) ??
      voices.find((voice) => normalizeVoiceLang(voice.lang).startsWith("en")) ??
      null
    );
  }

  function getSpeechPlan(line: (typeof ROBOT_WISH_LINES)[number]) {
    if (line.language === "urdu") {
      const fallbackVoice = pickFallbackVoice(line);
      return {
        text: cleanSpeechText(fallbackSpeechText(line, fallbackVoice)),
        lang: fallbackVoice
          ? normalizeVoiceLang(fallbackVoice.lang)
          : normalizeVoiceLang(line.fallbackLang ?? line.voiceLang),
        voice: fallbackVoice,
        note: fallbackVoice
          ? `${fallbackVoice.name} (${fallbackVoice.lang}) using natural Roman Urdu`
          : line.accentNote,
        rate: line.rate,
        pitch: line.pitch
      };
    }

    const primaryVoice = pickPrimaryVoice(line);
    if (primaryVoice) {
      return {
        text: cleanSpeechText(line.spokenText ?? line.text),
        lang: normalizeVoiceLang(primaryVoice.lang),
        voice: primaryVoice,
        note: `${primaryVoice.name} (${primaryVoice.lang})`,
        rate: line.rate,
        pitch: line.pitch
      };
    }

    const fallbackVoice = pickFallbackVoice(line);
    const selectedFallbackText = fallbackSpeechText(line, fallbackVoice);
    const useFallbackText = selectedFallbackText !== (line.spokenText ?? line.text);
    return {
      text: cleanSpeechText(selectedFallbackText),
      lang: fallbackVoice
        ? normalizeVoiceLang(fallbackVoice.lang)
        : line.fallbackLang ?? line.voiceLang,
      voice: fallbackVoice,
      note: fallbackVoice
        ? `${fallbackVoice.name} (${fallbackVoice.lang}) using ${
            useFallbackText ? `${line.accentName} phonetic fallback` : `${line.accentName} fallback`
          }`
        : line.accentNote,
      rate: line.rate,
      pitch: line.pitch
    };
  }

  function splitSpeechText(text: string) {
    const maxPieceLength = 150;
    const sentences = (text
        .match(/[^.!?۔؟।]+[.!?۔؟۔]?/g)
        ?? [])
      .map((piece) => piece.trim())
      .filter(Boolean);

    const pieces = sentences.flatMap((sentence) => {
      if (sentence.length <= maxPieceLength) {
        return [sentence];
      }

      const clauses = sentence
        .replace(/([,،;؛:])/g, "$1|")
        .split("|")
        .map((clause) => clause.trim())
        .filter(Boolean);

      const balanced: string[] = [];
      let current = "";

      for (const clause of clauses) {
        const next = current ? `${current} ${clause}` : clause;
        if (next.length > maxPieceLength && current) {
          balanced.push(current);
          current = clause;
        } else {
          current = next;
        }
      }

      if (current) {
        balanced.push(current);
      }

      return balanced.length ? balanced : [sentence];
    });

    return pieces.length ? pieces : [text];
  }

  function speechRateForPiece(line: (typeof ROBOT_WISH_LINES)[number], index: number, rate: number) {
    if (line.language !== "urdu") {
      return rate;
    }

    const cadence = [-0.02, 0.01, -0.01, 0.015];
    return rate + cadence[index % cadence.length];
  }

  function speechPitchForPiece(line: (typeof ROBOT_WISH_LINES)[number], index: number, pitch: number) {
    if (line.language !== "urdu") {
      return pitch;
    }

    const cadence = [0, 0.02, -0.01, 0.01];
    return pitch + cadence[index % cadence.length];
  }

  function speechPauseForPiece(
    line: (typeof ROBOT_WISH_LINES)[number],
    piece: string,
    restarting: boolean
  ) {
    if (line.language !== "urdu") {
      return restarting ? 760 : 140;
    }

    if (restarting) {
      return 980;
    }

    return /[.!?۔؟।]$/.test(piece) ? 420 : 260;
  }

  function lineFor(language: Language) {
    return ROBOT_WISH_LINES.find((line) => line.language === language) ?? ROBOT_WISH_LINES[0];
  }

  function formatRobotTime(seconds: number) {
    const safeSeconds = Math.max(0, Math.ceil(seconds));
    return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, "0")}`;
  }

  function cancelAudioProgress() {
    if (typeof window !== "undefined" && audioProgressFrameRef.current !== null) {
      window.cancelAnimationFrame(audioProgressFrameRef.current);
      audioProgressFrameRef.current = null;
    }
  }

  function cancelSpeechProgress() {
    if (typeof window !== "undefined" && speechProgressFrameRef.current !== null) {
      window.cancelAnimationFrame(speechProgressFrameRef.current);
      speechProgressFrameRef.current = null;
    }
  }

  function resetSpeechProgress() {
    cancelSpeechProgress();
    speechPieceDurationsRef.current = [];
    speechElapsedBeforePieceRef.current = 0;
    speechEstimatedTotalRef.current = 0;
    speechPieceStartedAtRef.current = 0;
  }

  function estimateSpeechPieceMs(
    line: (typeof ROBOT_WISH_LINES)[number],
    piece: string,
    rate: number
  ) {
    const words = piece.trim().split(/\s+/).filter(Boolean).length;
    const letters = Array.from(piece).filter((char) => /\S/.test(char)).length;
    const baseSeconds = words > 1 ? words * 0.46 : letters * 0.07;
    const languageFactor = line.language === "arabic" ? 1.18 : 1;
    const seconds = Math.max(1.2, baseSeconds * languageFactor) / Math.max(rate, 0.5);
    return seconds * 1000;
  }

  function renderSpeechProgress(elapsedMs = speechElapsedBeforePieceRef.current) {
    const total = speechEstimatedTotalRef.current;
    if (!total) {
      return;
    }

    const safeElapsed = Math.max(0, Math.min(elapsedMs, total));
    const percent = (safeElapsed / total) * 100;

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percent}%`;
    }

    if (timerTextRef.current) {
      timerTextRef.current.textContent = formatRobotTime((total - safeElapsed) / 1000);
    }
  }

  function syncSpeechProgress() {
    const durations = speechPieceDurationsRef.current;
    const pieceIndex = speechPieceIndexRef.current;
    const pieceDuration = durations[pieceIndex] ?? 0;
    const elapsedInPiece = Math.min(
      pieceDuration,
      window.performance.now() - speechPieceStartedAtRef.current
    );

    renderSpeechProgress(speechElapsedBeforePieceRef.current + elapsedInPiece);

    if (runningRef.current && !pausedRef.current) {
      speechProgressFrameRef.current = window.requestAnimationFrame(syncSpeechProgress);
    }
  }

  function startSpeechProgress(pieceIndex: number) {
    if (typeof window === "undefined") {
      return;
    }

    cancelSpeechProgress();
    speechElapsedBeforePieceRef.current = speechPieceDurationsRef.current
      .slice(0, pieceIndex)
      .reduce((sum, duration) => sum + duration, 0);
    speechPieceStartedAtRef.current = window.performance.now();
    speechProgressFrameRef.current = window.requestAnimationFrame(syncSpeechProgress);
  }

  function renderAudioProgress(line = lineFor(languageRef.current)) {
    const audio = audioRef.current;
    let audioMatchesLine = false;

    if (audio && line.audioSrc && typeof window !== "undefined") {
      audioMatchesLine = audio.src === new URL(line.audioSrc, window.location.href).href;
    }

    const audioDuration =
      audio && audioMatchesLine && Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : 0;
    const duration = audioDuration || line.audioDurationSeconds || 0;
    const current = audio && audioMatchesLine && duration ? Math.min(audio.currentTime, duration) : 0;
    const percent = duration ? (current / duration) * 100 : 0;

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percent}%`;
    }

    if (timerTextRef.current) {
      timerTextRef.current.textContent = formatRobotTime(duration ? duration - current : 0);
    }

    if (robotModelRef.current) {
      robotModelRef.current.dataset.speaking = String(runningRef.current && !pausedRef.current);
    }
  }

  function syncAudioProgress() {
    renderAudioProgress();
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (runningRef.current && !pausedRef.current && !audio.paused && !audio.ended) {
      audioProgressFrameRef.current = window.requestAnimationFrame(syncAudioProgress);
    }
  }

  function startAudioProgress() {
    if (typeof window === "undefined") {
      return;
    }

    cancelAudioProgress();
    audioProgressFrameRef.current = window.requestAnimationFrame(syncAudioProgress);
  }

  function stopRobotAudio(reset = true) {
    cancelAudioProgress();
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    if (reset) {
      audio.currentTime = 0;
    }
  }

  function playRobotAudio(line: (typeof ROBOT_WISH_LINES)[number]) {
    if (typeof window === "undefined" || !line.audioSrc) {
      return;
    }

    const targetSrc = new URL(line.audioSrc, window.location.href).href;
    if (!audioRef.current || audioRef.current.src !== targetSrc) {
      stopRobotAudio();
      audioRef.current = new Audio(line.audioSrc);
      audioRef.current.preload = "auto";
    }

    audioRef.current.loop = false;
    audioRef.current.onloadedmetadata = syncAudioProgress;
    audioRef.current.ontimeupdate = syncAudioProgress;
    audioRef.current.onended = () => {
      if (runningRef.current && !pausedRef.current) {
        completeRobotSpeech();
      }
    };
    startAudioProgress();
    audioRef.current.play().catch(() => {
      pausedRef.current = true;
      setIsPaused(true);
      requestRobotSync();
    });
  }

  function syncRobotUi(value = remainingRef.current) {
    if (robotModelRef.current) {
      robotModelRef.current.dataset.speaking = String(runningRef.current && !pausedRef.current);
    }

    const currentLine = lineFor(languageRef.current);

    if (currentLine.audioSrc) {
      renderAudioProgress(currentLine);
      return;
    }

    if (runningRef.current && speechEstimatedTotalRef.current > 0) {
      renderSpeechProgress();
      return;
    }

    const safeValue = Math.max(0, Math.min(120, value));

    if (timerTextRef.current) {
      timerTextRef.current.textContent = formatRobotTime(safeValue);
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${((120 - safeValue) / 120) * 100}%`;
    }

  }

  function requestRobotSync(value = remainingRef.current) {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => syncRobotUi(value));
    }
  }

  function completeRobotSpeech() {
    cancelAudioProgress();
    cancelSpeechProgress();
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "100%";
    }
    if (timerTextRef.current) {
      timerTextRef.current.textContent = "0:00";
    }
    speechRunRef.current += 1;
    runningRef.current = false;
    pausedRef.current = false;
    remainingRef.current = 0;
    setIsRunning(false);
    setIsPaused(false);
    setRemaining(0);
    requestRobotSync(0);
  }

  function speakLine(line = activeLine, runId = speechRunRef.current, resetQueue = false) {
    if (line.audioSrc) {
      playRobotAudio(line);
      return;
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const plan = getSpeechPlan(line);
    if (resetQueue || speechPiecesRef.current.length === 0) {
      speechPiecesRef.current = splitSpeechText(plan.text);
      speechPieceIndexRef.current = 0;
      speechErrorCountRef.current = 0;
      speechUsingFallbackTextRef.current = Boolean(
        line.fallbackText && plan.text === cleanSpeechText(line.fallbackText)
      );
      speechPieceDurationsRef.current = speechPiecesRef.current.map((piece) =>
        estimateSpeechPieceMs(line, piece, plan.rate)
      );
      speechEstimatedTotalRef.current = speechPieceDurationsRef.current.reduce(
        (sum, duration) => sum + duration,
        0
      );
      speechElapsedBeforePieceRef.current = 0;
      renderSpeechProgress(0);
    }

    const pieces = speechPiecesRef.current.length ? speechPiecesRef.current : [plan.text];
    const pieceIndex = speechPieceIndexRef.current;
    const piece = pieces[pieceIndex] ?? pieces[0] ?? plan.text;
    const utterance = new SpeechSynthesisUtterance(piece);
    const useDefaultVoice = speechErrorCountRef.current > 0;
    utterance.lang = useDefaultVoice
      ? normalizeVoiceLang(line.fallbackLang ?? plan.lang)
      : plan.lang;
    utterance.rate = speechRateForPiece(line, pieceIndex, plan.rate);
    utterance.pitch = speechPitchForPiece(line, pieceIndex, plan.pitch);

    if (plan.voice && !useDefaultVoice) {
      utterance.voice = plan.voice;
    }

    utterance.onstart = () => {
      startSpeechProgress(pieceIndex);
    };

    utterance.onend = () => {
      cancelSpeechProgress();
      if (
        speechRunRef.current === runId &&
        runningRef.current &&
        !pausedRef.current &&
        remainingRef.current > 0
      ) {
        speechErrorCountRef.current = 0;
        const nextIndex = pieceIndex + 1;
        const completedMs = speechPieceDurationsRef.current
          .slice(0, nextIndex)
          .reduce((sum, duration) => sum + duration, 0);
        renderSpeechProgress(completedMs);

        if (nextIndex >= pieces.length) {
          completeRobotSpeech();
          return;
        }

        speechPieceIndexRef.current = nextIndex;
        const pause = speechPauseForPiece(line, piece, false);
        window.setTimeout(() => speakLine(lineFor(languageRef.current), runId), pause);
      }
    };

    utterance.onerror = () => {
      cancelSpeechProgress();
      if (
        speechRunRef.current === runId &&
        runningRef.current &&
        !pausedRef.current &&
        remainingRef.current > 0
      ) {
        speechErrorCountRef.current += 1;
        if (line.fallbackText && !speechUsingFallbackTextRef.current) {
          speechPiecesRef.current = splitSpeechText(cleanSpeechText(fallbackSpeechText(line, null)));
          speechPieceIndexRef.current = 0;
          speechUsingFallbackTextRef.current = true;
          speechPieceDurationsRef.current = speechPiecesRef.current.map((piece) =>
            estimateSpeechPieceMs(line, piece, plan.rate)
          );
          speechEstimatedTotalRef.current = speechPieceDurationsRef.current.reduce(
            (sum, duration) => sum + duration,
            0
          );
          speechElapsedBeforePieceRef.current = 0;
          renderSpeechProgress(0);
        } else {
          speechPieceIndexRef.current += 1;
        }

        if (
          speechErrorCountRef.current >= Math.max(3, pieces.length) ||
          speechPieceIndexRef.current >= pieces.length
        ) {
          window.speechSynthesis.cancel();
          completeRobotSpeech();
          return;
        }

        window.setTimeout(() => speakLine(lineFor(languageRef.current), runId), 320);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function changeRobotLanguage(language: Language) {
    const nextLine = lineFor(language);
    languageRef.current = language;
    setRemaining(remainingRef.current);
    setRobotLanguage(language);

    if (typeof window === "undefined") {
      requestRobotSync();
      return;
    }

    if (runningRef.current) {
      speechRunRef.current += 1;
      const runId = speechRunRef.current;
      pausedRef.current = false;
      stopRobotAudio();
      resetSpeechProgress();
      window.speechSynthesis?.cancel();
      speechPiecesRef.current = [];
      speechUsingFallbackTextRef.current = false;
      setIsPaused(false);

      if (nextLine.audioSrc) {
        playRobotAudio(nextLine);
      } else if ("speechSynthesis" in window) {
        speakLine(nextLine, runId, true);
      }
    }

    requestRobotSync();
  }

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
      if (runningRef.current) {
        setRemaining(remainingRef.current);
      }
      requestRobotSync();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    runningRef.current = isRunning;
    pausedRef.current = isPaused;
    languageRef.current = robotLanguage;
    syncRobotUi();
  }, [isPaused, isRunning, robotLanguage]);

  useEffect(() => {
    remainingRef.current = remaining;
    syncRobotUi(remaining);
  }, [remaining]);

  useEffect(() => {
    if (!isRunning || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!runningRef.current || pausedRef.current) {
        return;
      }

      if (lineFor(languageRef.current).audioSrc) {
        return;
      }

      if (speechEstimatedTotalRef.current > 0) {
        return;
      }

      const next = Math.max(remainingRef.current - 1, 0);
      remainingRef.current = next;
      syncRobotUi(next);

      if (next <= 0) {
        stopRobotAudio();
        window.speechSynthesis?.cancel();
        runningRef.current = false;
        pausedRef.current = false;
        speechRunRef.current += 1;
        setIsRunning(false);
        setIsPaused(false);
        setRemaining(0);
        syncRobotUi(0);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPaused, isRunning]);

  useEffect(() => {
    return () => {
      speechRunRef.current += 1;
      stopRobotAudio();
      resetSpeechProgress();
      window.speechSynthesis?.cancel();
    };
  }, []);

  function startRobot() {
    if (typeof window === "undefined") {
      setRemaining(120);
      setIsRunning(true);
      setIsPaused(false);
      requestRobotSync(120);
      return;
    }

    if (isPaused) {
      pausedRef.current = false;
      if (activeLine.audioSrc) {
        playRobotAudio(activeLine);
      } else {
        window.speechSynthesis?.resume();
        startSpeechProgress(speechPieceIndexRef.current);
      }
      setRemaining(remainingRef.current);
      setIsPaused(false);
      setIsRunning(true);
      requestRobotSync();
      return;
    }

    speechRunRef.current += 1;
    const runId = speechRunRef.current;
    stopRobotAudio();
    resetSpeechProgress();
    window.speechSynthesis?.cancel();
    speechPiecesRef.current = [];
    speechPieceIndexRef.current = 0;
    speechErrorCountRef.current = 0;
    speechUsingFallbackTextRef.current = false;
    runningRef.current = true;
    pausedRef.current = false;
    remainingRef.current = 120;
    languageRef.current = robotLanguage;
    setRemaining(120);
    setIsRunning(true);
    setIsPaused(false);
    if (activeLine.audioSrc) {
      playRobotAudio(activeLine);
    } else if ("speechSynthesis" in window) {
      speakLine(activeLine, runId, true);
    }
    requestRobotSync(120);
  }

  function pauseRobot() {
    pausedRef.current = true;
    stopRobotAudio(false);
    cancelSpeechProgress();
    window.speechSynthesis?.pause();
    setRemaining(remainingRef.current);
    setIsPaused(true);
    requestRobotSync();
  }

  function stopRobot() {
    speechRunRef.current += 1;
    stopRobotAudio();
    resetSpeechProgress();
    window.speechSynthesis?.cancel();
    utteranceRef.current = null;
    speechPiecesRef.current = [];
    speechPieceIndexRef.current = 0;
    speechErrorCountRef.current = 0;
    speechUsingFallbackTextRef.current = false;
    runningRef.current = false;
    pausedRef.current = false;
    remainingRef.current = 120;
    setIsRunning(false);
    setIsPaused(false);
    setRemaining(120);
    requestRobotSync(120);
  }

  return (
    <motion.div {...slideTransition} className="robot-layout">
      <div className="robot-stage">
        <div className="robot-halo" />
        <div ref={robotModelRef} className="robot-model" data-speaking={isRunning && !isPaused}>
          <div className="robot-head">
            <span className="robot-eye" />
            <span className="robot-eye" />
            <span className="robot-mouth" />
          </div>
          <div className="robot-body">
            <span className="robot-core" />
            <span className="robot-panel" />
          </div>
          <span className="robot-arm robot-arm-left" />
          <span className="robot-arm robot-arm-right" />
        </div>
        <div className="sound-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="slide-copy-block">
        <p className="text-sm font-bold uppercase text-white/62">Virtual AI greeting robot</p>
        <h3 className="mt-2 text-[clamp(2.1rem,5vw,4.7rem)] font-black leading-none text-white">
          Ghadir Mubarak wish
        </h3>
        <div className="robot-language-switch" aria-label="Robot voice language">
          {ROBOT_WISH_LINES.map((line) => (
            <button
              className="robot-language-button"
              data-active={robotLanguage === line.language}
              key={line.language}
              type="button"
              onClick={() => changeRobotLanguage(line.language)}
            >
              {line.label}
            </button>
          ))}
        </div>

        <div className="robot-progress" aria-label="Robot wish progress">
          <span ref={progressBarRef} style={{ width: `${progress}%` }} />
        </div>

        <div className="robot-controls">
          <button className="primary-button px-5" type="button" onClick={startRobot}>
            <Play size={18} />
            {isPaused ? "Resume" : "Start"}
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={pauseRobot}
            disabled={!isRunning || isPaused}
            title="Pause robot"
          >
            <Pause size={18} />
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={stopRobot}
            disabled={!isRunning}
            title="Stop robot"
          >
            <Square size={18} />
          </button>
          <span ref={timerTextRef} className="robot-timer">
            {formatRobotTime(displayRemaining)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CountrySlide() {
  return (
    <motion.div {...slideTransition} className="country-layout">
      <div className="slide-copy-block">
        <p className="text-sm font-bold uppercase text-white/62">Countries and flags</p>
        <h3 className="mt-2 text-[clamp(2rem,5vw,4.5rem)] font-black leading-none text-white">
          Where many Shia Muslims live
        </h3>
        <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-white/74">
          Approximate ranges are based on Pew Research Center estimates. The figures are shown as
          ranges because sectarian population data is often indirect.
        </p>
      </div>

      <div className="country-orbit" aria-hidden="true">
        <div className="country-globe">
          <span>يا علي</span>
        </div>
        {SHIA_COUNTRY_STATS.slice(0, 8).map((item, index) => (
          <span
            className="orbit-flag"
            key={item.country}
            style={{ "--angle": `${index * 45}deg` } as CSSProperties}
          >
            {item.flag}
          </span>
        ))}
      </div>

      <div className="country-stat-grid">
        {SHIA_COUNTRY_STATS.map((item, index) => (
          <motion.div
            className="country-stat"
            key={item.country}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.035, duration: 0.32 }}
          >
            <span className="country-flag">{item.flag}</span>
            <div>
              <h4>{item.country}</h4>
              <p>{item.note}</p>
            </div>
            <strong>{item.shiaPopulation}</strong>
            <small>{item.muslimShare} of Muslims</small>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function HadithSlide() {
  const sunni = GHADIR_HADITH_REFERENCES.filter((item) => item.tradition === "Sunni");
  const shia = GHADIR_HADITH_REFERENCES.filter((item) => item.tradition === "Shia");

  return (
    <motion.div {...slideTransition} className="hadith-layout">
      <div className="slide-copy-block">
        <p className="text-sm font-bold uppercase text-white/62">Hadith reference numbers</p>
        <h3 className="mt-2 text-[clamp(2.1rem,5vw,4.8rem)] font-black leading-none text-white">
          Ghadir Khumm in Sunni and Shia sources
        </h3>
        <p className="arabic-display mt-5 text-[clamp(1.6rem,3.6vw,3rem)] font-black leading-relaxed text-[color:var(--theme-accent)]">
          {HADITH_TEXT}
        </p>
      </div>

      <div className="hadith-counters">
        <div>
          <span>{sunni.length}</span>
          <p>Sunni references from Sunnah.com</p>
        </div>
        <div>
          <span>{shia.length}</span>
          <p>Shia references from Thaqalayn</p>
        </div>
      </div>

      <div className="hadith-reference-grid">
        {GHADIR_HADITH_REFERENCES.map((item, index) => (
          <motion.a
            className="hadith-reference"
            href={item.url}
            key={`${item.source}-${item.number}`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, rotateY: -10, y: 18 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            transition={{ delay: index * 0.045, duration: 0.34 }}
          >
            <span>{item.tradition}</span>
            <h4>{item.source}</h4>
            <strong>{item.number}</strong>
            <p>{item.detail}</p>
            <small>{item.grade}</small>
            <em>{item.summary}</em>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

function GuidanceSlide() {
  const duas = [
    {
      lang: "english" as const,
      text: "May Allah guide you with Wilayah, keep you near the Ahl al-Bayt (AS), and make your heart firm upon truth."
    },
    {
      lang: "arabic" as const,
      text: "اللهم اهدنا بنور الولاية، وثبتنا على محبة محمد وآل محمد، واجعلنا من أهل الوفاء."
    },
    {
      lang: "urdu" as const,
      text: "اللہ آپ کو ولایت کے نور سے ہدایت دے، اہل بیتؑ کی محبت عطا کرے، اور حق پر ثابت قدم رکھے۔"
    }
  ];

  return (
    <motion.div {...slideTransition} className="guidance-layout">
      <div className="guidance-prism">
        <span className="prism-face prism-front">Wilayah</span>
        <span className="prism-face prism-back">Guidance</span>
        <span className="prism-face prism-top arabic-display">الولاية</span>
        <span className="prism-face prism-bottom">Mercy</span>
      </div>

      <div className="slide-copy-block">
        <p className="text-sm font-bold uppercase text-white/62">Closing prayer</p>
        <h3 className="mt-2 text-[clamp(2.4rem,6vw,5.8rem)] font-black leading-none text-white">
          May Allah guide you with Wilayah
        </h3>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/76">
          A peaceful final slide for reflection, prayer, and sharing the blessing of Ghadir.
        </p>
      </div>

      <div className="guidance-duas">
        {duas.map((dua, index) => (
          <motion.div
            className="guidance-dua"
            key={dua.lang}
            dir={languageDir(dua.lang)}
            initial={{ opacity: 0, x: index % 2 === 0 ? -22 : 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.42 }}
          >
            <span>{dua.lang}</span>
            <p className={dua.lang === "english" ? "" : "arabic-display"}>{dua.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
