import type { ReactNode } from "react";

import {
  ArrowRight,
  Globe2,
  Heart,
  Leaf,
  Settings,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { usePatientStore } from "../store/patientStore";

import heroImage from "../assets/ayurveda-hero-right.png";

/* ========================================================================= */
/* HOME PAGE                                                                 */
/* ========================================================================= */

export default function Home() {
  const navigate = useNavigate();

  const language = usePatientStore(
    (state) => state.language
  );

  const setLanguage = usePatientStore(
    (state) => state.setLanguage
  );

  const languages = [
    { id: "en", label: "EN" },
    { id: "hi", label: "हिंदी" },
    { id: "mr", label: "मराठी" },
  ] as const;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F4EA] text-[#173F35]">

      {/* ================================================================= */}
      {/* DECORATIVE BACKGROUND                                             */}
      {/* ================================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Bottom soft wave */}

        <div className="absolute bottom-[-160px] left-[-5%] h-[300px] w-[75%] rounded-[50%] bg-[#EEF0E1]" />

        <div className="absolute bottom-[-210px] left-[15%] h-[260px] w-[70%] rounded-[50%] bg-[#F0F1E5]" />

        {/* Bottom-left botanical decoration */}

        <div className="absolute bottom-[-55px] left-[-30px] rotate-[-18deg] opacity-70">

          <Leaf
            size={170}
            strokeWidth={1}
            className="text-[#B9CBB1]"
          />

        </div>

        <div className="absolute bottom-[20px] left-[105px] rotate-[28deg] opacity-40">

          <Leaf
            size={85}
            strokeWidth={1}
            className="text-[#9EB99F]"
          />

        </div>

      </div>


      {/* ================================================================= */}
      {/* HEADER                                                             */}
      {/* ================================================================= */}

      <header className="relative z-20 flex h-[82px] items-center justify-between px-8 md:px-12 lg:px-[50px]">

        {/* LOGO */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-start gap-2 text-left"
        >

          <Leaf
            size={34}
            strokeWidth={2.2}
            className="mt-1 rotate-[-15deg] text-[#2E765B]"
          />

          <div>

            <div className="font-serif text-[27px] font-semibold leading-none tracking-[-0.02em] text-[#174638]">
              MediKiosk
            </div>

            <div className="mt-1 text-[10px] font-medium tracking-[0.01em] text-[#68756E]">
              AI-Powered Ayurveda Clinical History Platform
            </div>

          </div>

        </button>


        {/* LANGUAGE */}

        <div className="relative flex items-center gap-2">

          <Globe2
            size={19}
            strokeWidth={1.8}
            className="text-[#234D40]"
          />

          <select
            value={language}
            onChange={(event) =>
              setLanguage(
                event.target.value as typeof language
              )
            }
            className="cursor-pointer appearance-none bg-transparent pr-5 text-sm font-medium text-[#234D40] outline-none"
            aria-label="Select language"
          >

            {languages.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.label}
              </option>
            ))}

          </select>

          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-[#52675F]">
            ⌄
          </span>

        </div>

      </header>


      {/* ================================================================= */}
      {/* MAIN HERO                                                         */}
      {/* ================================================================= */}

      <main className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12 lg:px-[50px]">

        <section className="relative min-h-[calc(100vh-82px)]">


          {/* ============================================================= */}
          {/* LEFT CONTENT                                                   */}
          {/* ============================================================= */}

          <div className="relative z-10 w-full pt-[30px] lg:w-[57%] lg:pt-[40px]">

            {/* EYEBROW */}

            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#B5684C]">
              AYURVEDA CLINICAL HISTORY
            </p>


            {/* MAIN TITLE */}

            <h1 className="mt-4 max-w-[620px] font-serif text-[53px] font-semibold leading-[0.98] tracking-[-0.035em] text-[#174638] md:text-[62px] lg:text-[60px]">

              Your Story.
              <br />

              Better Care.

            </h1>


            {/* SUBTITLE */}

            <p className="mt-5 max-w-[520px] text-[19px] font-medium leading-7 text-[#5E6D66]">

              Complete your Ayurvedic health history
              <br className="hidden md:block" />

              before meeting your doctor.

            </p>


            {/* =========================================================== */}
            {/* PORTAL CARDS                                                  */}
            {/* =========================================================== */}

            <div className="mt-7 grid max-w-[635px] grid-cols-1 gap-4 sm:grid-cols-3">


              {/* PATIENT */}

              <PortalCard
                icon={
                  <UserRound
                    size={27}
                    strokeWidth={1.8}
                  />
                }
                title="Patient Kiosk"
                subtitle="Start Your Health Journey"
                variant="green"
                onClick={() =>
                  navigate("/patient")
                }
              />


              {/* DOCTOR */}

              <PortalCard
                icon={
                  <Stethoscope
                    size={27}
                    strokeWidth={1.8}
                  />
                }
                title="Doctor Portal"
                subtitle="Review & Manage Patients"
                variant="terracotta"
                onClick={() =>
                  window.open(
                    "/doctor",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />


              {/* ADMIN */}

              <PortalCard
                icon={
                  <Settings
                    size={27}
                    strokeWidth={1.8}
                  />
                }
                title="Admin Portal"
                subtitle="System Configuration"
                variant="terracotta"
                onClick={() =>
                  window.open(
                    "/admin",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />

            </div>

          </div>


          {/* ============================================================= */}
          {/* RIGHT AYURVEDA VISUAL                                          */}
          {/* ============================================================= */}

          <div className="pointer-events-none absolute right-[-40px] top-[-5px] hidden h-[570px] w-[51%] lg:block">

            {/* Soft circular background */}

            <div className="absolute right-[-25px] top-[5px] h-[555px] w-[555px] rounded-full bg-[#E6E9D8]" />


            {/* Image */}

            <img
              src={heroImage}
              alt=""
              className="absolute right-[-5px] top-[15px] h-[510px] w-[445px] rounded-l-[260px] object-cover object-left opacity-[0.96]"
            />


            {/* RIGHT VERTICAL MESSAGE */}

            <div className="absolute right-[0px] top-[155px] z-10 flex items-center gap-4">

              <div className="h-[105px] w-px bg-[#89978E]" />

              <div className="space-y-3 text-[11px] font-medium tracking-[0.18em] text-[#66746D]">

                <div>BALANCE</div>

                <div>HEAL</div>

                <div>NATURALLY</div>

                <div>LIVE BETTER</div>

              </div>

            </div>

          </div>


          {/* ============================================================= */}
          {/* BOTTOM BENEFITS                                                */}
          {/* ============================================================= */}

          <div className="absolute bottom-[88px] left-0 right-0 hidden border-t border-[#DDDCCD] pt-5 lg:block">

            <div className="grid grid-cols-3">

              {/* TRADITIONAL WISDOM */}

              <Benefit
                icon={
                  <Leaf
                    size={25}
                    strokeWidth={1.8}
                  />
                }
                title="Traditional Wisdom"
                subtitle="Rooted in Ayurveda"
              />


              {/* MODERN TECHNOLOGY */}

              <Benefit
                icon={
                  <Settings
                    size={24}
                    strokeWidth={1.9}
                  />
                }
                title="Modern Technology"
                subtitle="Smarter Healthcare"
                bordered
              />


              {/* HEALTHIER TOMORROW */}

              <Benefit
                icon={
                  <Heart
                    size={23}
                    strokeWidth={1.8}
                  />
                }
                title="Healthier Tomorrow"
                subtitle="For a Brighter You"
              />

            </div>

          </div>


          {/* ============================================================= */}
          {/* YOUR HEALTH, OUR PRIORITY                                      */}
          {/* ============================================================= */}

          <div className="absolute bottom-[37px] left-0 right-0 hidden items-center justify-center lg:flex">

            <div className="flex items-center justify-center gap-[27px]">

              {/* LEFT LINE */}

              <div className="h-px w-[80px] bg-[#AEB4AD]" />


              {/* CENTER TEXT */}

              <p className="m-0 font-serif text-[22px] font-medium tracking-[0.01em] text-[#69716C]">

                Your Health, Our Priority

              </p>


              {/* RIGHT LINE */}

              <div className="h-px w-[80px] bg-[#AEB4AD]" />

            </div>

          </div>


          {/* ============================================================= */}
          {/* DEVELOPED BY THE SYNERGIST                                     */}
          {/* ============================================================= */}

          <div className="absolute bottom-[8px] left-0 right-0 hidden justify-center lg:flex">

            <p className="m-0 text-[12px] font-medium tracking-[0.06em] text-[#7A827D]">

              Developed by{" "}

              <span className="font-semibold text-[#A85C3A]">

                The Synergist!

              </span>

            </p>

          </div>


          {/* ============================================================= */}
          {/* MOBILE FOOTER                                                 */}
          {/* ============================================================= */}

          <div className="mt-16 pb-8 lg:hidden">

            {/* BENEFITS */}

            <div className="space-y-5 border-t border-[#DDDCCD] pt-6">

              <Benefit
                icon={
                  <Leaf
                    size={24}
                    strokeWidth={1.8}
                  />
                }
                title="Traditional Wisdom"
                subtitle="Rooted in Ayurveda"
              />

              <Benefit
                icon={
                  <Settings
                    size={24}
                    strokeWidth={1.8}
                  />
                }
                title="Modern Technology"
                subtitle="Smarter Healthcare"
              />

              <Benefit
                icon={
                  <Heart
                    size={23}
                    strokeWidth={1.8}
                  />
                }
                title="Healthier Tomorrow"
                subtitle="For a Brighter You"
              />

            </div>


            {/* PRIORITY */}

            <div className="mt-9 flex items-center justify-center gap-3">

              <div className="h-px w-[35px] bg-[#AEB4AD]" />

              <p className="font-serif text-[17px] text-[#69716C]">
                Your Health, Our Priority
              </p>

              <div className="h-px w-[35px] bg-[#AEB4AD]" />

            </div>


            {/* CREDIT */}

            <p className="mt-5 text-center text-[11px] tracking-[0.06em] text-[#7A827D]">

              Developed by{" "}

              <span className="font-semibold text-[#A85C3A]">
                The Synergist!
              </span>

            </p>

          </div>

        </section>

      </main>

    </div>
  );
}


/* ========================================================================= */
/* PORTAL CARD                                                              */
/* ========================================================================= */

function PortalCard({
  icon,
  title,
  subtitle,
  variant,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  variant: "green" | "terracotta";
  onClick: () => void;
}) {
  const isGreen = variant === "green";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group min-h-[176px] rounded-[10px] border p-5 text-left shadow-[0_3px_12px_rgba(45,63,53,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(45,63,53,0.09)] ${
        isGreen
          ? "border-[#D7DED5] bg-[#F5F6EF]"
          : "border-[#E5D8CB] bg-[#FBF3E9]"
      }`}
    >

      {/* ICON */}

      <div
        className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] ${
          isGreen
            ? "bg-[#E3EEE6] text-[#24664F]"
            : "bg-[#F5E6D8] text-[#A66040]"
        }`}
      >

        {icon}

      </div>


      {/* TEXT */}

      <div className="mt-4">

        <h2 className="font-serif text-[18px] font-semibold text-[#234A3D]">
          {title}
        </h2>

        <p className="mt-1 text-[12px] leading-5 text-[#6E7872]">
          {subtitle}
        </p>

      </div>


      {/* ARROW */}

      <div
        className={`mt-3 flex items-center transition-transform duration-200 group-hover:translate-x-1 ${
          isGreen
            ? "text-[#315E4E]"
            : "text-[#A46042]"
        }`}
      >

        <ArrowRight
          size={18}
          strokeWidth={1.8}
        />

      </div>

    </button>
  );
}


/* ========================================================================= */
/* BENEFIT                                                                  */
/* ========================================================================= */

function Benefit({
  icon,
  title,
  subtitle,
  bordered = false,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-4 px-7 ${
        bordered
          ? "border-x border-[#D8D9CD]"
          : ""
      }`}
    >

      {/* ICON */}

      <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-full bg-[#E5ECE2] text-[#2A6D56]">

        {icon}

      </div>


      {/* TEXT */}

      <div>

        <div className="font-serif text-[15px] font-semibold text-[#294E42]">
          {title}
        </div>

        <div className="mt-0.5 text-[11px] text-[#727C76]">
          {subtitle}
        </div>

      </div>

    </div>
  );
}