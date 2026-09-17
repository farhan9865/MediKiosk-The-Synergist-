 /* ========================================================================= */
/* MediKiosk Speech Service                                                  */
/* ========================================================================= */
/*
 * Browser-based Speech Recognition + Speech Synthesis.
 *
 * Patient UI
 *     ↓
 * Browser Speech Recognition
 *     ↓
 * Transcript
 *
 * Patient UI
 *     ↓
 * Browser Speech Synthesis
 *     ↓
 * Patient's selected language
 *
 * Later:
 *
 * React → FastAPI → Bhashini ASR / Translation / TTS
 *
 * IMPORTANT:
 * Do not put Bhashini API keys directly inside this frontend file.
 */

/* ========================================================================= */
/* TYPES                                                                     */
/* ========================================================================= */

export type SpeechLanguage = string;

export interface SpeechResult {
  transcript: string;
  confidence: number;
}

type RecognitionResultAlternative = {
  transcript: string;
  confidence: number;
};

type RecognitionResult = {
  [index: number]: RecognitionResultAlternative;
};

type RecognitionResults = {
  [index: number]: RecognitionResult;
};

type RecognitionEvent = {
  results: RecognitionResults;
};

type RecognitionErrorEvent = {
  error?: string;
  message?: string;
};

type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;

  onstart: (() => void) | null;

  onresult:
    | ((event: RecognitionEvent) => void)
    | null;

  onerror:
    | ((event: RecognitionErrorEvent) => void)
    | null;

  onend: (() => void) | null;

  start: () => void;

  stop: () => void;

  abort?: () => void;
};

/* ========================================================================= */
/* ACTIVE RECOGNITION                                                        */
/* ========================================================================= */

let recognition: RecognitionInstance | null = null;

/* ========================================================================= */
/* LANGUAGE MAP                                                              */
/* ========================================================================= */

const languageMap: Record<string, string> = {
  en: "en-IN",

  as: "as-IN",
  bn: "bn-IN",
  brx: "br-IN",
  doi: "doi-IN",
  gu: "gu-IN",
  hi: "hi-IN",
  kn: "kn-IN",
  ks: "ks-IN",
  kok: "kok-IN",
  mai: "mai-IN",
  ml: "ml-IN",
  mni: "mni-IN",
  mr: "mr-IN",
  ne: "ne-IN",
  or: "or-IN",
  pa: "pa-IN",
  sa: "sa-IN",
  sat: "sat-IN",
  sd: "sd-IN",
  ta: "ta-IN",
  te: "te-IN",
  ur: "ur-IN",
};

/* ========================================================================= */
/* GET SPEECH LANGUAGE                                                       */
/* ========================================================================= */

export function getSpeechLanguage(
  language: string
): string {
  return (
    languageMap[language] ??
    "en-IN"
  );
}

/* ========================================================================= */
/* SPEECH RECOGNITION CONSTRUCTOR                                            */
/* ========================================================================= */

function getRecognitionConstructor():
  | (new () => RecognitionInstance)
  | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const speechWindow =
    window as Window & {
      SpeechRecognition?: new () => RecognitionInstance;

      webkitSpeechRecognition?: new () => RecognitionInstance;
    };

  return (
    speechWindow.SpeechRecognition ??
    speechWindow.webkitSpeechRecognition ??
    null
  );
}

/* ========================================================================= */
/* START LISTENING                                                           */
/* ========================================================================= */

