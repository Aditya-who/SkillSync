"use client";

import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoleDashboard: (role: "student" | "professional" | "employer") => void;
}

type Step = "role" | "form";
type Role = "student" | "professional" | "employer";

export default function AuthModal({ isOpen, onClose, onSelectRoleDashboard }: AuthModalProps) {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");

  if (!isOpen) return null;

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onSelectRoleDashboard(selectedRole);
  };

  const getRoleTitle = (r: Role) => {
    switch (r) {
      case "student": return "🎓 Student / Fresh Learner";
      case "professional": return "💼 Working Professional (AI Reskilling)";
      case "employer": return "🏢 Employer / Industry Partner";
    }
  };

  const getOrgLabel = (r: Role) => {
    switch (r) {
      case "student": return "College / University / ITI";
      case "professional": return "Current Company & Job Title";
      case "employer": return "Company / Industry Name";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-[620px] bg-[#0E0E0E] border-2 border-[#FFD600] p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FFD600]" />
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">
              SKILLSYNC PORTAL SELECTION
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-ibm-mono text-[14px] text-[#888] hover:text-[#FFD600] px-2 py-1 transition-colors"
          >
            [✕ CLOSE]
          </button>
        </div>

        {/* Step 1: Role Selection */}
        {step === "role" && (
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-ibm-mono text-[10px] text-[#888] tracking-[2px]">STEP 01 // SELECT PERSONA</span>
              <h2 className="font-grotesk text-[28px] font-bold text-[#F5F5F0] tracking-[-1px] mt-1">
                AAP KAUN HAIN? / WHO ARE YOU?
              </h2>
              <p className="font-ibm-mono text-[12px] text-[#A0A09A] mt-1">
                Select your track to access targeted career-prep or AI-risk reskilling.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "student",
                  icon: "🎓",
                  label: "STUDENT",
                  tag: "CAREER PREP",
                  desc: "Mujhe konsi fresh skills seekhni chahiye future-proof career ke liye?",
                },
                {
                  id: "professional",
                  icon: "💼",
                  label: "PROFESSIONAL",
                  tag: "AI RESKILLING",
                  desc: "Mera job AI risk me to nahi? Mujhe kya adjacent reskilling karni chahiye?",
                },
                {
                  id: "employer",
                  icon: "🏢",
                  label: "EMPLOYER",
                  tag: "TALENT MATCH",
                  desc: "Submit demand signals & hire job-ready skilled candidates",
                },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleClick(r.id as Role)}
                  className="flex flex-col text-left p-4 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] hover:bg-[#1A1A1A] transition-all group relative"
                >
                  <span className="text-2xl mb-2">{r.icon}</span>
                  <div className="flex items-center justify-between w-full">
                    <span className="font-grotesk text-[14px] font-bold text-[#F5F5F0] group-hover:text-[#FFD600] tracking-[0.5px]">
                      {r.label}
                    </span>
                  </div>
                  <span className="font-ibm-mono text-[8px] font-bold text-[#FFD600] bg-[#222] px-1.5 py-0.5 w-fit mt-1">
                    {r.tag}
                  </span>
                  <span className="font-ibm-mono text-[10px] text-[#888] mt-2 leading-[1.4]">
                    {r.desc}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-ibm-mono text-[10px] text-[#555]">DEMO ACCESS // SIH 2026</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onSelectRoleDashboard("professional");
                  }}
                  className="font-ibm-mono text-[11px] text-[#FF6B35] font-bold hover:underline"
                >
                  Launch AI Risk Dashboard &gt;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Quick Signup Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <button
                type="button"
                onClick={() => setStep("role")}
                className="font-ibm-mono text-[10px] text-[#888] hover:text-[#FFD600] tracking-[1px]"
              >
                &lt; BACK TO PERSONAS
              </button>
              <h2 className="font-grotesk text-[24px] font-bold text-[#F5F5F0] tracking-[-1px] mt-1">
                {getRoleTitle(selectedRole)}
              </h2>
              <p className="font-ibm-mono text-[11px] text-[#A0A09A]">
                Enter details to open your specialized dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-ibm-mono text-[10px] font-bold text-[#A0A09A] tracking-[1px]">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[42px] bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-ibm-mono text-[10px] font-bold text-[#A0A09A] tracking-[1px]">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="priya@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[42px] bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-ibm-mono text-[10px] font-bold text-[#A0A09A] tracking-[1px]">
                  {getOrgLabel(selectedRole)}
                </label>
                <input
                  type="text"
                  required
                  placeholder={selectedRole === "professional" ? "e.g. Data Entry Specialist @ TechCorp" : "e.g. Govt Polytechnic Pune"}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full h-[42px] bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[48px] bg-[#FFD600] hover:bg-[#e6c200] text-[#0A0A0A] font-grotesk text-[12px] font-bold tracking-[2px] mt-2 transition-colors"
            >
              LAUNCH DASHBOARD &gt;
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
