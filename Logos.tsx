const logos = [
  "MAHARASHTRA SKILL DEPT",
  "GOVT OF MAHARASHTRA",
  "MSBTE",
  "DTE MAHARASHTRA",
  "NSDC",
  "ITI MAHARASHTRA",
];

export default function Logos() {
  return (
    <section className="flex flex-col items-center w-full bg-[#0F0F0F] py-[48px] px-6 md:px-[120px] gap-[32px]">
      <span className="font-ibm-mono text-[11px] text-[#A0A09A] tracking-[3px]">
        SUPPORTED BY &amp; PARTNERED WITH
      </span>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-[48px] w-full">
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-grotesk text-[12px] md:text-[13px] font-bold text-[#888888] tracking-[2px] hover:text-[#FFD600] transition-colors"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