export function startListening(
  language: SpeechLanguage,

  onResult: (
    result: SpeechResult
  ) => void,

  onStart?: () => void,

  onEnd?: () => void,

  onError?: (
    message: string
  ) => void
): void {

  stopListening();

  const Recognition =
    getRecognitionConstructor();

  if (!Recognition) {
    onError?.(
      "Speech recognition is not supported in this browser. Please use Google Chrome."
    );

    return;
  }

  try {

    const currentRecognition =
      new Recognition();

    recognition =
      currentRecognition;

    /* --------------------------------------------------------------------- */
    /* CONFIGURATION                                                         */
    /* --------------------------------------------------------------------- */

    currentRecognition.lang =
      language;

    currentRecognition.continuous =
      false;

    currentRecognition.interimResults =
      false;

    currentRecognition.maxAlternatives =
      1;

    /* --------------------------------------------------------------------- */
    /* START                                                                  */
    /* --------------------------------------------------------------------- */

    currentRecognition.onstart =
      () => {
        onStart?.();
      };

    /* --------------------------------------------------------------------- */
    /* RESULT                                                                 */
    /* --------------------------------------------------------------------- */

    currentRecognition.onresult =
      (event) => {

        const firstResult =
          event.results[0];

        if (!firstResult) {
          return;
        }

        const alternative =
          firstResult[0];

        if (!alternative) {
          return;
        }

        const transcript =
          alternative.transcript.trim();

        if (!transcript) {
          return;
        }

        onResult({
          transcript,

          confidence:
            typeof alternative.confidence ===
            "number"
              ? alternative.confidence
              : 0,
        });
      };

    /* --------------------------------------------------------------------- */
    /* ERROR                                                                  */
    /* --------------------------------------------------------------------- */

    currentRecognition.onerror =
      (event) => {

        const errorCode =
          event.error ??
          "";

        let message =
          event.message ??
          "";

        switch (errorCode) {

          case "not-allowed":
          case "service-not-allowed":

            message =
              "Microphone permission was denied. Please allow microphone access and try again.";

            break;

          case "audio-capture":

            message =
              "No microphone was detected. Please check your microphone.";

            break;

          case "no-speech":

            message =
              "No speech was detected. Please speak clearly and try again.";

            break;

          case "network":

            message =
              "Speech recognition needs a network connection in this browser.";

            break;

          case "aborted":

            message =
              "Speech recognition was stopped.";

            break;

          case "language-not-supported":

            message =
              "Speech recognition for this language is not supported by this browser.";

            break;

          default:

            if (!message) {
              message =
                "Unable to understand the audio. Please try again.";
            }

        }

        onError?.(message);
      };

    /* --------------------------------------------------------------------- */
    /* END                                                                    */
    /* --------------------------------------------------------------------- */

    currentRecognition.onend =
      () => {

        onEnd?.();

        if (
          recognition ===
          currentRecognition
        ) {
          recognition =
            null;
        }
      };

    /* --------------------------------------------------------------------- */
    /* START MICROPHONE                                                       */
    /* --------------------------------------------------------------------- */

    currentRecognition.start();

  } catch (error) {

    recognition =
      null;

    if (
      error instanceof DOMException &&
      error.name ===
        "InvalidStateError"
    ) {

      onError?.(
        "Speech recognition is already running. Please wait a moment and try again."
      );

      return;
    }

    onError?.(
      error instanceof Error
        ? error.message
        : "Unable to start speech recognition."
    );
  }
}

/* ========================================================================= */
/* STOP LISTENING                                                            */
/* ========================================================================= */

export function stopListening(): void {

  if (!recognition) {
    return;
  }

  const currentRecognition =
    recognition;

  recognition =
    null;

  try {

    if (
      typeof currentRecognition.abort ===
      "function"
    ) {

      currentRecognition.abort();

    } else {

      currentRecognition.stop();

    }

  } catch {
    // Recognition may already have ended.
  }
}

/* ========================================================================= */
/* GET SPEECH SYNTHESIS                                                      */
/* ========================================================================= */

function getSpeechSynthesis():
  | SpeechSynthesis
  | null {

  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  if (
    !("speechSynthesis" in window)
  ) {
    return null;
  }

  return window.speechSynthesis;
}

/* ========================================================================= */
/* FIND BEST VOICE                                                           */
/* ========================================================================= */

function findVoice(
  language: string
): SpeechSynthesisVoice | null {

  const synth =
    getSpeechSynthesis();

  if (!synth) {
    return null;
  }

  const voices =
    synth.getVoices();

  if (!voices.length) {
    return null;
  }

  const requested =
    language
      .trim()
      .toLowerCase();

  const baseLanguage =
    requested.split("-")[0];

  /* ----------------------------------------------------------------------- */
  /* EXACT LANGUAGE                                                          */
  /* ----------------------------------------------------------------------- */

  const exact =
    voices.find(
      (voice) =>
        voice.lang
          .toLowerCase() ===
        requested
    );

  if (exact) {
    return exact;
  }

  /* ----------------------------------------------------------------------- */
  /* SAME LANGUAGE                                                           */
  /* ----------------------------------------------------------------------- */

  const sameLanguage =
    voices.find(
      (voice) =>
        voice.lang
          .toLowerCase()
          .split("-")[0] ===
        baseLanguage
    );

  if (sameLanguage) {
    return sameLanguage;
  }

  /* ----------------------------------------------------------------------- */
  /* INDIAN VARIANT                                                          */
  /* ----------------------------------------------------------------------- */

  const indianVoice =
    voices.find(
      (voice) => {

        const voiceLanguage =
          voice.lang
            .toLowerCase();

        return (
          voiceLanguage ===
            `${baseLanguage}-in` ||
          voiceLanguage.startsWith(
            `${baseLanguage}-in-`
          )
        );
      }
    );

  if (indianVoice) {
    return indianVoice;
  }

  /* ----------------------------------------------------------------------- */
  /* DEFAULT VOICE                                                           */
  /* ----------------------------------------------------------------------- */

  return (
    voices.find(
      (voice) =>
        voice.default
    ) ??
    voices[0] ??
    null
  );
}

/* ========================================================================= */
/* SPEAK TEXT                                                                */
/* ========================================================================= */
/*
 * IMPORTANT:
 *
 * Do NOT wait for voiceschanged here.
 *
 * This function may be called directly from a button click.
 *
 * Safari can reject speech if speak() is delayed after
 * the user's interaction.
 */

