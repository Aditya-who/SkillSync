import SectionHeader from "./SectionHeader";

export default function Bento() {
  return (
    <section id="capabilities" className="flex flex-col w-full bg-[#0D0D0D] py-16 px-6 md:py-[100px] md:px-[120px] gap-10 md:gap-[48px]">
      <SectionHeader
        label="[05] // CAPABILITIES"
        title={"THE FULL PIPELINE."}
        subtitle="END-TO-END INTELLIGENCE FOR EVIDENCE-BASED SKILL DEVELOPMENT."
        titleWidth="w-full max-w-[800px]"
      />

      <div className="flex flex-col w-full gap-[2px]">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row w-full gap-[2px]">
          {/* Bento A — Yellow */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-[#FFD600] w-full md:flex-1">
            <span className="font-ibm-mono text-[11px] font-bold text-[#1A1A1A] tracking-[2px]">[01]</span>
            <h3 className="font-grotesk text-[22px] md:text-[26px] font-bold text-[#0A0A0A] tracking-[-1px] leading-[1.1] whitespace-pre-line">
              {"NLP JOB\nPARSING"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#1A1A1A] tracking-[1px] leading-[1.6]">
              SKILLS EXTRACTED AUTOMATICALLY FROM UNSTRUCTURED JOB LISTINGS AND HIRING PORTALS.
            </p>
            <div className="flex items-center justify-center h-[28px] px-[12px] bg-[#0A0A0A] w-fit">
              <span className="font-ibm-mono text-[10px] font-bold text-[#FFD600] tracking-[2px]">[LIVE]</span>
            </div>
          </div>

          {/* Bento B */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-[#111111] border border-[#2D2D2D] w-full md:flex-1">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">[02]</span>
            <h3 className="font-grotesk text-[22px] md:text-[26px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line">
              {"SKILL DECAY\nTRACKING"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#A0A09A] tracking-[1px] leading-[1.6]">
              TRENDS TRACKED OVER TIME TO CATCH RISING DEMAND AND IDENTIFY OBSOLETE SKILLS BEFORE THEY IMPACT EMPLOYABILITY.
            </p>
          </div>

          {/* Bento C */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[320px] bg-[#0A0A0A] border border-[#2D2D2D] w-full md:flex-1">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">[03]</span>
            <h3 className="font-grotesk text-[22px] md:text-[26px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line">
              {"EXPLAINABLE\nRECOMMENDATIONS"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#A0A09A] tracking-[1px] leading-[1.6]">
              EVERY FLAGGED COURSE COMES WITH CLEAR AUDITABLE REASONING AND REAL JOB DATA, NOT A BLACK BOX.
            </p>
            <div className="flex items-center justify-center h-[28px] px-[12px] bg-[#1A1A1A] border border-[#FF6B35] w-fit">
              <span className="font-ibm-mono text-[10px] font-bold text-[#FF6B35] tracking-[2px]">[AI]</span>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row w-full gap-[2px]">
          {/* Bento D */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[280px] bg-[#111111] border border-[#2D2D2D] w-full md:flex-1">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">[04]</span>
            <h3 className="font-grotesk text-[22px] md:text-[26px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line">
              {"EMPLOYER\nVALIDATION LOOP"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#A0A09A] tracking-[1px] leading-[1.6]">
              LOCAL INDUSTRY AND EMPLOYERS CONFIRM OR CORRECT DEMAND SIGNALS DIRECTLY TO REFINE AI OUTPUTS.
            </p>
          </div>

          {/* Bento E */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[280px] bg-[#0F0F0F] border-2 border-[#FF6B35] w-full md:flex-1">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FF6B35] tracking-[2px]">[05]</span>
            <h3 className="font-grotesk text-[22px] md:text-[26px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line">
              {"CURRICULUM-SKILL\nGRAPH"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#A0A09A] tracking-[1px] leading-[1.6]">
              COURSES MAPPED TO TOPICS AND MAPPED TO REAL-WORLD JOB ROLES FOR DEEP SYLLABUS ALIGNMENT.
            </p>
          </div>

          {/* Bento F */}
          <div className="flex flex-col gap-5 p-8 md:p-[40px] md:h-[280px] bg-[#0A0A0A] border border-[#2D2D2D] w-full md:flex-1">
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">[06]</span>
            <h3 className="font-grotesk text-[22px] md:text-[26px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1] whitespace-pre-line">
              {"POLICY\nDASHBOARD"}
            </h3>
            <p className="font-ibm-mono text-[12px] text-[#A0A09A] tracking-[1px] leading-[1.6]">
              DISTRICT-LEVEL VIEW FOR GOVERNMENT DECISION-MAKING, FUND ALLOCATION, AND SECTOR PLANNING.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
