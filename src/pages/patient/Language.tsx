import {
  ArrowLeft,
  ArrowRight,
  Volume2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  usePatientStore,
  type PatientLanguage,
} from "../../store/patientStore";

import { t } from "../../i18n/translations";

type LanguageOption = {
  id: PatientLanguage;
  nativeName: string;
  englishName: string;
};

/* ========================================================================= */
/* LANGUAGES                                                                 */
/* ========================================================================= */

const languages: LanguageOption[] = [
  {
    id: "en",
    nativeName: "English",
    englishName: "English",
  },

  {
    id: "hi",
    nativeName: "हिन्दी",
    englishName: "Hindi",
  },

  {
    id: "mr",
    nativeName: "मराठी",
    englishName: "Marathi",
  },

  {
    id: "kok",
    nativeName: "कोंकणी",
    englishName: "Konkani",
  },

  {
    id: "sa",
    nativeName: "संस्कृतम्",
    englishName: "Sanskrit",
  },

  {
    id: "sd",
    nativeName: "سنڌي",
    englishName: "Sindhi",
  },

  {
    id: "as",
    nativeName: "অসমীয়া",
    englishName: "Assamese",
  },

  {
    id: "bn",
    nativeName: "বাংলা",
    englishName: "Bengali",
  },

  {
    id: "brx",
    nativeName: "बड़ो",
    englishName: "Bodo",
  },

  {
    id: "doi",
    nativeName: "डोगरी",
    englishName: "Dogri",
  },

  {
    id: "gu",
    nativeName: "ગુજરાતી",
    englishName: "Gujarati",
  },

  {
    id: "kn",
    nativeName: "ಕನ್ನಡ",
    englishName: "Kannada",
  },

  {
    id: "ks",
    nativeName: "کٲشُر / कॉशुर",
    englishName: "Kashmiri",
  },

  {
    id: "mai",
    nativeName: "मैथिली",
    englishName: "Maithili",
  },

  {
    id: "ml",
    nativeName: "മലയാളം",
    englishName: "Malayalam",
  },

  {
    id: "mni",
    nativeName: "মৈতৈলোন্",
    englishName: "Manipuri",
  },

  {
    id: "ne",
    nativeName: "नेपाली",
    englishName: "Nepali",
  },

  {
    id: "or",
    nativeName: "ଓଡ଼ିଆ",
    englishName: "Odia",
  },

  {
    id: "pa",
    nativeName: "ਪੰਜਾਬੀ",
    englishName: "Punjabi",
  },

  {
    id: "sat",
    nativeName: "ᱥᱟᱱᱛᱟᱲᱤ",
    englishName: "Santali",
  },

  {
    id: "ta",
    nativeName: "தமிழ்",
    englishName: "Tamil",
  },

  {
    id: "te",
    nativeName: "తెలుగు",
    englishName: "Telugu",
  },

  {
    id: "ur",
    nativeName: "اردو",
    englishName: "Urdu",
  },
];

/* ========================================================================= */
/* SPEECH LANGUAGE MAP                                                       */
/* ========================================================================= */

const speechLocales: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  kok: "kok-IN",
  sa: "sa-IN",
  sd: "sd-IN",
  as: "as-IN",
  bn: "bn-IN",
  brx: "brx-IN",
  doi: "doi-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ks: "ks-IN",
  mai: "mai-IN",
  ml: "ml-IN",
  mni: "mni-IN",
  ne: "ne-NP",
  or: "or-IN",
  pa: "pa-IN",
  sat: "sat-IN",
  ta: "ta-IN",
  te: "te-IN",
  ur: "ur-IN",
};

/* ========================================================================= */
/* LANGUAGE PAGE                                                             */
/* ========================================================================= */

