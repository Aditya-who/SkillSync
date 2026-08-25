const stats = [
  { value: "50,000+", label: "JOB POSTINGS ANALYZED", border: true },
  { value: "94%", label: "SKILL-COURSE MATCH ACCURACY", border: true },
  { value: "36", label: "DISTRICTS COVERED", border: true },
  { value: "50+", label: "SKILLS TRACKED", border: false },
];

export default function Stats() {
  return (
    <section id="stats" className="flex flex-col w-full bg-[#FFD600] py-12 px-6 md:py-[80px] md:px-[120px]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <span className="font-ibm-mono text-[12px] font-bold text-[#0A0A0A] tracking-[3px]">
          [03] // BY THE NUMBERS
        </span>
        <span className="font-ibm-mono text-[10px] font-bold text-[#0A0A0A] tracking-[1.5px] opacity-75">
          *PROTOTYPE &amp; PILOT DATA FOR SIH 2026
        </span>
      </div>
      <div className="h-8 md:h-[32px]" />
      <div className="grid grid-cols-2 md:flex w-full gap-[2px] md:gap-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 items-center justify-center py-6 md:py-0 md:h-[160px] md:flex-1
              ${stat.border ? "md:border-r-2 md:border-r-[#0A0A0A]" : ""}
              ${i === 0 ? "md:pr-[30px]" : i === stats.length - 1 ? "md:pl-[30px]" : "md:px-[30px]"}
              ${i % 2 === 0 ? "border-r-2 border-r-[#0A0A0A] pr-4 md:border-r-0 md:pr-0" : "pl-4 md:pl-0"}
              ${i >= 2 ? "border-t-2 border-t-[#0A0A0A] pt-4 md:border-t-0 md:pt-0" : ""}
            `}
          >
            <span className="font-grotesk text-[36px] md:text-[56px] font-bold text-[#0A0A0A] tracking-[-2px] leading-none text-center">
              {stat.value}
            </span>
            <span className="font-ibm-mono text-[10px] md:text-[11px] font-bold text-[#1A1A1A] tracking-[1.5px] text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
