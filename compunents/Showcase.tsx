"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

const slides = [
  {
    tag: "[PUNE PILOT]",
    tagBg: "#FFD600",
    tagColor: "#0A0A0A",
    idx: "01 / 04",
    idxColor: "#A0A09A",
    title: "PUNE IT SECTOR\nSKILL GAP ANALYSIS",
    by: "PROOF-OF-CONCEPT RUN ON PUNE IT JOB DATA // 1,200+ SKILL GAPS IDENTIFIED",
    border: "#2D2D2D",
    bg: "#111111",
    tagBorder: "",
  },
  {
    tag: "[CURRICULUM]",
    tagBg: "#111111",
    tagColor: "#FFD600",
    idx: "02 / 04",
    idxColor: "#FFD600",
    title: "AUTOMATED COURSE\nFLAGGING SYSTEM",
    by: "45 DIPLOMA & ITI COURSES FLAGGED FOR IMMEDIATE SYLLABUS UPDATE",
    border: "#FFD600",
    bg: "#0F0F0F",
    tagBorder: "#FFD600",
  },
  {
    tag: "[DISTRICT MAP]",
    tagBg: "#1A1A1A",
    tagColor: "#FF6B35",
    idx: "03 / 04",
    idxColor: "#A0A09A",
    title: "MAHARASHTRA DISTRICT\nHEATMAP",
    by: "GEOGRAPHIC MAPPING FOR EFFICIENT GOVT TRAINING FUND ALLOCATION",
    border: "#2D2D2D",
    bg: "#0A0A0A",
    tagBorder: "#FF6B35",
  },
  {
    tag: "[EMPLOYER LOOP]",
    tagBg: "#FFD600",
    tagColor: "#0A0A0A",
    idx: "04 / 04",
    idxColor: "#A0A09A",
    title: "INDUSTRY FEEDBACK\nPORTAL",
    by: "DIRECT DEMAND SIGNAL VERIFICATION BY LOCAL MANUFACTURING EMPLOYERS",
    border: "#2D2D2D",
    bg: "#111111",
    tagBorder: "",
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => Math.max(0, p - 1));
  const next = () => setActive((p) => Math.min(slides.length - 1, p + 1));

  const slide = slides[active];

  return (
    <section id="showcase" className="flex flex-col w-full bg-[#080808] pt-16 md:pt-[100px] pb-0 gap-8 md:gap-[48px]">
      {/* Header */}
      <div className="flex items-end justify-between px-6 md:px-[120px]">
        <SectionHeader
          label="[07] // PILOT PROTOTYPE"
          title={"PUNE IT & MANUFACTURING\nPILOT."}
          subtitle="PROOF-OF-CONCEPT PROTOTYPE RUN ON REAL PUNE REGION JOB MARKET DATA."
          titleWidth="w-full max-w-[750px]"
        />
        <div className="flex items-center gap-[8px] shrink-0">
          <button
            onClick={prev}
            className="flex items-center justify-center w-[48px] h-[48px] bg-[#111111] border-2 border-[#3D3D3D] hover:border-[#888888] transition-colors"
          >
            <span className="font-grotesk text-[18px] font-bold text-[#888888]">&lt;</span>
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center w-[48px] h-[48px] bg-[#FFD600] hover:bg-[#e6c200] transition-colors"
          >
            <span className="font-grotesk text-[18px] font-bold text-[#0A0A0A]">&gt;</span>
          </button>
        </div>
      </div>

      {/* Mobile: single card */}
      <div className="md:hidden px-6">
        <div
          className="flex flex-col gap-5 p-6 border-2 w-full"
          style={{ backgroundColor: slide.bg, borderColor: slide.border }}
        >
          <div className="flex flex-col items-center justify-center h-[160px] bg-[#1A1A1A] border border-[#2D2D2D] p-4 gap-2">
            <span className="font-ibm-mono text-[11px] text-[#FFD600] tracking-[2px]">[PROTOTYPE DEMO GRAPHIC]</span>
            <span className="font-ibm-mono text-[9px] text-[#A0A09A] text-center">SIH 2026 Live Dashboard Simulation</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div
              className="flex items-center justify-center h-[24px] px-[10px] border"
              style={{ backgroundColor: slide.tagBg, borderColor: slide.tagBorder || "transparent" }}
            >
              <span className="font-ibm-mono text-[9px] font-bold tracking-[1px]" style={{ color: slide.tagColor }}>
                {slide.tag}
              </span>
            </div>
            <span className="font-ibm-mono text-[11px] tracking-[2px]" style={{ color: slide.idxColor }}>
              {slide.idx}
            </span>
          </div>
          <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0] tracking-[1px] leading-[1.2] whitespace-pre-line">
            {slide.title}
          </h3>
          <p className="font-ibm-mono text-[11px] text-[#A0A09A] tracking-[1px]">{slide.by}</p>
        </div>
      </div>

      {/* Desktop: carousel track */}
      <div className="hidden md:block overflow-hidden h-[420px] px-[120px]">
        <div
          className="flex gap-[16px] transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${active} * (560px + 16px)))` }}
        >
        {slides.map((s, i) => (
          <div
            key={i}
            className="flex flex-col gap-[20px] p-[36px] h-[412px] w-[560px] shrink-0 border-2"
            style={{ backgroundColor: s.bg, borderColor: s.border }}
          >
            <div className="flex flex-col items-center justify-center h-[200px] bg-[#1A1A1A] border border-[#2D2D2D] p-6 gap-2">
              <span className="font-ibm-mono text-[12px] font-bold text-[#FFD600] tracking-[2px]">[LIVE PILOT DASHBOARD]</span>
              <span className="font-ibm-mono text-[10px] text-[#A0A09A] text-center max-w-[380px]">
                Analyzed 50,000+ job postings &amp; mapped to Pune ITI/Polytechnic syllabi
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <div
                className="flex items-center justify-center h-[24px] px-[10px] border"
                style={{ backgroundColor: s.tagBg, borderColor: s.tagBorder || "transparent" }}
              >
                <span className="font-ibm-mono text-[9px] font-bold tracking-[1px]" style={{ color: s.tagColor }}>
                  {s.tag}
                </span>
              </div>
              <span className="font-ibm-mono text-[11px] tracking-[2px]" style={{ color: s.idxColor }}>
                {s.idx}
              </span>
            </div>
            <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0] tracking-[1px] leading-[1.2] whitespace-pre-line">
              {s.title}
            </h3>
            <p className="font-ibm-mono text-[11px] text-[#A0A09A] tracking-[1px]">{s.by}</p>
          </div>
        ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-[8px] px-6 md:px-[120px]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-[4px] transition-all"
            style={{ width: i === active ? 32 : 8, backgroundColor: i === active ? "#FFD600" : "#333333" }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 md:px-[120px] pb-16 md:pb-[100px]">
        <span className="font-ibm-mono text-[11px] text-[#A0A09A] tracking-[2px]">
          SHOWING 0{active + 1} OF 04 PILOT MODULES
        </span>
        <span className="font-ibm-mono text-[11px] text-[#FFD600] tracking-[2px] cursor-pointer hover:underline">
          PILOT DATA // PROTOTYPE DEMO &gt;
        </span>
      </div>
    </section>
  );
}