export default function Language() {
  const navigate = useNavigate();

  const language = usePatientStore(
    (state) => state.language
  );

  const setLanguage = usePatientStore(
    (state) => state.setLanguage
  );

  const selectedLanguage =
    languages.find(
      (item) => item.id === language
    ) ?? languages[0];

  /* ========================================================================= */
  /* SPEAK TEXT                                                               */
  /* ========================================================================= */

  function speakLanguage(
    selected: LanguageOption
  ) {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      console.error(
        "Speech synthesis is not supported in this browser."
      );

      return;
    }

    /*
     * Stop previous speech.
     */

    window.speechSynthesis.cancel();

    /*
     * Create speech.
     */

    const utterance =
      new SpeechSynthesisUtterance(
        selected.nativeName
      );

    /*
     * Set the appropriate language.
     */

    utterance.lang =
      speechLocales[selected.id] ??
      "en-IN";

    /*
     * Speech settings.
     */

    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    /*
     * Try to find a voice matching
     * the selected language.
     */

    const voices =
      window.speechSynthesis.getVoices();

    const targetLanguage =
      speechLocales[selected.id] ??
      "en-IN";

    const targetPrefix =
      targetLanguage
        .split("-")[0]
        .toLowerCase();

    /*
     * First try exact locale.
     */

    let voice =
      voices.find(
        (item) =>
          item.lang.toLowerCase() ===
          targetLanguage.toLowerCase()
      );

    /*
     * Then try language prefix.
     */

    if (!voice) {
      voice =
        voices.find(
          (item) =>
            item.lang
              .toLowerCase()
              .startsWith(
                targetPrefix
              )
        );
    }

    /*
     * Use matching voice if available.
     */

    if (voice) {
      utterance.voice = voice;
    }

    /*
     * Debug information.
     * Check your browser console if
     * speech still doesn't play.
     */

    console.log(
      "Speaking:",
      selected.englishName
    );

    console.log(
      "Text:",
      selected.nativeName
    );

    console.log(
      "Language:",
      utterance.lang
    );

    console.log(
      "Voice:",
      voice?.name ?? "Browser default"
    );

    /*
     * Speak.
     */

    window.speechSynthesis.speak(
      utterance
    );
  }

  /* ========================================================================= */
  /* SELECT LANGUAGE                                                          */
  /* ========================================================================= */

  function handleSelect(
    selected: LanguageOption
  ) {
    /*
     * Save selected language.
     */

    setLanguage(selected.id);

    /*
     * Immediately speak the selected
     * language.
     */

    speakLanguage(selected);
  }

  /* ========================================================================= */
  /* HEAR SELECTED LANGUAGE                                                    */
  /* ========================================================================= */

  function hearSelectedLanguage() {
    speakLanguage(selectedLanguage);
  }

  /* ========================================================================= */
  /* UI                                                                       */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#173F35]">

      <div className="min-h-screen p-2">

        <div
          className="
            relative
            min-h-[calc(100vh-16px)]
            overflow-hidden
            rounded-lg
            border
            border-[#DDD4C4]
            bg-[#F8F5ED]
          "
        >

          {/* ============================================================= */}
          {/* HEADER                                                         */}
          {/* ============================================================= */}

          <header
            className="
              relative
              z-20
              flex
              items-center
              justify-between
              px-7
              py-5
            "
          >

            {/* BACK */}

            <button
              type="button"
              onClick={() =>
                navigate("/patient")
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-[#DED5C6]
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-[#315C4D]
                shadow-sm
                transition
                hover:bg-[#F8F5ED]
              "
            >

              <ArrowLeft size={17} />

              {t(
                language,
                "back"
              )}

            </button>

            {/* =========================================================== */}
            {/* PROGRESS                                                      */}
            {/* =========================================================== */}

            <div
              className="
                absolute
                left-1/2
                top-5
                flex
                -translate-x-1/2
                items-center
                gap-2
              "
            >

              {Array.from({
                length: 8,
              }).map((_, index) => (

                <div
                  key={index}
                  className={`
                    h-2
                    rounded-full
                    ${
                      index === 0
                        ? "w-8 bg-[#174D3B]"
                        : "w-2 bg-[#D8D0C0]"
                    }
                  `}
                />

              ))}

            </div>

            {/* HELP */}

            <button
              type="button"
              onClick={
                hearSelectedLanguage
              }
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-[#315C4D]
                transition
                hover:text-[#174D3B]
              "
            >

              <Volume2 size={17} />

              {t(
                language,
                "help"
              )}

            </button>

          </header>

          {/* ============================================================= */}
          {/* MAIN CONTENT                                                    */}
          {/* ============================================================= */}

          <main
            className="
              relative
              z-10
              mx-auto
              max-w-6xl
              px-6
              pb-28
              pt-10
            "
          >

            {/* =========================================================== */}
            {/* TITLE                                                         */}
            {/* =========================================================== */}

            <div
              className="
                mx-auto
                max-w-5xl
                text-center
              "
            >

              <p
                className="
                  font-serif
                  text-lg
                  text-[#315C4D]
                "
              >
                {t(
                  language,
                  "namaste"
                )}
              </p>

              <h1
                className="
                  mt-3
                  font-serif
                  text-4xl
                  font-semibold
                  leading-tight
                  text-[#174638]
                  md:text-5xl
                "
              >
                {t(
                  language,
                  "selectLanguage"
                )}
              </h1>

              <p
                className="
                  mt-4
                  text-base
                  text-[#687970]
                "
              >
                {t(
                  language,
                  "comfortableLanguage"
                )}
              </p>

            </div>

            {/* =========================================================== */}
            {/* LANGUAGE GRID                                                 */}
            {/* =========================================================== */}

            <div
              className="
                mx-auto
                mt-10
                grid
                max-w-5xl
                grid-cols-2
                gap-4
                md:grid-cols-3
                lg:grid-cols-4
              "
            >

              {languages.map(
                (item) => {

                  const selected =
                    language === item.id;

                  return (

                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleSelect(item)
                      }
                      className={`
                        relative
                        min-h-[125px]
                        rounded-xl
                        border
                        p-5
                        text-center
                        transition-all
                        duration-200
                        ${
                          selected
                            ? `
                              border-[#245A47]
                              bg-[#E7F0E7]
                              shadow-[0_0_0_2px_rgba(36,90,71,0.12)]
                            `
                            : `
                              border-[#DED6C8]
                              bg-[#FBF8F2]
                              hover:-translate-y-0.5
                              hover:border-[#B8AA94]
                              hover:shadow-sm
                            `
                        }
                      `}
                    >

                      {/* ================================================= */}
                      {/* SELECTED DOT                                       */}
                      {/* ================================================= */}

                      {selected && (

                        <span
                          className="
                            absolute
                            right-4
                            top-4
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-[#245A47]
                          "
                        />

                      )}

                      {/* ================================================= */}
                      {/* LANGUAGE ICON                                      */}
                      {/* ================================================= */}

                      <div
                        className={`
                          mx-auto
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          text-xl
                          font-semibold
                          ${
                            selected
                              ? "bg-[#285E49] text-white"
                              : "bg-[#F0EAE1] text-[#315C4D]"
                          }
                        `}
                      >

                        {item.nativeName.charAt(0)}

                      </div>

                      {/* ================================================= */}
                      {/* NATIVE NAME                                        */}
                      {/* ================================================= */}

                      <p
                        className={`
                          mt-4
                          font-serif
                          text-lg
                          font-semibold
                          ${
                            selected
                              ? "text-[#174638]"
                              : "text-[#315C4D]"
                          }
                        `}
                      >

                        {item.nativeName}

                      </p>

                      {/* ================================================= */}
                      {/* ENGLISH NAME                                       */}
                      {/* ================================================= */}

                      <p
                        className="
                          mt-1
                          text-xs
                          text-[#7A8780]
                        "
                      >

                        {item.englishName}

                      </p>

                    </button>

                  );
                }
              )}

            </div>

            {/* =========================================================== */}
            {/* SELECTED LANGUAGE BAR                                        */}
            {/* =========================================================== */}

            <div
              className="
                mx-auto
                mt-8
                flex
                max-w-5xl
                items-center
                justify-between
                rounded-xl
                border
                border-[#D3E2D7]
                bg-[#E7F1EA]
                px-5
                py-4
              "
            >

              {/* SELECTED LANGUAGE */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={
                    hearSelectedLanguage
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#285E49]
                    text-white
                    transition
                    hover:bg-[#174D3B]
                  "
                  aria-label="Hear selected language"
                >

                  <Volume2 size={20} />

                </button>

                <div className="text-left">

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#5D776B]
                    "
                  >

                    {t(
                      language,
                      "selectedLanguage"
                    )}

                  </p>

                  <p
                    className="
                      mt-1
                      font-medium
                      text-[#245A47]
                    "
                  >

                    {selectedLanguage.nativeName}

                    <span
                      className="
                        text-[#718078]
                      "
                    >

                      {" "}
                      (
                      {
                        selectedLanguage
                          .englishName
                      }
                      )

                    </span>

                  </p>

                </div>

              </div>

              {/* ========================================================= */}
              {/* CONTINUE                                                  */}
              {/* ========================================================= */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/patient/identify"
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-[#174D3B]
                  px-7
                  py-4
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#123E30]
                "
              >

                {t(
                  language,
                  "continue"
                )}

                <ArrowRight size={19} />

              </button>

            </div>

          </main>

          {/* ============================================================= */}
          {/* BOTTOM LEFT DECORATION                                         */}
          {/* ============================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-25px]
              left-[-15px]
              h-28
              w-16
              rotate-[-20deg]
              rounded-[100%_0_100%_0]
              bg-[#DCE3D5]
              opacity-80
            "
          />

          {/* ============================================================= */}
          {/* BOTTOM RIGHT DECORATION                                        */}
          {/* ============================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-25px]
              right-[-10px]
              h-32
              w-20
              rotate-[30deg]
              rounded-[100%_0_100%_0]
              bg-[#C4D0BD]
              opacity-70
            "
          />

        </div>

      </div>

    </div>
  );
}