"use client";

import { useState, useEffect } from "react";

type RoleTab = "student" | "professional" | "employer";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: RoleTab;
}

export default function DashboardModal({
  isOpen,
  onClose,
  initialRole = "professional",
}: DashboardModalProps) {
  const [activeTab, setActiveTab] = useState<RoleTab>(initialRole);
  
  // State for Student Dashboard
  const [studentSkills, setStudentSkills] = useState([
    "Python", "SQL", "C++", "HTML/CSS"
  ]);
  const [newSkill, setNewSkill] = useState("");

  // State for Working Professional Dashboard
  const [selectedJobTitle, setSelectedJobTitle] = useState("Data Entry Operator");

  // State for Employer Dashboard
  const [demandSkill, setDemandSkill] = useState("");
  const [demandOpenings, setDemandOpenings] = useState("25");
  const [demandSector, setDemandSector] = useState("IT / Software");
  const [submittedSignal, setSubmittedSignal] = useState(false);

  // Isolated User Assessment State
  const [assessmentResult, setAssessmentResult] = useState<any>(null);

  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem("skillsync_current_user_id");
      if (currentUserId) {
        const stored = localStorage.getItem(`skillsync_isolated_assessment_${currentUserId}`);
        if (stored) {
          setAssessmentResult(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.error("Error reading isolated assessment data:", e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const addStudentSkill = () => {
    if (newSkill.trim() && !studentSkills.includes(newSkill.trim())) {
      setStudentSkills([...studentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeStudentSkill = (skill: string) => {
    setStudentSkills(studentSkills.filter((s) => s !== skill));
  };

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSignal(true);
    setTimeout(() => setSubmittedSignal(false), 4000);
  };

  // Job Roles dataset for Working Professional AI Risk assessment
  const professionalRolesData: Record<string, {
    riskScore: number;
    riskLevel: "HIGH" | "MEDIUM" | "LOW";
    color: string;
    timeline: string;
    whyReason: string;
    marketStat: string;
    currentSkills: string[];
    adjacentSkills: string[];
    reskillingCourses: { title: string; provider: string; duration: string; transition: string }[];
  }> = {
    "Data Entry Operator": {
      riskScore: 84,
      riskLevel: "HIGH",
      color: "#FF4D4D",
      timeline: "1 - 2 Years",
      whyReason: "LLM agents and Optical Character Recognition (OCR) automatons now process unstructured paperwork 90% faster at 1/10th the cost. Basic keystroke entry demand has collapsed.",
      marketStat: "42% drop in manual data entry job postings over the last 6 months across India.",
      currentSkills: ["MS Excel", "Keystroke Accuracy", "Basic Math", "Filing & Record Keeping"],
      adjacentSkills: ["AI Data Validation", "RPA & Process Automation", "SQL Data Hygiene", "Prompt Operations"],
      reskillingCourses: [
        { title: "AI Data Validation & Quality Assurance", provider: "SkillSync Reskill Track", duration: "3 Weeks", transition: "Data Entry → AI Data Hygienist" },
        { title: "Robotic Process Automation (UiPath / PowerAutomate)", provider: "MSBTE Professional Cert", duration: "5 Weeks", transition: "Data Entry → RPA Coordinator" },
      ],
    },
    "Junior Accountant / Bookkeeper": {
      riskScore: 72,
      riskLevel: "HIGH",
      color: "#FF4D4D",
      timeline: "1 - 2 Years",
      whyReason: "Automated invoice parsing APIs and automated Tally/QuickBooks AI connectors extract line items without human intervention.",
      marketStat: "38% decrease in entry-level bookkeeping openings as firms adopt automated ledger tools.",
      currentSkills: ["Tally Prime", "Invoice Processing", "Bank Reconciliation", "Basic Tax"],
      adjacentSkills: ["Financial Analytics", "GST Automation Systems", "ERP Systems (SAP/Odoo)", "Audit Automation"],
      reskillingCourses: [
        { title: "Applied Financial Analytics & PowerBI for Accountants", provider: "SkillSync Reskill Track", duration: "4 Weeks", transition: "Bookkeeper → Financial Analyst" },
        { title: "ERP & Automated GST Compliance Specialist", provider: "DTE Maharashtra Reskill", duration: "6 Weeks", transition: "Bookkeeper → ERP Consultant" },
      ],
    },
    "Quality Control Inspector (Mfg)": {
      riskScore: 65,
      riskLevel: "MEDIUM",
      color: "#FF6B35",
      timeline: "2 - 3 Years",
      whyReason: "Computer Vision cameras & automated sensor arrays detect surface defects and dimensional flaws faster than visual manual inspection.",
      marketStat: "Auto & precision manufacturing plants installing computer vision inspection lines.",
      currentSkills: ["Manual Gauging", "Visual Inspection", "Defect Logging", "Vernier/Micrometer"],
      adjacentSkills: ["Computer Vision Quality Calibration", "PLC & Sensor Automation", "Industrial IoT Diagnostics"],
      reskillingCourses: [
        { title: "Industrial AI & Computer Vision Inspection Tech", provider: "Pune Mfg Innovation Hub", duration: "4 Weeks", transition: "QC Inspector → AI Vision Tech" },
        { title: "Smart Factory PLC & Sensor Calibration", provider: "ITI Advanced Reskill", duration: "5 Weeks", transition: "QC Inspector → Automation Specialist" },
      ],
    },
    "Software QA Manual Tester": {
      riskScore: 78,
      riskLevel: "HIGH",
      color: "#FF4D4D",
      timeline: "1 - 2 Years",
      whyReason: "AI-driven test automation generators automatically generate Playwright/Selenium test cases directly from Figma designs or user stories.",
      marketStat: "55% of IT hiring in Pune now requires Automated Playwright/Cypress over purely manual test scripts.",
      currentSkills: ["Manual Test Cases", "Bug Tracking (Jira)", "Regression Testing", "Exploratory Testing"],
      adjacentSkills: ["Automated Cypress/Playwright", "API Testing (Postman/K6)", "CI/CD Test Pipeline Integration"],
      reskillingCourses: [
        { title: "Automation Testing with Playwright & TypeScript", provider: "SkillSync Reskill Track", duration: "4 Weeks", transition: "Manual QA → Automation Engineer" },
        { title: "DevOps & CI/CD Pipeline Quality Engineering", provider: "Pune IT Academy", duration: "5 Weeks", transition: "Manual QA → SDET Specialist" },
      ],
    },
  };

  const currentProfData = professionalRolesData[selectedJobTitle] || professionalRolesData["Data Entry Operator"];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-lg">
      <div className="relative w-full max-w-[1280px] h-[92vh] max-h-[850px] bg-[#0A0A0A] border-2 border-[#FFD600] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#121212] border-b border-[#222] px-4 py-3 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#FFD600]" />
            <span className="font-grotesk text-[15px] font-bold text-[#F5F5F0] tracking-[2px]">
              SKILLSYNC <span className="text-[#FFD600]">CAREER &amp; RESKILLING DASHBOARD</span>
            </span>
            <span className="hidden md:inline-block font-ibm-mono text-[9px] bg-[#1A1A1A] border border-[#FF6B35] text-[#FF6B35] px-2 py-0.5 tracking-[1px]">
              SIH26134 PROTOTYPE
            </span>
          </div>

          {/* Persona Navigation Tabs */}
          <div className="flex items-center bg-[#070707] border border-[#2A2A2A] p-1 gap-1 overflow-x-auto">
            {[
              { id: "professional", icon: "💼", label: "Working Professional (AI Risk)" },
              { id: "student", icon: "🎓", label: "Student View" },
              { id: "employer", icon: "🏢", label: "Employer View" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as RoleTab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 font-ibm-mono text-[11px] tracking-[1px] transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#FFD600] text-[#0A0A0A] font-bold shadow"
                    : "text-[#888] hover:text-[#F5F5F0] hover:bg-[#181818]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="self-end sm:self-auto font-ibm-mono text-[12px] font-bold text-[#888] hover:text-[#FFD600] px-2 py-1 transition-colors"
          >
            [✕ CLOSE]
          </button>
        </div>

        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#080808]">

          {/* ════════════════════ 1. WORKING PROFESSIONAL DASHBOARD (AI RISK & RESKILLING) ════════════════════ */}
          {activeTab === "professional" && (
            <div className="flex flex-col gap-6">
              
              {/* Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111] p-5 border border-[#222]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-ibm-mono text-[10px] text-[#FF6B35] font-bold tracking-[2px]">
                      JOB SECURITY &amp; AI AUTOMATION RADAR
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
                  </div>
                  <h2 className="font-grotesk text-[22px] md:text-[24px] font-bold text-[#F5F5F0] mt-0.5">
                    APNA CAREER PROTECT KARO: AI RISK ASSESSMENT &amp; ADJACENT RESKILLING
                  </h2>
                  <p className="font-ibm-mono text-[11px] text-[#A0A09A]">
                    Check if your job title is vulnerable to AI automation and get realistic adjacent skill transitions.
                  </p>
                </div>

                {/* Role Selector Dropdown */}
                <div className="flex flex-col gap-1 shrink-0">
                  <label className="font-ibm-mono text-[9px] text-[#888] tracking-[1px]">SELECT CURRENT ROLE</label>
                  <select
                    value={selectedJobTitle}
                    onChange={(e) => setSelectedJobTitle(e.target.value)}
                    className="bg-[#181818] border-2 border-[#FFD600] text-[#F5F5F0] font-ibm-mono text-[12px] font-bold px-3 py-2 outline-none"
                  >
                    {Object.keys(professionalRolesData).map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid: Risk Meter + Explainable Why + Reskilling Path */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: AI Risk Meter & Timeline Urgency */}
                <div className="flex flex-col gap-6">
                  
                  {/* Card 1: AI Risk Score */}
                  <div className="bg-[#0E0E0E] p-5 border-2 flex flex-col gap-4" style={{ borderColor: currentProfData.color }}>
                    <div className="flex items-center justify-between">
                      <span className="font-ibm-mono text-[11px] font-bold text-[#F5F5F0] tracking-[1px]">
                        AI AUTOMATION RISK SCORE
                      </span>
                      <span
                        className="font-ibm-mono text-[9px] font-bold px-2 py-0.5"
                        style={{ backgroundColor: `${currentProfData.color}22`, color: currentProfData.color, border: `1px solid ${currentProfData.color}` }}
                      >
                        {currentProfData.riskLevel} RISK
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="font-grotesk text-[54px] font-bold leading-none" style={{ color: currentProfData.color }}>
                        {currentProfData.riskScore}%
                      </span>
                      <span className="font-ibm-mono text-[12px] text-[#888]">
                        Automation Vulnerability
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-[#1A1A1A] border border-[#2D2D2D] overflow-hidden">
                      <div
                        className="h-full transition-all duration-700"
                        style={{ width: `${currentProfData.riskScore}%`, backgroundColor: currentProfData.color }}
                      />
                    </div>

                    {/* Timeline Urgency Indicator */}
                    <div className="p-3 bg-[#161210] border border-[#3A2218] flex items-center justify-between">
                      <span className="font-ibm-mono text-[10px] text-[#888]">ESTIMATED RISK TIMELINE</span>
                      <span className="font-ibm-mono text-[12px] font-bold text-[#FFD600]">
                        ⏱️ {currentProfData.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Market Stat & Trend */}
                  <div className="bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-2">
                    <span className="font-ibm-mono text-[10px] font-bold text-[#FF6B35] tracking-[1px]">
                      LIVE MARKET TREND SIGNAL
                    </span>
                    <p className="font-ibm-mono text-[12px] text-[#F5F5F0] font-bold leading-[1.5]">
                      &ldquo;{currentProfData.marketStat}&rdquo;
                    </p>
                  </div>

                </div>

                {/* Center Column: Explainable "Why" Reasoning */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* Why Card */}
                  <div className="bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FFD600]" />
                      <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[1px]">
                        EXPLAINABLE REASONING (WHY THIS ROLE IS AT RISK)
                      </span>
                    </div>

                    <p className="font-ibm-mono text-[13px] text-[#F5F5F0] leading-[1.6] bg-[#141414] p-4 border border-[#262626]">
                      {currentProfData.whyReason}
                    </p>
                  </div>

                  {/* Reskilling Path: Current Skills -> Adjacent In-Demand Skills */}
                  <div className="bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-4">
                    <span className="font-ibm-mono text-[11px] font-bold text-[#4ADE80] tracking-[1px]">
                      ADJACENT SKILL TRANSITION ROADMAP (RECOMMENDED RESKILLING)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current Skills */}
                      <div className="p-4 bg-[#141414] border border-[#262626]">
                        <span className="font-ibm-mono text-[10px] text-[#888] block mb-2">
                          YOUR CURRENT SKILLS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentProfData.currentSkills.map((s) => (
                            <span key={s} className="font-ibm-mono text-[10px] bg-[#222] text-[#AAA] px-2 py-1">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Adjacent In-Demand Skills */}
                      <div className="p-4 bg-[#141814] border border-[#233A23]">
                        <span className="font-ibm-mono text-[10px] text-[#4ADE80] font-bold block mb-2">
                          ⚡ ADJACENT IN-DEMAND SKILLS (HIGH VALUE)
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentProfData.adjacentSkills.map((s) => (
                            <span key={s} className="font-ibm-mono text-[10px] bg-[#1A2E1A] text-[#4ADE80] font-bold px-2 py-1 border border-[#4ADE80]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reskilling Courses */}
                    <div className="flex flex-col gap-3 mt-2">
                      <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">
                        RECOMMENDED REALISTIC TRANSITION COURSES
                      </span>
                      {currentProfData.reskillingCourses.map((crs) => (
                        <div key={crs.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#141414] border border-[#262626] gap-3">
                          <div>
                            <span className="font-ibm-mono text-[9px] text-[#FFD600] font-bold tracking-[1px] block">
                              TRANSITION: {crs.transition}
                            </span>
                            <h4 className="font-grotesk text-[14px] font-bold text-[#F5F5F0] mt-0.5">
                              {crs.title}
                            </h4>
                            <span className="font-ibm-mono text-[10px] text-[#777]">
                              {crs.provider} // {crs.duration}
                            </span>
                          </div>

                          <button className="bg-[#FFD600] hover:bg-[#e6c200] text-[#0A0A0A] font-grotesk text-[11px] font-bold px-4 py-2 shrink-0 transition-colors">
                            ENROLL RESKILL &gt;
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ════════════════════ 2. STUDENT DASHBOARD ════════════════════ */}
          {activeTab === "student" && (
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111] p-5 border border-[#222]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFD600] text-[#0A0A0A] font-grotesk font-bold flex items-center justify-center text-lg">
                    {assessmentResult?.data?.basic?.name ? assessmentResult.data.basic.name.slice(0, 2).toUpperCase() : "RS"}
                  </div>
                  <div>
                    <h2 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">
                      {assessmentResult?.data?.basic?.name || "Rahul Sharma"} <span className="font-ibm-mono text-[11px] text-[#FFD600] font-normal">// Student Profile</span>
                    </h2>
                    <p className="font-ibm-mono text-[11px] text-[#888]">
                      {assessmentResult?.data?.basic?.field || "Computer Science"} ({assessmentResult?.data?.basic?.education || "Undergrad"}) — {assessmentResult?.data?.basic?.location || "Pune"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-[#161616] border border-[#333] px-3 py-1.5 font-ibm-mono text-[11px] text-[#4ADE80]">
                    TECHNICAL TEST SCORE: {assessmentResult?.technicalScore !== undefined ? `${assessmentResult.technicalScore} / 7` : "6 / 7"} (78% Job-Ready)
                  </div>
                  {assessmentResult?.privacyIsolated && (
                    <span className="font-ibm-mono text-[9px] text-[#4ADE80]">🔒 ISOLATED RECORD ACCESS</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Skills & Gap */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* Your Skills */}
                  <div className="bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[1px]">
                        YOUR CURRENT SKILLS
                      </span>
                      <span className="font-ibm-mono text-[10px] text-[#777]">
                        {studentSkills.length} SKILLS ADDED
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {studentSkills.map((sk) => (
                        <div
                          key={sk}
                          className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333] px-3 py-1.5 font-ibm-mono text-[12px] text-[#F5F5F0]"
                        >
                          <span>{sk}</span>
                          <button
                            onClick={() => removeStudentSkill(sk)}
                            className="text-[#777] hover:text-[#FF6B35]"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add skill input */}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Add a new skill (e.g. Docker, React, AWS)..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addStudentSkill()}
                        className="flex-1 bg-[#141414] border border-[#2A2A2A] focus:border-[#FFD600] px-3 py-2 font-ibm-mono text-[11px] text-[#F5F5F0] outline-none"
                      />
                      <button
                        onClick={addStudentSkill}
                        className="bg-[#222] hover:bg-[#FFD600] hover:text-[#0A0A0A] text-[#F5F5F0] font-ibm-mono text-[11px] font-bold px-4 transition-colors"
                      >
                        + ADD
                      </button>
                    </div>
                  </div>

                  {/* Skill Gap Alert Card */}
                  <div className="bg-[#191208] border-2 border-[#FF6B35] p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
                      <span className="font-ibm-mono text-[11px] font-bold text-[#FF6B35] tracking-[1px]">
                        LIVE MARKET SKILL GAP ALERT
                      </span>
                    </div>

                    <h3 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">
                      The Pune IT Job Market is asking for 3 key skills you don&apos;t currently have:
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                      {[
                        { skill: "Docker & Containerization", demand: "84% listings ask" },
                        { skill: "PyTorch / ML Basics", demand: "62% growth in 2026" },
                        { skill: "Kubernetes Ops", demand: "High demand in Pune" },
                      ].map((item) => (
                        <div key={item.skill} className="bg-[#0E0E0E] p-3 border border-[#3A2215]">
                          <span className="font-ibm-mono text-[12px] font-bold text-[#FF6B35] block">
                            {item.skill}
                          </span>
                          <span className="font-ibm-mono text-[10px] text-[#888] block mt-1">
                            {item.demand}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Courses List */}
                  <div className="bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-4">
                    <span className="font-ibm-mono text-[11px] font-bold text-[#F5F5F0] tracking-[1px]">
                      RECOMMENDED BRIDGE COURSES &amp; MODULES
                    </span>

                    <div className="flex flex-col gap-3">
                      {[
                        { title: "Applied Containerization & Docker for Engineers", provider: "MSBTE Bridge Course", duration: "4 Weeks", match: "96% Match" },
                        { title: "Industrial ML & Predictive Analytics", provider: "COEP Skill Initiative", duration: "6 Weeks", match: "91% Match" },
                        { title: "Cloud Microservices & DevOps Fundamentals", provider: "NSDC Certified", duration: "5 Weeks", match: "88% Match" },
                      ].map((c) => (
                        <div key={c.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#141414] border border-[#222] gap-2">
                          <div>
                            <h4 className="font-grotesk text-[14px] font-bold text-[#F5F5F0]">{c.title}</h4>
                            <span className="font-ibm-mono text-[10px] text-[#888]">{c.provider} // {c.duration}</span>
                          </div>
                          <span className="font-ibm-mono text-[11px] font-bold text-[#4ADE80] bg-[#1A261A] border border-[#4ADE80] px-2 py-1 text-center shrink-0">
                            {c.match}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column: Visual Career Roadmap */}
                <div className="bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-4">
                  <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[1px]">
                    CAREER PATHWAY ROADMAP
                  </span>

                  <div className="flex flex-col gap-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#222]">
                    {[
                      { step: "CURRENT POSITION", title: "Diploma Student", status: "Active", color: "#FFD600" },
                      { step: "BRIDGE STEP 01", title: "Complete Docker & ML Module", status: "Recommended", color: "#FF6B35" },
                      { step: "BRIDGE STEP 02", title: "Industry Internship (Pune IT Park)", status: "Target", color: "#4ADE80" },
                      { step: "TARGET ROLE", title: "Junior DevOps / Cloud Engineer", status: "Avg ₹5.8 LPA", color: "#F5F5F0" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 relative z-10 pl-1">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: item.color, color: "#0A0A0A" }}
                        >
                          <span className="font-grotesk text-[10px] font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <span className="font-ibm-mono text-[9px] text-[#777] tracking-[1px] block">
                            {item.step}
                          </span>
                          <h4 className="font-grotesk text-[14px] font-bold text-[#F5F5F0] mt-0.5">
                            {item.title}
                          </h4>
                          <span className="font-ibm-mono text-[10px] text-[#A0A09A] mt-0.5 block">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ════════════════════ 3. EMPLOYER DASHBOARD ════════════════════ */}
          {activeTab === "employer" && (
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111] p-5 border border-[#222]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-ibm-mono text-[10px] text-[#FFD600] tracking-[2px]">EMPLOYER DEMAND LOOP</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  </div>
                  <h2 className="font-grotesk text-[22px] font-bold text-[#F5F5F0]">
                    Industry Skill Signal Submission &amp; Candidate Matching
                  </h2>
                </div>
                <div className="font-ibm-mono text-[11px] text-[#4ADE80] bg-[#161616] border border-[#2D2D2D] px-3 py-1.5">
                  ACTIVE HIRING PIPELINE: 1,420 CANDIDATES
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Form: Submit Skill Demand Signal */}
                <form onSubmit={handleEmployerSubmit} className="bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-4">
                  <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[1px]">
                    SUBMIT DEMAND SIGNAL
                  </span>

                  {submittedSignal && (
                    <div className="p-3 bg-[#1A261A] border border-[#4ADE80] text-[#4ADE80] font-ibm-mono text-[10px]">
                      ✓ Signal registered! Updated region skill graph.
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[10px] text-[#888]">SECTOR</label>
                    <select
                      value={demandSector}
                      onChange={(e) => setDemandSector(e.target.value)}
                      className="bg-[#161616] border border-[#2D2D2D] text-[#F5F5F0] font-ibm-mono text-[11px] p-2.5 outline-none focus:border-[#FFD600]"
                    >
                      <option value="IT / Software">IT / Software</option>
                      <option value="Automotive">Automotive &amp; Manufacturing</option>
                      <option value="Agritech">Agritech</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[10px] text-[#888]">WHAT SKILLS DO YOU NEED?</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PyTorch, CNC Programming, React"
                      value={demandSkill}
                      onChange={(e) => setDemandSkill(e.target.value)}
                      className="bg-[#161616] border border-[#2D2D2D] text-[#F5F5F0] font-ibm-mono text-[11px] p-2.5 outline-none focus:border-[#FFD600]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[10px] text-[#888]">REQUIRED OPENINGS COUNT</label>
                    <input
                      type="number"
                      required
                      placeholder="25"
                      value={demandOpenings}
                      onChange={(e) => setDemandOpenings(e.target.value)}
                      className="bg-[#161616] border border-[#2D2D2D] text-[#F5F5F0] font-ibm-mono text-[11px] p-2.5 outline-none focus:border-[#FFD600]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-[44px] bg-[#FFD600] hover:bg-[#e6c200] text-[#0A0A0A] font-grotesk font-bold text-[12px] tracking-[1.5px] mt-2 transition-colors"
                  >
                    SUBMIT DEMAND SIGNAL &gt;
                  </button>
                </form>

                {/* Candidate Matching List */}
                <div className="lg:col-span-2 bg-[#0E0E0E] p-5 border border-[#222] flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#222] pb-3">
                    <span className="font-ibm-mono text-[11px] font-bold text-[#F5F5F0] tracking-[1px]">
                      JOB-READY MATCHED CANDIDATES (PUNE REGION)
                    </span>
                    <span className="font-ibm-mono text-[10px] text-[#777]">AI MATCH ACCURACY 94%</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Aditya Patil", institute: "Govt Polytechnic Pune", skills: ["Python", "Docker", "SQL"], match: "98% Match", status: "Available" },
                      { name: "Pooja Deshmukh", institute: "COEP Pune", skills: ["C++", "PyTorch", "OpenCV"], match: "94% Match", status: "Available" },
                      { name: "Siddharth Shinde", institute: "ITI Aundh Pune", skills: ["CNC Programming", "PLC Automation"], match: "91% Match", status: "Available" },
                      { name: "Neha Kulkarni", institute: "Govt Polytechnic Nashik", skills: ["TypeScript", "Next.js", "Tailwind"], match: "89% Match", status: "Available" },
                    ].map((cand) => (
                      <div key={cand.name} className="p-4 bg-[#141414] border border-[#222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-grotesk text-[15px] font-bold text-[#F5F5F0]">{cand.name}</h4>
                            <span className="font-ibm-mono text-[9px] text-[#4ADE80] bg-[#1A261A] px-1.5 py-0.5">{cand.status}</span>
                          </div>
                          <span className="font-ibm-mono text-[10px] text-[#888]">{cand.institute}</span>
                          <div className="flex gap-1.5 mt-2">
                            {cand.skills.map((s) => (
                              <span key={s} className="font-ibm-mono text-[9px] bg-[#222] text-[#CCC] px-2 py-0.5">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button className="bg-[#1A1A1A] hover:bg-[#FFD600] hover:text-[#0A0A0A] text-[#FFD600] font-ibm-mono text-[10px] font-bold px-3 py-2 border border-[#FFD600] transition-colors shrink-0">
                          {cand.match} // CONNECT &gt;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#0D0D0D] border-t border-[#222] px-4 py-2.5 text-[10px] font-ibm-mono text-[#666] shrink-0 gap-2">
          <span>SIH26134 — LABOUR MARKET INTELLIGENCE DEMO</span>
          <div className="flex items-center gap-4">
            <span className="text-[#FFD600]">SYSTEM STATUS: ONLINE</span>
            <span>24H REFRESH CYCLE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
