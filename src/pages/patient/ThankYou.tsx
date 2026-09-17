import {
  Check,
  FileText,
  Home,
  Info,
  Leaf,
  Users,
  ShieldCheck,
} from "lucide-react";

import type { ReactNode } from "react";

import { useNavigate } from "react-router-dom";

import { usePatientStore } from "../../store/patientStore";

export default function ThankYou() {
  const navigate = useNavigate();

  const tokenNumber = usePatientStore(
    (state) => state.tokenNumber
  );

  const resetPatientSession =
    usePatientStore(
      (state) => state.resetPatientSession
    );

  const returnHome = () => {
    resetPatientSession();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F6F2E8] px-3 py-3 text-[#174D3B] md:px-5 md:py-4">

      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}

      <main
        className="
          relative
          mx-auto
          w-full
          max-w-[1400px]
          overflow-hidden
          rounded-[20px]
          bg-[#FFFDF9]
          px-5
          py-5
          shadow-sm
          md:px-8
          md:py-5
          lg:px-10
        "
      >

        {/* =======================================================
            TOP LEFT BRANDING
        ======================================================= */}

        <div className="absolute left-7 top-5 z-10 md:left-10 md:top-6">

          <div className="font-serif text-[25px] font-semibold leading-none text-[#174D3B] md:text-[28px]">
            MediKiosk
          </div>

          <div className="mt-1 text-[8px] font-medium tracking-wide text-[#65756E] md:text-[9px]">
            AI-Powered Ayurveda Clinical History Platform
          </div>

        </div>

        {/* =======================================================
            SUCCESS SECTION
        ======================================================= */}

        <section
          className="
            relative
            z-10
            mx-auto
            max-w-[1000px]
            pt-[70px]
            text-center
            md:pt-[66px]
          "
        >

          {/* =====================================================
              SUCCESS ICON
              NO LEAVES AROUND THE CHECK ICON
          ===================================================== */}

          <div className="relative mx-auto flex h-[92px] w-[92px] items-center justify-center md:h-[100px] md:w-[100px]">

            {/* Pale outer circle */}

            <div className="absolute inset-0 rounded-full bg-[#EAF1E9]" />

            {/* Decorative dots */}

            <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-[#6AA88A]" />

            <div className="absolute right-0 top-6 h-2.5 w-2.5 rounded-full bg-[#174D3B]" />

            <div className="absolute bottom-1 left-2 h-2.5 w-2.5 rounded-full bg-[#6AA88A]" />

            {/* Green check circle */}

            <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#174D3B] shadow-md md:h-[74px] md:w-[74px]">

              <Check
                size={38}
                strokeWidth={3}
                className="text-white md:h-[41px] md:w-[41px]"
              />

            </div>

          </div>

          {/* =====================================================
              TITLE
          ===================================================== */}

          <h1 className="mt-2 font-serif text-[42px] font-semibold leading-none text-[#174D3B] md:text-[48px]">
            Thank You!
          </h1>

          <p className="mt-1.5 font-serif text-[19px] font-semibold leading-tight text-[#174D3B] md:text-[22px]">
            Your response has been recorded.
          </p>

          {/* =====================================================
              TOKEN
          ===================================================== */}

          <p className="mt-3 text-[12px] font-medium text-[#697770] md:text-[13px]">
            Your token number is
          </p>

          <div className="mx-auto mt-1.5 flex h-[50px] w-[225px] items-center justify-center rounded-[13px] bg-[#EAF1EB]">

            <span className="text-[32px] font-bold tracking-[0.08em] text-[#174D3B] md:text-[35px]">
              {tokenNumber || "A000"}
            </span>

          </div>

        </section>

        {/* =======================================================
            SUBMITTED CARD
            CENTERED BELOW TOKEN
        ======================================================= */}

        <section className="relative z-10 mx-auto mt-4 max-w-[1120px]">

          <div
            className="
              relative
              flex
              min-h-[76px]
              items-center
              justify-center
              overflow-hidden
              rounded-[15px]
              bg-[#EFF6F1]
              px-6
              py-3
            "
          >

            {/* Decorative leaf on card */}

            <Leaf
              size={60}
              strokeWidth={0.9}
              className="
                pointer-events-none
                absolute
                -right-1
                bottom-[-17px]
                rotate-[20deg]
                text-[#9AB69B]
                opacity-35
              "
            />

            {/* =================================================
                CENTERED CONTENT GROUP
            ================================================= */}

            <div className="flex w-fit items-center justify-center gap-4">

              {/* ICON */}

              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#E0F0E5] text-[#174D3B]">

                <FileText
                  size={27}
                  strokeWidth={1.8}
                />

              </div>

              {/* TEXT */}

              <div className="flex flex-col justify-center text-left">

                <h2 className="font-serif text-[20px] font-semibold leading-[1.1] text-[#174D3B] md:text-[22px]">
                  Submitted
                </h2>

                <p className="mt-1 text-[12px] leading-[1.4] text-[#66766F] md:text-[13px]">
                  Your health information has been saved successfully.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =======================================================
            CONSULTATION INFORMATION
        ======================================================= */}

        <section className="relative z-10 mx-auto mt-2.5 max-w-[1120px]">

          <div
            className="
              relative
              flex
              min-h-[76px]
              items-center
              justify-center
              overflow-hidden
              rounded-[15px]
              bg-[#FFF4E7]
              px-6
              py-3
            "
          >

            {/* Decorative leaf */}

            <Leaf
              size={58}
              strokeWidth={0.9}
              className="
                pointer-events-none
                absolute
                -right-1
                bottom-[-16px]
                rotate-[25deg]
                text-[#D7B99A]
                opacity-30
              "
            />

            {/* Centered content */}

            <div className="flex w-fit items-center justify-center gap-4">

              {/* INFO ICON */}

              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#F8E5D0] text-[#A85C3A]">

                <Info
                  size={27}
                  strokeWidth={2}
                />

              </div>

              {/* TEXT */}

              <div className="flex flex-col justify-center text-left">

                <p className="font-serif text-[16px] font-semibold leading-[1.15] text-[#963F20] md:text-[18px]">
                  Please wait in the consultation area.
                  You will be called shortly.
                </p>

                <p className="mt-1 text-[11px] leading-[1.35] text-[#68746D] md:text-[12px]">
                  If you have any urgent concerns, please inform
                  the staff at the reception.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =======================================================
            RETURN HOME
        ======================================================= */}

        <div className="relative z-10 mt-3 flex justify-center">

          <button
            type="button"
            onClick={returnHome}
            className="
              inline-flex
              h-[48px]
              min-w-[300px]
              items-center
              justify-center
              gap-2.5
              rounded-[12px]
              bg-[#174D3B]
              px-7
              text-[14px]
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#123E30]
              md:h-[50px]
              md:min-w-[320px]
              md:text-[15px]
            "
          >

            <Home
              size={19}
              strokeWidth={2}
            />

            <span>
              Return to Home
            </span>

            <span className="text-[19px] leading-none">
              →
            </span>

          </button>

        </div>

        {/* =======================================================
            BENEFITS
        ======================================================= */}

        <section className="relative z-10 mx-auto mt-3 max-w-[1140px] border-t border-[#DDD8CB] pt-3">

          <div className="grid md:grid-cols-3">

            {/* ===================================================
                DATA SAFE
            =================================================== */}

            <Benefit
              icon={
                <ShieldCheck
                  size={22}
                  strokeWidth={1.8}
                />
              }
              title="Your data is safe"
              description="Secure & confidential"
            />

            {/* ===================================================
                BETTER CARE
            =================================================== */}

            <Benefit
              icon={
                <Leaf
                  size={22}
                  strokeWidth={1.8}
                />
              }
              title="For better care"
              description="Helps us provide personalized Ayurveda guidance"
            />

            {/* ===================================================
                WELLNESS
            =================================================== */}

            <Benefit
              icon={
                <Users
                  size={22}
                  strokeWidth={1.8}
                />
              }
              title="Together for wellness"
              description="Your story helps us serve you better"
            />

          </div>

        </section>

        {/* =======================================================
            DIVIDER
        ======================================================= */}

        <div className="relative z-10 mx-auto mt-2.5 max-w-[1140px] border-t border-[#DDD8CB]" />

        {/* =======================================================
            THANK YOU FOR CHOOSING MEDIKIOSK
        ======================================================= */}

        <div className="relative z-10 mt-2.5 text-center">

          <p className="font-serif text-[19px] font-semibold leading-tight text-[#174D3B] md:text-[21px]">
            Thank you for choosing MediKiosk
          </p>

        </div>

        {/* =======================================================
            HEALTH PRIORITY
        ======================================================= */}

        <div className="relative z-10 mt-1.5 flex items-center justify-center gap-3">

          <div className="h-px w-[60px] bg-[#D4D0C4] md:w-[75px]" />

          <span className="font-serif text-[10px] text-[#7B8179] md:text-[11px]">
            Your Health, Our Priority
          </span>

          <div className="h-px w-[60px] bg-[#D4D0C4] md:w-[75px]" />

        </div>

        {/* =======================================================
            BOTTOM TAGLINE
        ======================================================= */}

        <p className="relative z-10 mt-1.5 text-center font-serif text-[9px] leading-3.5 text-[#7C8178] md:text-[10px]">
          Ancient Wisdom
          <br />
          for a Healthier Tomorrow
        </p>

        {/* =======================================================
            BOTTOM LEFT BOTANICAL DECORATION
        ======================================================= */}

        <div className="pointer-events-none absolute -bottom-7 -left-4 opacity-35">

          <Leaf
            size={115}
            strokeWidth={0.8}
            className="rotate-[-28deg] text-[#88AA8D]"
          />

          <Leaf
            size={75}
            strokeWidth={0.8}
            className="absolute bottom-[-7px] left-[52px] rotate-[15deg] text-[#739B7B]"
          />

          <Leaf
            size={58}
            strokeWidth={0.8}
            className="absolute bottom-[15px] left-[4px] rotate-[-5deg] text-[#9DB9A0]"
          />

        </div>

        {/* =======================================================
            BOTTOM RIGHT BOTANICAL DECORATION
        ======================================================= */}

        <div className="pointer-events-none absolute -bottom-7 -right-5 opacity-25">

          <Leaf
            size={130}
            strokeWidth={0.8}
            className="rotate-[55deg] text-[#8EAD91]"
          />

          <Leaf
            size={78}
            strokeWidth={0.8}
            className="absolute bottom-[7px] right-[60px] rotate-[20deg] text-[#9BB59B]"
          />

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   BENEFIT COMPONENT
========================================================= */

function Benefit({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        px-4
        py-2
        md:min-h-[58px]
        md:border-r
        md:border-[#DDD8CB]
        md:px-6
        md:last:border-r-0
      "
    >

      {/* ICON */}

      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E8F1EA] text-[#174D3B]">

        {icon}

      </div>

      {/* TEXT */}

      <div className="min-w-0">

        <p className="font-serif text-[13px] font-semibold leading-4 text-[#315C4D] md:text-[14px]">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] leading-3.5 text-[#718078] md:text-[11px]">
          {description}
        </p>

      </div>

    </div>
  );
}