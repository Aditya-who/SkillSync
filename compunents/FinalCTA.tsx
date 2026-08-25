"use client";

import GlitchText from "@/components/GlitchText";

interface FinalCTAProps {
  onOpenAuth?: () => void;
  onOpenDashboard?: (role?: any) => void;
}

export default function FinalCTA({ onOpenAuth, onOpenDashboard }: FinalCTAProps) {
  return (
    <section className="flex flex-col items-center w-full bg-[#0A0A0A] py-16 px-6 md:p-[120px] gap-10 md:gap-[48px] border-t-2 border-t-[#FFD600]">
      {/* Badge */}
      <div className="flex items-center justify-center gap-[8px] h-[32px] px-[16px] bg-[#1A1A1A] border-2 border-[#FFD600]">
        <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">
          <GlitchText text="[READY TO CLOSE THE GAP?]" speed={30} />
        </span>
      </div>

      {/* Title */}
      <h2 className="font-grotesk text-[40px] md:text-[76px] font-bold text-[#F5F5F0] tracking-[-2px] leading-none text-center w-full max-w-[1000px] whitespace-pre-line">
        <GlitchText text={"STOP TRAINING FOR\nYESTERDAY'S JOBS."} speed={40} delay={200} />
      </h2>

      {/* Subtitle */}
      <p className="font-ibm-mono text-[11px] md:text-[14px] text-[#A0A09A] tracking-[0.5px] md:tracking-[2px] text-center text-pretty w-full max-w-[750px] px-2">
        <GlitchText text="SKILL DEVELOPMENT THAT MOVES AS FAST AS THE JOB MARKET DOES." speed={20} delay={450} />
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-[16px] w-full sm:w-auto">
        <button
          onClick={() => onOpenDashboard ? onOpenDashboard("professional") : null}
          className="flex items-center justify-center w-full sm:w-[260px] h-[64px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors border-none cursor-pointer"
        >
          <span className="font-grotesk text-[12px] font-bold text-[#0A0A0A] tracking-[2px]">
            VIEW DASHBOARD DEMO
          </span>
        </button>
        <button
          onClick={() => onOpenAuth ? onOpenAuth() : null}
          className="flex items-center justify-center w-full sm:w-[220px] h-[64px] bg-[#0A0A0A] border-2 border-[#3D3D3D] hover:border-[#888888] transition-colors cursor-pointer"
        >
          <span className="font-ibm-mono text-[12px] text-[#888888] tracking-[2px]">
            SELECT PORTAL
          </span>
        </button>
      </div>
    </section>
  );
}
