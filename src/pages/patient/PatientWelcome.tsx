import {
  UserRound,
  Stethoscope,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import KioskLayout from "../../components/common/KioskLayout";

import { usePatientStore } from "../../store/patientStore";
import { t } from "../../i18n/translations";

function PortalCard({
  icon: Icon,
  title,
  description,
  onClick,
  accent = "green",
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  onClick: () => void;
  accent?: "green" | "terracotta" | "blue";
}) {
  const backgrounds = {
    green: "bg-[#E5EFE3]",
    terracotta: "bg-[#F1E4D8]",
    blue: "bg-[#E8EAF1]",
  };

  const iconColors = {
    green: "text-[#315C4D]",
    terracotta: "text-[#A85C3A]",
    blue: "text-[#4C598B]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex min-h-[165px] flex-col justify-between rounded-xl border border-[#D9D1C1] bg-[#F9F6EE] p-5 text-left shadow-[0_2px_8px_rgba(60,50,30,0.04)] transition hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(60,50,30,0.08)]"
    >
      {/* ICON */}

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${backgrounds[accent]} ${iconColors[accent]}`}
      >
        <Icon
          size={23}
          strokeWidth={1.8}
        />
      </div>

      {/* TEXT */}

      <div>
        <h3 className="font-serif text-[17px] font-semibold text-[#263F36]">
          {title}
        </h3>

        <p className="mt-1 text-[10px] leading-4 text-[#69756F]">
          {description}
        </p>
      </div>

      {/* ARROW */}

      <div className="flex items-center gap-1 text-xs font-semibold text-[#315C4D]">
        <span>→</span>
      </div>
    </button>
  );
}

export default function PatientWelcome() {
  const navigate = useNavigate();

  /*
   * Global patient language.
   *
   * This value is stored in Zustand and persists
   * throughout the patient journey.
   */
  const language = usePatientStore(
    (state) => state.language
  );

  /*
   * Convert language code into a readable display code.
   *
   * Example:
   * en → EN
   * hi → HI
   * mr → MR
   */
  const languageCode =
    language.toUpperCase();

  return (
    <KioskLayout>

      <div className="mx-auto min-h-screen max-w-[1500px] px-2 py-2">

        <div className="relative min-h-[calc(100vh-16px)] overflow-hidden rounded-lg border border-[#DDD4C4] bg-[#F7F3E9]">

          {/* =============================================================== */}
          {/* HEADER                                                          */}
          {/* =============================================================== */}

          <header className="relative z-10 flex items-start justify-between px-7 py-4">

            {/* LOGO */}

            <div>

              <h1 className="font-serif text-[23px] font-bold leading-none text-[#173F35]">
                MediKiosk
              </h1>

              <p className="mt-1 text-[9px] text-[#68776F]">
                {t(
                  language,
                  "platformSubtitle"
                )}
              </p>

            </div>

            {/* LANGUAGE */}

            <button
              type="button"
              onClick={() =>
                navigate("/patient/language")
              }
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#314C43] transition hover:bg-[#EEE8DB]"
              aria-label={t(
                language,
                "selectLanguage"
              )}
            >
              {languageCode}

              <span>
                ⌄
              </span>
            </button>

          </header>

          {/* =============================================================== */}
          {/* MAIN                                                            */}
          {/* =============================================================== */}

          <main className="relative z-10 px-7 pb-24 pt-10">

            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">

              {/* =========================================================== */}
              {/* LEFT                                                         */}
              {/* =========================================================== */}

              <div className="max-w-[550px]">

                {/* SECTION LABEL */}

                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A85C3A]">
                  {t(
                    language,
                    "ayurvedaClinicalHistory"
                  )}
                </p>

                {/* MAIN HEADING */}

                <h2 className="font-serif text-[48px] font-bold leading-[1.02] tracking-[-0.02em] text-[#173F35] md:text-[58px]">

                  {t(
                    language,
                    "yourStory"
                  )}

                  <br />

                  {t(
                    language,
                    "betterCare"
                  )}

                </h2>

                {/* DESCRIPTION */}

                <p className="mt-5 max-w-[400px] text-[14px] leading-6 text-[#5E6E66]">
                  {t(
                    language,
                    "completeHistoryBeforeDoctor"
                  )}
                </p>

                {/* ========================================================= */}
                {/* PORTAL CARDS                                                */}
                {/* ========================================================= */}

                <div className="mt-9 grid max-w-[580px] grid-cols-3 gap-3">

                  {/* ======================================================= */}
                  {/* PATIENT                                                   */}
                  {/* ======================================================= */}

                  <PortalCard
                    icon={UserRound}
                    title={t(
                      language,
                      "patientKiosk"
                    )}
                    description={t(
                      language,
                      "startHealthJourney"
                    )}
                    onClick={() =>
                      navigate(
                        "/patient/language"
                      )
                    }
                    accent="green"
                  />

                  {/* ======================================================= */}
                  {/* DOCTOR                                                    */}
                  {/* ======================================================= */}

                  <PortalCard
                    icon={Stethoscope}
                    title={t(
                      language,
                      "doctorPortal"
                    )}
                    description={t(
                      language,
                      "reviewManagePatients"
                    )}
                    onClick={() =>
                      navigate("/doctor")
                    }
                    accent="terracotta"
                  />

                  {/* ======================================================= */}
                  {/* ADMIN                                                     */}
                  {/* ======================================================= */}

                  <PortalCard
                    icon={Settings}
                    title={t(
                      language,
                      "adminPortal"
                    )}
                    description={t(
                      language,
                      "systemConfiguration"
                    )}
                    onClick={() =>
                      navigate("/admin")
                    }
                    accent="terracotta"
                  />

                </div>

              </div>

              {/* =========================================================== */}
              {/* RIGHT BOTANICAL ILLUSTRATION                                */}
              {/* =========================================================== */}

              <div className="relative hidden h-[390px] lg:block">

                <div className="absolute right-8 top-2 h-[360px] w-[280px]">

                  {/* STEM */}

                  <div className="botanical-stem bottom-8 left-1/2" />

                  {/* LEAF DECORATION */}

                  <div className="leaf-decoration bottom-20 left-20">

                    <div className="leaf" />
                    <div className="leaf" />
                    <div className="leaf" />
                    <div className="leaf" />

                  </div>

                  {/* LARGE BOTANICAL SHAPES */}

                  <div className="absolute right-8 top-10 h-36 w-20 rotate-[22deg] rounded-[100%_0_100%_0] bg-[#C7D2BF]" />

                  <div className="absolute right-28 top-28 h-44 w-24 rotate-[-18deg] rounded-[100%_0_100%_0] bg-[#A8BCA4]" />

                  <div className="absolute right-2 top-48 h-32 w-16 rotate-[40deg] rounded-[100%_0_100%_0] bg-[#D2DACB]" />

                  {/* ========================================================= */}
                  {/* BOWL                                                      */}
                  {/* ========================================================= */}

                  <div className="absolute bottom-2 right-10 h-20 w-56 rounded-[50%] bg-[#C58A68]" />

                  <div className="absolute bottom-10 right-5 h-12 w-64 rounded-[50%] border-[7px] border-[#B97655] bg-[#D19B7B]" />

                  {/* ========================================================= */}
                  {/* SMALL HERBS                                               */}
                  {/* ========================================================= */}

                  <div className="absolute bottom-20 right-24 h-24 w-3 rotate-[25deg] rounded-full bg-[#7E997B]" />

                  <div className="absolute bottom-24 right-32 h-20 w-3 rotate-[-25deg] rounded-full bg-[#7E997B]" />

                </div>

              </div>

            </div>

            {/* ============================================================= */}
            {/* BOTTOM STRIP                                                  */}
            {/* ============================================================= */}

            <div className="mt-12 border-t border-[#DDD4C4] pt-4">

              <div className="grid grid-cols-3 divide-x divide-[#DDD4C4] text-center">

                {/* ========================================================= */}
                {/* TRADITIONAL WISDOM                                         */}
                {/* ========================================================= */}

                <div className="py-2">

                  <p className="font-serif text-[15px] font-semibold text-[#263F36]">
                    {t(
                      language,
                      "traditionalWisdom"
                    )}
                  </p>

                  <p className="mt-1 text-[10px] text-[#69756F]">
                    {t(
                      language,
                      "rootedInAyurveda"
                    )}
                  </p>

                </div>

                {/* ========================================================= */}
                {/* MODERN TECHNOLOGY                                          */}
                {/* ========================================================= */}

                <div className="py-2">

                  <p className="font-serif text-[15px] font-semibold text-[#263F36]">
                    {t(
                      language,
                      "modernTechnology"
                    )}
                  </p>

                  <p className="mt-1 text-[10px] text-[#69756F]">
                    {t(
                      language,
                      "smarterHealthcare"
                    )}
                  </p>

                </div>

                {/* ========================================================= */}
                {/* HEALTHIER TOMORROW                                        */}
                {/* ========================================================= */}

                <div className="py-2">

                  <p className="font-serif text-[15px] font-semibold text-[#263F36]">
                    {t(
                      language,
                      "healthierTomorrow"
                    )}
                  </p>

                  <p className="mt-1 text-[10px] text-[#69756F]">
                    {t(
                      language,
                      "forABrighterYou"
                    )}
                  </p>

                </div>

              </div>

            </div>

          </main>

          {/* =============================================================== */}
          {/* BOTTOM DECORATIVE LEAVES                                        */}
          {/* =============================================================== */}

          <div className="absolute bottom-[-20px] left-[-20px] z-10 h-28 w-28 rotate-[-25deg] rounded-[100%_0_100%_0] bg-[#DCE3D5] opacity-70" />

          <div className="absolute bottom-[-25px] right-[-10px] z-10 h-32 w-20 rotate-[30deg] rounded-[100%_0_100%_0] bg-[#BFCDBA] opacity-60" />

        </div>

      </div>

    </KioskLayout>
  );
}