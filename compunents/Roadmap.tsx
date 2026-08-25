import SectionHeader from "./SectionHeader";

interface RoadmapPhaseProps {
  phase: string;
  badge: string;
  badgeColor?: string;
  title: string;
  description: string;
  items: string[];
  isCurrent?: boolean;
}

function RoadmapPhase({
  phase,
  badge,
  badgeColor = "#FFD600",
  title,
  description,
  items,
  isCurrent = false,
}: RoadmapPhaseProps) {
  return (
    <div
      className="flex flex-col gap-6 p-8 md:p-[40px] w-full md:flex-1 border"
      style={{
        backgroundColor: isCurrent ? "#111111" : "#0A0A0A",
        borderColor: isCurrent ? "#FFD600" : "#2D2D2D",
        borderWidth: isCurrent ? 2 : 1,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">
          {phase}
        </span>
        <div
          className="flex items-center justify-center h-[24px] px-[10px] border"
          style={{
            backgroundColor: isCurrent ? "#FFD600" : "#1A1A1A",
            borderColor: isCurrent ? "#FFD600" : badgeColor,
          }}
        >
          <span
            className="font-ibm-mono text-[9px] font-bold tracking-[1px]"
            style={{ color: isCurrent ? "#0A0A0A" : badgeColor }}
          >
            {badge}
          </span>
        </div>
      </div>

      <h3 className="font-grotesk text-[24px] font-bold text-[#F5F5F0] tracking-[-1px] leading-[1.1]">
        {title}
      </h3>

      <p className="font-ibm-mono text-[12px] text-[#A0A09A] tracking-[1px] leading-[1.6]">
        {description}
      </p>

      <div className="border-t border-[#2D2D2D] pt-5 flex flex-col gap-3 mt-auto">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-ibm-mono text-[11px] text-[#FFD600] font-bold">
              {item.slice(0, 3)}
            </span>
            <span className="font-ibm-mono text-[11px] text-[#CCCCCC] tracking-[1px]">
              {item.slice(4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="flex flex-col w-full bg-[#080808] py-16 px-6 md:py-[100px] md:px-[120px] gap-12 md:gap-[64px]">
      <SectionHeader
        label="[09] // ROADMAP"
        title={"WHERE WE'RE\nHEADED."}
        subtitle="SCALING FROM SIH 2026 PROTOTYPE TO STATEWIDE EVIDENCE-BASED GOVERNANCE."
      />

      <div className="flex flex-col md:flex-row w-full gap-[2px]">
        <RoadmapPhase
          phase="PHASE 1"
          badge="CURRENT // SIH 2026"
          title="PUNE DISTRICT PILOT"
          description="ONE DISTRICT COVERAGE FOCUSING ON IT &amp; MANUFACTURING SECTOR JOB POSTINGS AND ITI/POLYTECHNIC CURRICULA."
          isCurrent={true}
          items={[
            "[✓] Pune IT Job Signal Scraping",
            "[✓] NLP Skill Extraction Engine",
            "[✓] Initial Gap Scoring Algorithm",
            "[✓] Prototype Dashboard & UI",
          ]}
        />
        <RoadmapPhase
          phase="PHASE 2"
          badge="NEXT 6 MONTHS"
          badgeColor="#FF6B35"
          title="MULTI-SECTOR EXPANSION"
          description="EXPAND INTELLIGENCE PIPELINE TO AGRITECH, HEALTHCARE, AUTOMOTIVE, AND RETAIL SKILLING."
          items={[
            "[—] Multi-sector Job Parsers",
            "[—] Direct Employer Survey Portal",
            "[—] Live Syllabus Sync API",
            "[—] Regional Language Support",
          ]}
        />
        <RoadmapPhase
          phase="PHASE 3"
          badge="12 MONTH VISION"
          badgeColor="#F5F5F0"
          title="STATEWIDE ROLLOUT"
          description="FULL MAHARASHTRA COVERAGE ACROSS ALL 36 DISTRICTS WITH GOVT DEPARTMENT INTEGRATION."
          items={[
            "[—] 36 District Analytics Hub",
            "[—] Automated Policy Allocations",
            "[—] Integration with NSDC & MSBTE",
            "[—] National Hackathon Scaling",
          ]}
        />
      </div>
    </section>
  );
}
