const productLinks = ["FEATURES", "HOW IT WORKS", "IMPACT", "CAPABILITIES"];
const govtLinks = ["DEPT OF SKILLS", "MSBTE PORTAL", "DTE MAHARASHTRA"];
const sihLinks = ["PROBLEM STATEMENT", "SIH 2026 PORTAL", "MAHARASHTRA INITIATIVE"];

export default function Footer() {
  return (
    <footer className="flex flex-col w-full bg-[#050505]">
      {/* Top */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-[80px] px-6 md:px-[120px] py-12 md:py-[64px]">
        {/* Brand */}
        <div className="flex flex-col gap-6 md:w-[320px] md:shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#FFD600] shrink-0" />
            <span className="font-grotesk text-[18px] font-bold text-[#FFD600] tracking-[3px]">
              SKILLSYNC
            </span>
          </div>
          <p className="font-ibm-mono text-[11px] text-[#A0A09A] tracking-[1px] leading-[1.6] max-w-[300px]">
            LABOUR-MARKET INTELLIGENCE FOR EVIDENCE-BASED SKILLING. ALIGNING CURRICULA WITH REAL INDUSTRY DEMAND.
          </p>
          <div className="flex flex-col gap-1 border-l-2 border-[#FFD600] pl-3 py-1">
            <span className="font-ibm-mono text-[10px] font-bold text-[#FFD600] tracking-[1.5px]">
              SIH26134 // SMART INDIA HACKATHON 2026
            </span>
            <span className="font-ibm-mono text-[9px] text-[#777777] tracking-[1px]">
              GOVT OF MAHARASHTRA, DEPT OF SKILLS, EMPLOYMENT &amp; ENTREPRENEURSHIP
            </span>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-3 md:flex md:flex-1 gap-8 md:gap-[80px]">
          {[
            { heading: "PLATFORM", links: productLinks },
            { heading: "GOVERNMENT", links: govtLinks },
            { heading: "HACKATHON", links: sihLinks },
          ].map((col) => (
            <div key={col.heading} className="flex flex-col gap-4 md:gap-[20px]">
              <span className="font-grotesk text-[11px] font-bold text-[#F5F5F0] tracking-[2px]">
                {col.heading}
              </span>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#hero"
                  className="font-ibm-mono text-[11px] text-[#888888] tracking-[1px] hover:text-[#FFD600] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full px-6 md:px-[120px] py-4 md:h-[56px] border-t border-t-[#1D1D1D] gap-3 sm:gap-0">
        <span className="font-ibm-mono text-[11px] text-[#777777] tracking-[1px]">
          © 2026 TEAM SKILLSYNC. ALL RIGHTS RESERVED.
        </span>
        <div className="flex items-center gap-6 md:gap-[32px]">
          <span className="font-ibm-mono text-[11px] text-[#777777] tracking-[1px]">
            GOVT OF MAHARASHTRA
          </span>
          <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[1px]">
            SIH 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
