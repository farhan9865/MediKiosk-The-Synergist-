import { RotateCcw, MoreHorizontal, CircleHelp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KioskHeaderProps {
  showBack?: boolean;
  showHelp?: boolean;
  showControls?: boolean;
  language?: string;
}

export default function KioskHeader({
  showBack = false,
  showHelp = true,
  showControls = true,
  language = "EN",
}: KioskHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="border-b border-[#DDD4C4] bg-[#F7F3E9]">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-3 md:px-8">
        {/* Left */}
        <div className="flex items-center gap-5">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-[#314C43] transition hover:opacity-60"
            >
              <span className="text-lg">←</span>
              <span>Back</span>
            </button>
          )}

          {!showBack && (
            <div>
              <h1 className="font-serif text-[22px] font-bold leading-none text-[#173F35]">
                MediKiosk
              </h1>

              <p className="mt-1 text-[9px] tracking-wide text-[#68776F]">
                AI-Powered Ayurveda Clinical History Platform
              </p>
            </div>
          )}
        </div>

        {/* Center logo on internal screens */}
        {showBack && (
          <div className="absolute left-1/2 hidden -translate-x-1/2 text-center md:block">
            <p className="font-serif text-[21px] font-bold leading-none text-[#173F35]">
              MediKiosk
            </p>

            <p className="mt-1 text-[8px] tracking-[0.16em] text-[#68776F]">
              AYURVEDA CLINICAL HISTORY
            </p>
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-2">
          {language && !showBack && (
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#314C43] hover:bg-[#EDE7D9]">
              {language}
              <span className="text-[10px]">⌄</span>
            </button>
          )}

          {showControls && showBack && (
            <div className="flex items-center gap-1">
              <button
                title="Reset"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDD4C4] bg-[#F9F6EE] text-[#314C43]"
              >
                <RotateCcw size={14} />
              </button>

              <button
                title="More"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDD4C4] bg-[#F9F6EE] text-[#314C43]"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          )}

          {showHelp && showBack && (
            <button className="ml-2 flex items-center gap-1.5 text-xs text-[#314C43]">
              <CircleHelp size={14} />
              Help
            </button>
          )}
        </div>
      </div>
    </header>
  );
}