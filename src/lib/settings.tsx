import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGES = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

type Dict = Record<string, string>;

const pt: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "Onde fica esse país?",
  duel: "Duelo 1x1",
  signInToDuel: "Entrar para duelar",
  settings: "Configurações",
  points: "Pontos",
  round: "Rodada",
  streak: "Sequência",
  findOnMap: "Encontre no mapa",
  correctPlus: "Acertou! +{n} pontos.",
  wrongMsg: "Errou. O país estava marcado em verde.",
  selectedMsg: "País selecionado. Confirme sua resposta.",
  clickMsg: "Clique em um país no mapa.",
  next: "Próximo país",
  check: "Checar",
  correctAnswer: "Resposta correta",
  youPicked: "Você marcou {name}",
  otherCountry: "outro país",
  hints: "Dicas",
  worth: "Valem {n} pts",
  continent: "Continente",
  region: "Região",
  language: "Idioma",
  noLanguage: "Sem idioma oficial",
  noMoreHints: "Sem mais dicas",
  revealHint: "Revelar dica {n} de {max}",
  back: "Voltar ao jogo",
  settingsTitle: "Configurações",
  settingsSubtitle: "Ajuste o idioma e como você quer jogar.",
  gameLanguage: "Idioma do jogo",
  maxHints: "Dicas por rodada",
  maxHintsHelp: "Menos dicas disponíveis, mais desafio.",
  regionFilter: "Região do quiz",
  allRegions: "Mundo todo",
  saved: "Preferências salvas neste dispositivo.",
};

const en: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "Where is this country?",
  duel: "1v1 Duel",
  signInToDuel: "Sign in to duel",
  settings: "Settings",
  points: "Points",
  round: "Round",
  streak: "Streak",
  findOnMap: "Find it on the map",
  correctPlus: "Correct! +{n} points.",
  wrongMsg: "Wrong. The country is highlighted in green.",
  selectedMsg: "Country selected. Confirm your answer.",
  clickMsg: "Click a country on the map.",
  next: "Next country",
  check: "Check",
  correctAnswer: "Correct answer",
  youPicked: "You picked {name}",
  otherCountry: "another country",
  hints: "Hints",
  worth: "Worth {n} pts",
  continent: "Continent",
  region: "Region",
  language: "Language",
  noLanguage: "No official language",
  noMoreHints: "No hints left",
  revealHint: "Reveal hint {n} of {max}",
  back: "Back to game",
  settingsTitle: "Settings",
  settingsSubtitle: "Choose your language and how you want to play.",
  gameLanguage: "Game language",
  maxHints: "Hints per round",
  maxHintsHelp: "Fewer hints, bigger challenge.",
  regionFilter: "Quiz region",
  allRegions: "Whole world",
  saved: "Preferences saved on this device.",
};

const es: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "¿Dónde queda este país?",
  duel: "Duelo 1x1",
  signInToDuel: "Entra para duelar",
  settings: "Configuración",
  points: "Puntos",
  round: "Ronda",
  streak: "Racha",
  findOnMap: "Encuéntralo en el mapa",
  correctPlus: "¡Correcto! +{n} puntos.",
  wrongMsg: "Fallaste. El país está marcado en verde.",
  selectedMsg: "País seleccionado. Confirma tu respuesta.",
  clickMsg: "Haz clic en un país del mapa.",
  next: "Siguiente país",
  check: "Comprobar",
  correctAnswer: "Respuesta correcta",
  youPicked: "Marcaste {name}",
  otherCountry: "otro país",
  hints: "Pistas",
  worth: "Valen {n} pts",
  continent: "Continente",
  region: "Región",
  language: "Idioma",
  noLanguage: "Sin idioma oficial",
  noMoreHints: "No hay más pistas",
  revealHint: "Revelar pista {n} de {max}",
  back: "Volver al juego",
  settingsTitle: "Configuración",
  settingsSubtitle: "Elige el idioma y cómo quieres jugar.",
  gameLanguage: "Idioma del juego",
  maxHints: "Pistas por ronda",
  maxHintsHelp: "Menos pistas, más desafío.",
  regionFilter: "Región del quiz",
  allRegions: "Todo el mundo",
  saved: "Preferencias guardadas en este dispositivo.",
};

const fr: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "Où se trouve ce pays ?",
  duel: "Duel 1c1",
  signInToDuel: "Connecte-toi pour duel",
  settings: "Paramètres",
  points: "Points",
  round: "Manche",
  streak: "Série",
  findOnMap: "Trouve-le sur la carte",
  correctPlus: "Bravo ! +{n} points.",
  wrongMsg: "Raté. Le pays est en vert.",
  selectedMsg: "Pays sélectionné. Confirme ta réponse.",
  clickMsg: "Clique sur un pays de la carte.",
  next: "Pays suivant",
  check: "Valider",
  correctAnswer: "Bonne réponse",
  youPicked: "Tu as choisi {name}",
  otherCountry: "un autre pays",
  hints: "Indices",
  worth: "Valent {n} pts",
  continent: "Continent",
  region: "Région",
  language: "Langue",
  noLanguage: "Pas de langue officielle",
  noMoreHints: "Plus d'indices",
  revealHint: "Révéler l'indice {n} sur {max}",
  back: "Retour au jeu",
  settingsTitle: "Paramètres",
  settingsSubtitle: "Choisis la langue et ta façon de jouer.",
  gameLanguage: "Langue du jeu",
  maxHints: "Indices par manche",
  maxHintsHelp: "Moins d'indices, plus de défi.",
  regionFilter: "Région du quiz",
  allRegions: "Monde entier",
  saved: "Préférences enregistrées sur cet appareil.",
};

const DICTS: Record<Lang, Dict> = { pt, en, es, fr };

export type Settings = {
  lang: Lang;
  maxHints: number;
  region: string;
};

const DEFAULTS: Settings = { lang: "pt", maxHints: 3, region: "all" };
const STORAGE_KEY = "atlas-quiz-settings";

type Ctx = {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) });
    } catch {
      /* ignore */
    }
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = DICTS[settings.lang] ?? pt;
      let out = dict[key] ?? pt[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
      }
      return out;
    },
    [settings.lang],
  );

  const value = useMemo(() => ({ settings, update, t }), [settings, update, t]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
