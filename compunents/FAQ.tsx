"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

const faqs = [
  {
    question: "IS THE JOB DATA REAL OR SIMULATED?",
    answer:
      "FOR THE SIH 2026 PROTOTYPE, WE UTILIZE LIVE PUBLIC JOB POSTING APIS COMBINED WITH A CURATED REAL-TIME DATASET OF MAHARASHTRA IT & MANUFACTURING JOB LISTINGS.",
    defaultOpen: true,
  },
  {
    question: "HOW OFTEN IS DATA REFRESHED?",
    answer:
      "JOB MARKET SIGNALS ARE UPDATED CONTINUOUSLY ON A 24-HOUR CYCLE TO DETECT EMERGING SKILL TRENDS IMMEDIATELY.",
  },
  {
    question: "CAN INSTITUTES CUSTOMIZE THEIR COURSE MAPPING?",
    answer:
      "YES. TRAINING INSTITUTES CAN UPLOAD CUSTOM SYLLABI AND VIEW AI-RECOMMENDED MODULE ADDITIONS OR MODIFICATIONS TAILORED TO THEIR CURRICULUM.",
  },
  {
    question: "WHAT HAPPENS TO DATA PRIVACY FOR EMPLOYER SURVEYS?",
    answer:
      "ALL EMPLOYER FEEDBACK AND DIRECT SKILL INPUT ARE AGGREGATED AND ANONYMIZED TO PROTECT PROPRIETARY COMPANY DATA WHILE INFORMING PUBLIC POLICY.",
  },
  {
    question: "IS THIS SCALABLE BEYOND ONE DISTRICT?",
    answer:
      "ABSOLUTELY. SKILLSYNC IS DESIGNED WITH A MULTI-TENANT, DISTRICT-GRANULAR ARCHITECTURE TO SEAMLESSLY SCALE ACROSS ALL 36 DISTRICTS OF MAHARASHTRA AND NATIONWIDE.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="flex flex-col w-full bg-[#060606] py-16 px-6 md:py-[100px] md:px-[120px]">
      <div className="w-full max-w-[600px]">
        <SectionHeader
          label="[08] // FAQ"
          title={"FREQUENTLY ASKED\nQUESTIONS."}
          subtitle="EVERYTHING YOU NEED TO KNOW ABOUT SKILLSYNC'S DATA AND ARCHITECTURE."
          titleWidth="w-full"
          subtitleWidth="w-full"
        />
      </div>

      <div className="h-10 md:h-[64px]" />

      {/* FAQ items */}
      <div className="flex flex-col w-full">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="flex flex-col w-full border-t border-t-[#1D1D1D]">
              <button
                className="flex items-center justify-between w-full py-5 md:h-[72px] text-left gap-4"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span className="font-grotesk text-[14px] md:text-[16px] font-bold text-[#F5F5F0] tracking-[1px]">
                  {faq.question}
                </span>
                <div
                  className="flex items-center justify-center w-[32px] h-[32px] shrink-0"
                  style={{ backgroundColor: isOpen ? "#FFD600" : "#1A1A1A", border: isOpen ? "none" : "1px solid #3D3D3D" }}
                >
                  <span
                    className="font-ibm-mono text-[14px] font-bold"
                    style={{ color: isOpen ? "#0A0A0A" : "#888888" }}
                  >
                    {isOpen ? "—" : "+"}
                  </span>
                </div>
              </button>
              {isOpen && faq.answer && (
                <div className="pb-8">
                  <p className="font-ibm-mono text-[12px] md:text-[13px] text-[#A0A09A] tracking-[1px] leading-[1.6]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div className="border-t border-t-[#1D1D1D]" />
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-[16px] pt-10 md:pt-[48px]">
        <span className="font-ibm-mono text-[13px] text-[#666666] tracking-[1px]">
          HAVE ADDITIONAL TECHNICAL QUESTIONS?
        </span>
        <span className="font-ibm-mono text-[13px] font-bold text-[#FFD600] tracking-[1px] cursor-pointer hover:underline">
          CONTACT HACKATHON TEAM &gt;
        </span>
      </div>
    </section>
  );
}