export function speakText(
  text: string,
  language: SpeechLanguage
): void {

  const synth =
    getSpeechSynthesis();

  if (!synth) {

    console.error(
      "Speech synthesis is not supported."
    );

    return;
  }

  const cleanedText =
    text.trim();

  if (!cleanedText) {
    return;
  }

  /*
   * Stop previous speech.
   */

  synth.cancel();

  /*
   * IMPORTANT:
   *
   * Get the voice synchronously.
   *
   * Do not use setTimeout().
   * Do not wait for voiceschanged.
   */

  const voice =
    findVoice(language);

  /*
   * Create utterance immediately.
   */

  const utterance =
    new SpeechSynthesisUtterance(
      cleanedText
    );

  /*
   * Requested language.
   */

  utterance.lang =
    language;

  /*
   * Matching voice if available.
   */

  if (voice) {
    utterance.voice =
      voice;
  }

  /*
   * Patient-friendly speech.
   */

  utterance.rate =
    0.88;

  utterance.pitch =
    1;

  utterance.volume =
    1;

  /*
   * Debug information.
   */

  console.log(
    "MediKiosk Speech"
  );

  console.log(
    "Text:",
    cleanedText
  );

  console.log(
    "Requested language:",
    language
  );

  console.log(
    "Voice:",
    voice
      ? `${voice.name} (${voice.lang})`
      : "Browser default"
  );

  /*
   * Error handling.
   */

  utterance.onerror =
    (event) => {

      console.error(
        "Speech synthesis error:",
        event
      );

    };

  /*
   * START SPEECH IMMEDIATELY.
   */

  synth.speak(
    utterance
  );
}

/* ========================================================================= */
/* SPEAK TEXT WITH CALLBACKS                                                 */
/* ========================================================================= */

export function speakTextWithCallbacks(
  text: string,
  language: SpeechLanguage,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): void {

  const synth =
    getSpeechSynthesis();

  if (!synth) {
    onError?.();
    return;
  }

  const cleanedText =
    text.trim();

  if (!cleanedText) {
    onError?.();
    return;
  }

  /*
   * Stop existing speech.
   */

  synth.cancel();

  /*
   * Find voice synchronously.
   */

  const voice =
    findVoice(language);

  /*
   * Create utterance.
   */

  const utterance =
    new SpeechSynthesisUtterance(
      cleanedText
    );

  utterance.lang =
    language;

  if (voice) {
    utterance.voice =
      voice;
  }

  utterance.rate =
    0.88;

  utterance.pitch =
    1;

  utterance.volume =
    1;

  utterance.onstart =
    () => {
      onStart?.();
    };

  utterance.onend =
    () => {
      onEnd?.();
    };

  utterance.onerror =
    () => {
      onError?.();
    };

  /*
   * Speak immediately.
   */

  synth.speak(
    utterance
  );
}

/* ========================================================================= */
/* STOP SPEAKING                                                             */
/* ========================================================================= */

export function stopSpeaking(): void {

  const synth =
    getSpeechSynthesis();

  if (!synth) {
    return;
  }

  synth.cancel();
}

/* ========================================================================= */
/* CHECK SPEECH RECOGNITION SUPPORT                                          */
/* ========================================================================= */

export function isSpeechRecognitionSupported(): boolean {

  return (
    getRecognitionConstructor() !==
    null
  );
}

/* ========================================================================= */
/* CHECK SPEECH SYNTHESIS SUPPORT                                            */
/* ========================================================================= */

export function isSpeechSynthesisSupported(): boolean {

  return (
    getSpeechSynthesis() !==
    null
  );
}

/* ========================================================================= */
/* CHECK VOICE AVAILABILITY                                                  */
/* ========================================================================= */

export function isVoiceAvailable(
  language: SpeechLanguage
): boolean {

  return (
    findVoice(language) !==
    null
  );
}

/* ========================================================================= */
/* GET AVAILABLE VOICES                                                      */
/* ========================================================================= */

export function getAvailableVoices(): SpeechSynthesisVoice[] {

  const synth =
    getSpeechSynthesis();

  if (!synth) {
    return [];
  }

  return synth.getVoices();
}

/* ========================================================================= */
/* PRELOAD VOICES                                                            */
/* ========================================================================= */
/*
 * Optional.
 *
 * This can be called once when the application starts.
 *
 * It does NOT control the actual speech call.
 */

export function preloadSpeechVoices(): void {

  const synth =
    getSpeechSynthesis();

  if (!synth) {
    return;
  }

  /*
   * Force browser to initialize voices.
   */

  synth.getVoices();

  /*
   * Load asynchronously if browser provides
   * voices later.
   */

  const handleVoicesChanged =
    () => {

      synth.getVoices();

      synth.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );
    };

  synth.addEventListener(
    "voiceschanged",
    handleVoicesChanged
  );
}