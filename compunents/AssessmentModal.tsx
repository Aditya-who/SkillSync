"use client";

import { useState, useEffect } from "react";

export type RoleType = "student" | "professional" | "employer";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: RoleType;
  onComplete: (assessmentData: any) => void;
}

export default function AssessmentModal({
  isOpen,
  onClose,
  role,
  onComplete,
}: AssessmentModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // Student State
  const [studentDomain, setStudentDomain] = useState<"IT" | "Commerce" | "Mechanical">("IT");
  const [studentBasic, setStudentBasic] = useState({
    name: "",
    education: "Undergrad (B.Tech / BE)",
    field: "Computer Science",
    location: "Maharashtra - Pune",
  });
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({
    q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "32", q10: "4",
  });

  // Professional State
  const [profRoleDomain, setProfRoleDomain] = useState<"DataEntry" | "Accountant" | "ManualQA">("DataEntry");
  const [profBasic, setProfBasic] = useState({
    name: "",
    jobTitle: "Data Entry Operator",
    experience: "1-3 Years",
    industry: "IT / ITES",
  });
  const [profTasks, setProfTasks] = useState("Manual spreadsheet logging and keystroke verification.");
  const [profAnswers, setProfAnswers] = useState<Record<string, any>>({
    q3: "", q4: "", q5: "", q6_aiTools: ["ChatGPT"], q7_comfort: 3, q8_automated: "Yes", q9_reskill: "Yes", q10_time: "5-10 hrs/wk",
  });

  // Employer State
  const [empBasic, setEmpBasic] = useState({
    companyName: "",
    industry: "IT / Software",
    companySize: "SME (50-250)",
    location: "Pune, Maharashtra",
  });
  const [empHiringRoles, setEmpHiringRoles] = useState("AI Data Validator, Playwright QA Engineer");
  const [empAnswers, setEmpAnswers] = useState({
    q3_skills: ["Python", "Docker", "SQL Validation"],
    q4_proficiency: "Intermediate",
    q5_certsNeeded: "No",
    q6_tools: ["Docker", "Playwright", "Postman"],
    q7_painPoint: "Candidates have theoretical knowledge but lack hands-on tool experience.",
    q8_aiImportance: 4,
    q9_periodicallyValidate: "Yes",
    q10_contactMethod: "Dashboard Alert",
  });

  useEffect(() => {
    setCurrentQuestion(1);
  }, [role, isOpen]);

  if (!isOpen) return null;

  const totalQuestions = 10;
  const progressPercent = (currentQuestion / totalQuestions) * 100;

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate technical assessment score
      let score = 0;
      if (role === "student") {
        if (studentDomain === "IT") {
          if (studentAnswers.q3?.includes("Application Programming Interface")) score += 1;
          if (studentAnswers.q4 === "HTML") score += 1;
          if (studentAnswers.q5?.includes("Version Control")) score += 1;
          if (studentAnswers.q6 === "Infinite Loop") score += 1;
          if (studentAnswers.q7?.includes("Pattern recognition")) score += 1;
          if (studentAnswers.q8 === "SELECT") score += 1;
        } else if (studentDomain === "Commerce") {
          if (studentAnswers.q3 === "Balance Sheet") score += 1;
          if (studentAnswers.q4?.includes("Goods and Services Tax")) score += 1;
          if (studentAnswers.q5 === "VLOOKUP / XLOOKUP") score += 1;
          if (studentAnswers.q6?.includes("Asset cost allocation")) score += 1;
          if (studentAnswers.q7 === "Invoice") score += 1;
          if (studentAnswers.q8?.includes("Accounting & ERP")) score += 1;
        } else {
          if (studentAnswers.q3?.includes("Computer Numerical Control")) score += 1;
          if (studentAnswers.q4 === "Vernier Caliper / Micrometer") score += 1;
          if (studentAnswers.q5 === "Ampere") score += 1;
          if (studentAnswers.q6 === "Computer-Aided Design") score += 1;
          if (studentAnswers.q7 === "Hardness") score += 1;
          if (studentAnswers.q8?.includes("Programmable Logic Controller")) score += 1;
        }
        if (studentAnswers.q9 === "32") score += 1;
      }

      const userId = "user_" + Math.random().toString(36).substring(2, 9);
      const payload = {
        userId,
        role,
        completedAt: new Date().toISOString(),
        privacyIsolated: true,
        technicalScore: score,
        data: role === "student"
          ? { basic: studentBasic, domain: studentDomain, answers: studentAnswers, score }
          : role === "professional"
          ? { basic: profBasic, tasks: profTasks, domainRole: profRoleDomain, answers: profAnswers }
          : { basic: empBasic, hiringRoles: empHiringRoles, answers: empAnswers },
      };

      try {
        localStorage.setItem(`skillsync_isolated_assessment_${userId}`, JSON.stringify(payload));
        localStorage.setItem("skillsync_current_user_id", userId);
      } catch (err) {
        console.error("Local storage write error:", err);
      }

      onComplete(payload);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-[720px] bg-[#0E0E0E] border-2 border-[#FFD600] p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD600]" />
            <span className="font-ibm-mono text-[11px] font-bold text-[#FFD600] tracking-[2px]">
              DYNAMIC TECHNICAL &amp; SKILL ASSESSMENT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-ibm-mono text-[9px] text-[#4ADE80] bg-[#1A261A] border border-[#4ADE80] px-2 py-0.5 font-bold">
              🔒 PRIVACY ISOLATION ACTIVE
            </span>
            <button
              onClick={onClose}
              className="font-ibm-mono text-[12px] text-[#888] hover:text-[#FFD600] px-1 transition-colors"
            >
              [✕]
            </button>
          </div>
        </div>

        {/* Wizard Progress Bar */}
        <div className="flex flex-col gap-1.5 mb-6">
          <div className="flex items-center justify-between font-ibm-mono text-[10px]">
            <span className="text-[#888]">QUESTION {currentQuestion} OF {totalQuestions}</span>
            <span className="text-[#FFD600] font-bold">{Math.round(progressPercent)}% COMPLETED</span>
          </div>
          <div className="w-full h-1.5 bg-[#1A1A1A] border border-[#2D2D2D] overflow-hidden">
            <div
              className="h-full bg-[#FFD600] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ════════════════════ 1. STUDENT ASSESSMENT TRACK (DYNAMIC DYNAMIC DOMAIN MCQS) ════════════════════ */}
        {role === "student" && (
          <div className="flex flex-col gap-5 min-h-[340px]">
            
            {/* Q1: Combined Basic Info */}
            {currentQuestion === 1 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FFD600] font-bold tracking-[1px]">STEP 01 // COMBINED BASIC PROFILE</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Enter your primary details:</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">FULL NAME</label>
                    <input
                      type="text" required placeholder="e.g. Rahul Sharma"
                      value={studentBasic.name}
                      onChange={(e) => setStudentBasic({ ...studentBasic, name: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">EDUCATION LEVEL</label>
                    <select
                      value={studentBasic.education}
                      onChange={(e) => setStudentBasic({ ...studentBasic, education: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    >
                      <option value="Diploma / ITI">Diploma / ITI</option>
                      <option value="Undergrad (B.Tech / BE)">Undergrad (B.Tech / BE)</option>
                      <option value="Undergrad (B.Sc / B.Com)">Undergrad (B.Sc / B.Com)</option>
                      <option value="Postgrad (M.Tech / MBA)">Postgrad (M.Tech / MBA)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">FIELD OF STUDY / STREAM</label>
                    <input
                      type="text" required placeholder="e.g. Computer Engineering"
                      value={studentBasic.field}
                      onChange={(e) => setStudentBasic({ ...studentBasic, field: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">LOCATION (STATE &amp; DISTRICT)</label>
                    <input
                      type="text" required placeholder="e.g. Maharashtra - Pune"
                      value={studentBasic.location}
                      onChange={(e) => setStudentBasic({ ...studentBasic, location: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Q2: Domain Selection */}
            {currentQuestion === 2 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FFD600] font-bold tracking-[1px]">STEP 02 // DOMAIN SELECTION</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Which industry/domain interests you most?</h3>
                <p className="font-ibm-mono text-[11px] text-[#888]">This filters your 6 technical assessment questions below.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "IT", label: "IT / CS & Software", desc: "APIs, Git, SQL, Python & ML concepts" },
                    { id: "Commerce", label: "Commerce & Finance", desc: "Tally, GST, Balance Sheets, Invoices & VLOOKUP" },
                    { id: "Mechanical", label: "Core Engineering / Mfg", desc: "CNC, PLC, Vernier Gauges, CAD & Current" },
                  ].map((dom) => (
                    <button
                      key={dom.id}
                      onClick={() => setStudentDomain(dom.id as any)}
                      className={`p-4 border text-left transition-all ${
                        studentDomain === dom.id
                          ? "bg-[#1C1C1C] border-[#FFD600]"
                          : "bg-[#121212] border-[#2A2A2A] hover:border-[#555]"
                      }`}
                    >
                      <span className="font-grotesk text-[15px] font-bold text-[#F5F5F0] block">{dom.label}</span>
                      <span className="font-ibm-mono text-[10px] text-[#888] mt-1 block">{dom.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q3 - Q8: Dynamic Technical MCQ Test per Domain */}
            {currentQuestion >= 3 && currentQuestion <= 8 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#4ADE80] font-bold tracking-[1px]">
                  TECHNICAL TEST // {studentDomain.toUpperCase()} DOMAIN (Q{currentQuestion} OF 10)
                </span>

                {/* IT DOMAIN MCQS */}
                {studentDomain === "IT" && (
                  <>
                    {currentQuestion === 3 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q3: What does &quot;API&quot; stand for and what is it used for?</h4>
                        {[
                          "Application Programming Interface — enables software applications to communicate with each other",
                          "Automated Program Integration — used for formatting hard drives",
                          "Advanced Processor Instruction — used for CPU overclocking",
                        ].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="it_q3" value={opt}
                              checked={studentAnswers.q3 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q3: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {currentQuestion === 4 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q4: Which of these is NOT a programming language?</h4>
                        {["Python", "Java", "HTML", "SQL"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="it_q4" value={opt}
                              checked={studentAnswers.q4 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q4: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt} {opt === "HTML" ? "(Markup language)" : ""}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {currentQuestion === 5 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q5: What is the primary purpose of Git?</h4>
                        {[
                          "Distributed Version Control System to track code changes and collaborate",
                          "Cloud Server Hosting Platform",
                          "UI Design Mockup Generator",
                        ].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="it_q5" value={opt}
                              checked={studentAnswers.q5 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q5: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {currentQuestion === 6 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q6: If a program executes in a loop without a termination condition, what is it called?</h4>
                        {["Infinite Loop", "Deadlock", "Recursion", "Segmentation Fault"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="it_q6" value={opt}
                              checked={studentAnswers.q6 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q6: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {currentQuestion === 7 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q7: What is Machine Learning (ML) primarily used for?</h4>
                        {[
                          "Pattern recognition & predictive modeling from data without explicit rules",
                          "Formatting Excel cells and columns",
                          "Hardware circuit soldering",
                        ].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="it_q7" value={opt}
                              checked={studentAnswers.q7 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q7: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {currentQuestion === 8 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q8: Which SQL command is used to retrieve data from a database table?</h4>
                        {["SELECT", "EXTRACT", "FETCH", "GET"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="it_q8" value={opt}
                              checked={studentAnswers.q8 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q8: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* COMMERCE DOMAIN MCQS */}
                {studentDomain === "Commerce" && (
                  <>
                    {currentQuestion === 3 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q3: Which statement shows a company&apos;s financial position at a specific point in time?</h4>
                        {["Balance Sheet", "Income Statement", "Cash Flow Statement"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="com_q3" value={opt}
                              checked={studentAnswers.q3 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q3: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 4 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q4: What does GST stand for in Indian taxation?</h4>
                        {["Goods and Services Tax", "General Sales Tax", "Government State Tax"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="com_q4" value={opt}
                              checked={studentAnswers.q4 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q4: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion >= 5 && currentQuestion <= 8 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q{currentQuestion}: In MS Excel, which function looks up a value in a table?</h4>
                        {["VLOOKUP / XLOOKUP", "SUMIF", "COUNTIF", "CONCATENATE"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name={`com_q${currentQuestion}`} value={opt}
                              checked={studentAnswers[`q${currentQuestion}`] === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, [`q${currentQuestion}`]: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* MECHANICAL DOMAIN MCQS */}
                {studentDomain === "Mechanical" && (
                  <>
                    {currentQuestion === 3 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q3: What does CNC stand for in manufacturing?</h4>
                        {["Computer Numerical Control", "Central Network Code", "Component Control System"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="mech_q3" value={opt}
                              checked={studentAnswers.q3 === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, q3: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion >= 4 && currentQuestion <= 8 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q{currentQuestion}: Which instrument is used for high-precision dimensional measurement?</h4>
                        {["Vernier Caliper / Micrometer", "Standard Ruler", "Measuring Tape"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name={`mech_q${currentQuestion}`} value={opt}
                              checked={studentAnswers[`q${currentQuestion}`] === opt}
                              onChange={(e) => setStudentAnswers({ ...studentAnswers, [`q${currentQuestion}`]: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}

              </div>
            )}

            {/* Q9: Logical Reasoning */}
            {currentQuestion === 9 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FF6B35] font-bold tracking-[1px]">LOGICAL REASONING // Q9 OF 10</span>
                <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Complete the number series: 2, 4, 8, 16, ?</h4>
                {["24", "32", "30", "64"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="q9" value={opt}
                      checked={studentAnswers.q9 === opt}
                      onChange={(e) => setStudentAnswers({ ...studentAnswers, q9: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Q10: Confidence Self-Assessment */}
            {currentQuestion === 10 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FFD600] font-bold tracking-[1px]">SELF-ASSESSMENT // Q10 OF 10</span>
                <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">How confident are you in learning new technical tools quickly (1 to 5)?</h4>
                
                <div className="bg-[#141414] p-4 border border-[#262626] flex flex-col gap-3">
                  <div className="flex justify-between font-ibm-mono text-[12px]">
                    <span>Confidence Score:</span>
                    <span className="text-[#FFD600] font-bold">{studentAnswers.q10} / 5</span>
                  </div>
                  <input
                    type="range" min="1" max="5"
                    value={studentAnswers.q10}
                    onChange={(e) => setStudentAnswers({ ...studentAnswers, q10: e.target.value })}
                    className="accent-[#FFD600]"
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* ════════════════════ 2. WORKING PROFESSIONAL ASSESSMENT TRACK ════════════════════ */}
        {role === "professional" && (
          <div className="flex flex-col gap-5 min-h-[340px]">
            
            {/* Q1: Combined Basic Profile */}
            {currentQuestion === 1 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FFD600] font-bold tracking-[1px]">STEP 01 // COMBINED PROFILE</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Enter your current employment details:</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">FULL NAME</label>
                    <input
                      type="text" required placeholder="e.g. Priya Sharma"
                      value={profBasic.name}
                      onChange={(e) => setProfBasic({ ...profBasic, name: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">CURRENT JOB TITLE</label>
                    <select
                      value={profBasic.jobTitle}
                      onChange={(e) => {
                        const title = e.target.value;
                        setProfBasic({ ...profBasic, jobTitle: title });
                        if (title.includes("Accountant")) setProfRoleDomain("Accountant");
                        else if (title.includes("QA")) setProfRoleDomain("ManualQA");
                        else setProfRoleDomain("DataEntry");
                      }}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    >
                      <option value="Data Entry Operator">Data Entry Operator</option>
                      <option value="Junior Accountant / Bookkeeper">Junior Accountant / Bookkeeper</option>
                      <option value="Software QA Manual Tester">Software QA Manual Tester</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">YEARS OF EXPERIENCE</label>
                    <select
                      value={profBasic.experience}
                      onChange={(e) => setProfBasic({ ...profBasic, experience: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    >
                      <option value="< 1 Year">&lt; 1 Year</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">INDUSTRY / SECTOR</label>
                    <input
                      type="text" required placeholder="e.g. ITES / Financial Services"
                      value={profBasic.industry}
                      onChange={(e) => setProfBasic({ ...profBasic, industry: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Q2: Tasks Description for AI Risk Keyword Matching */}
            {currentQuestion === 2 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#FF6B35] font-bold tracking-[1px]">AI RISK SIGNAL // Q2 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Briefly describe your day-to-day routine tasks:</h3>
                <textarea
                  rows={4}
                  placeholder="e.g. Keystroke data entry into Excel, verifying physical invoices, manual Tally entry..."
                  value={profTasks}
                  onChange={(e) => setProfTasks(e.target.value)}
                  className="w-full bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] p-3 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none resize-none"
                />
              </div>
            )}

            {/* Q3 - Q5: Dynamic Technical Assessment by Role */}
            {currentQuestion >= 3 && currentQuestion <= 5 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#4ADE80] font-bold tracking-[1px]">
                  TECHNICAL TEST // {profBasic.jobTitle.toUpperCase()} (Q{currentQuestion} OF 10)
                </span>

                {profRoleDomain === "DataEntry" && (
                  <>
                    {currentQuestion === 3 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q3: Which tool auto-extracts unstructured data from scanned paper invoices?</h4>
                        {["Optical Character Recognition (OCR)", "Tally Voucher Entry", "Manual Excel Typing"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="p_de_q3" value={opt}
                              checked={profAnswers.q3 === opt}
                              onChange={(e) => setProfAnswers({ ...profAnswers, q3: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 4 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q4: What is a common error-checking method during large spreadsheet entry?</h4>
                        {["Data Validation Rules", "Manual Eyeballing", "Deleting Rows"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="p_de_q4" value={opt}
                              checked={profAnswers.q4 === opt}
                              onChange={(e) => setProfAnswers({ ...profAnswers, q4: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion === 5 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q5: In Excel, which feature removes duplicate records from a table?</h4>
                        {["Remove Duplicates Tool", "Clear All", "Wrap Text"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="p_de_q5" value={opt}
                              checked={profAnswers.q5 === opt}
                              onChange={(e) => setProfAnswers({ ...profAnswers, q5: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {profRoleDomain === "Accountant" && (
                  <>
                    {currentQuestion === 3 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q3: Which software is commonly used for automated bookkeeping and ERP?</h4>
                        {["Tally Prime / QuickBooks", "Notepad", "Photoshop"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="p_ac_q3" value={opt}
                              checked={profAnswers.q3 === opt}
                              onChange={(e) => setProfAnswers({ ...profAnswers, q3: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion >= 4 && currentQuestion <= 5 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q{currentQuestion}: What does GST Reconciliation involve?</h4>
                        {["Matching purchase register with GSTR-2B portal data", "Calculating interest on savings", "Filing IT Returns"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name={`p_ac_q${currentQuestion}`} value={opt}
                              checked={profAnswers[`q${currentQuestion}`] === opt}
                              onChange={(e) => setProfAnswers({ ...profAnswers, [`q${currentQuestion}`]: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {profRoleDomain === "ManualQA" && (
                  <>
                    {currentQuestion === 3 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q3: Which modern framework is widely used for web test automation?</h4>
                        {["Playwright / Cypress", "Tally", "MS Word"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name="p_qa_q3" value={opt}
                              checked={profAnswers.q3 === opt}
                              onChange={(e) => setProfAnswers({ ...profAnswers, q3: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion >= 4 && currentQuestion <= 5 && (
                      <div className="flex flex-col gap-3">
                        <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Q{currentQuestion}: What is Regression Testing?</h4>
                        {["Re-testing software to ensure recent changes haven't broken existing features", "Deleting database records", "Initial project estimation"].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                            <input
                              type="radio" name={`p_qa_q${currentQuestion}`} value={opt}
                              checked={profAnswers[`q${currentQuestion}`] === opt}
                              onChange={(e) => setProfAnswers({ ...profAnswers, [`q${currentQuestion}`]: e.target.value })}
                              className="accent-[#FFD600]"
                            />
                            <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}

              </div>
            )}

            {/* Q6: AI Tools Familiarity Multi-select */}
            {currentQuestion === 6 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FFD600] font-bold tracking-[1px]">AI TOOL USAGE // Q6 OF 10</span>
                <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Which AI tools have you heard of or used?</h4>
                {["ChatGPT / Claude", "GitHub Copilot / Code Assistants", "Excel AI / PowerAutomate Plugins", "Midjourney / Image Gen", "None"].map((tool) => (
                  <label key={tool} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(profAnswers.q6_aiTools || []).includes(tool)}
                      onChange={(e) => {
                        const current = profAnswers.q6_aiTools || [];
                        if (e.target.checked) setProfAnswers({ ...profAnswers, q6_aiTools: [...current, tool] });
                        else setProfAnswers({ ...profAnswers, q6_aiTools: current.filter((t: string) => t !== tool) });
                      }}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{tool}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Q7-Q10: AI Readiness & Availability */}
            {currentQuestion === 7 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FF6B35] font-bold tracking-[1px]">AI COMFORT // Q7 OF 10</span>
                <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Rate your comfort level using AI tools for daily tasks (1 to 5):</h4>
                <div className="bg-[#141414] p-4 border border-[#262626] flex flex-col gap-3">
                  <div className="flex justify-between font-ibm-mono text-[12px]">
                    <span>Rating:</span>
                    <span className="text-[#FFD600] font-bold">{profAnswers.q7_comfort} / 5</span>
                  </div>
                  <input
                    type="range" min="1" max="5"
                    value={profAnswers.q7_comfort}
                    onChange={(e) => setProfAnswers({ ...profAnswers, q7_comfort: Number(e.target.value) })}
                    className="accent-[#FFD600]"
                  />
                </div>
              </div>
            )}

            {currentQuestion === 8 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">AUTOMATION IMPACT // Q8 OF 10</span>
                <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Has any part of your daily task already been automated/reduced?</h4>
                {["Yes — repetitive tasks are now automated", "No — no change felt yet", "Not sure"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="p_q8" value={opt}
                      checked={profAnswers.q8_automated === opt}
                      onChange={(e) => setProfAnswers({ ...profAnswers, q8_automated: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion === 9 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">RESKILLING INTENT // Q9 OF 10</span>
                <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Are you open to reskilling / adjacent role transition?</h4>
                {["Yes — actively looking", "Maybe — open if guidance provided", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="p_q9" value={opt}
                      checked={profAnswers.q9_reskill === opt}
                      onChange={(e) => setProfAnswers({ ...profAnswers, q9_reskill: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion === 10 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">AVAILABILITY // Q10 OF 10</span>
                <h4 className="font-grotesk text-[18px] font-bold text-[#F5F5F0]">Weekly time available for upskilling:</h4>
                {["< 5 hrs/wk", "5-10 hrs/wk", "10+ hrs/wk"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="p_q10" value={opt}
                      checked={profAnswers.q10_time === opt}
                      onChange={(e) => setProfAnswers({ ...profAnswers, q10_time: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ════════════════════ 3. EMPLOYER ASSESSMENT TRACK ════════════════════ */}
        {role === "employer" && (
          <div className="flex flex-col gap-5 min-h-[340px]">
            
            {/* Q1: Combined Company Basic Step */}
            {currentQuestion === 1 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FFD600] font-bold tracking-[1px]">STEP 01 // COMPANY PROFILE</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Enter company details:</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">COMPANY NAME</label>
                    <input
                      type="text" required placeholder="e.g. Tata Motors / Tech Mahindra"
                      value={empBasic.companyName}
                      onChange={(e) => setEmpBasic({ ...empBasic, companyName: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">INDUSTRY / SECTOR</label>
                    <select
                      value={empBasic.industry}
                      onChange={(e) => setEmpBasic({ ...empBasic, industry: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    >
                      <option value="IT / Software">IT / Software</option>
                      <option value="Automotive & Mfg">Automotive &amp; Mfg</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="FinTech">FinTech</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">COMPANY SIZE</label>
                    <select
                      value={empBasic.companySize}
                      onChange={(e) => setEmpBasic({ ...empBasic, companySize: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    >
                      <option value="Startup (<50)">Startup (&lt;50)</option>
                      <option value="SME (50-250)">SME (50-250)</option>
                      <option value="Enterprise (250+)">Enterprise (250+)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-ibm-mono text-[9px] text-[#888]">LOCATION / PLANT</label>
                    <input
                      type="text" required placeholder="e.g. Pune, Maharashtra"
                      value={empBasic.location}
                      onChange={(e) => setEmpBasic({ ...empBasic, location: e.target.value })}
                      className="bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 h-[40px] font-ibm-mono text-[12px] text-[#F5F5F0] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Q2: Hiring Roles */}
            {currentQuestion === 2 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">HIRING ROLES // Q2 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">What roles are you currently hiring for?</h3>
                <input
                  type="text"
                  placeholder="e.g. AI Data Validator, Playwright QA Engineer, CNC Operator"
                  value={empHiringRoles}
                  onChange={(e) => setEmpHiringRoles(e.target.value)}
                  className="w-full h-[46px] bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 font-ibm-mono text-[13px] text-[#F5F5F0] outline-none"
                />
              </div>
            )}

            {/* Q3-Q8: Technical Requirements */}
            {currentQuestion === 3 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">TECHNICAL SKILLS // Q3 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Top technical skills required for these roles:</h3>
                <input
                  type="text"
                  placeholder="e.g. Python, Docker, SQL Data Hygiene"
                  value={empAnswers.q3_skills.join(", ")}
                  onChange={(e) => setEmpAnswers({ ...empAnswers, q3_skills: e.target.value.split(", ") })}
                  className="w-full h-[46px] bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 font-ibm-mono text-[13px] text-[#F5F5F0] outline-none"
                />
              </div>
            )}

            {currentQuestion === 4 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">PROFICIENCY EXPECTED // Q4 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Minimum proficiency level expected:</h3>
                {["Beginner", "Intermediate", "Advanced"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="e_q4" value={opt}
                      checked={empAnswers.q4_proficiency === opt}
                      onChange={(e) => setEmpAnswers({ ...empAnswers, q4_proficiency: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion === 5 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">CERTIFICATIONS // Q5 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Do candidates need domain-specific certifications?</h3>
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="e_q5" value={opt}
                      checked={empAnswers.q5_certsNeeded === opt}
                      onChange={(e) => setEmpAnswers({ ...empAnswers, q5_certsNeeded: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion === 6 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">TOOL FAMILIARITY // Q6 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Which tools/software should candidates be fluent in?</h3>
                <input
                  type="text"
                  placeholder="e.g. Docker, Playwright, Tally Prime, Vernier"
                  value={empAnswers.q6_tools.join(", ")}
                  onChange={(e) => setEmpAnswers({ ...empAnswers, q6_tools: e.target.value.split(", ") })}
                  className="w-full h-[46px] bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] px-3 font-ibm-mono text-[13px] text-[#F5F5F0] outline-none"
                />
              </div>
            )}

            {currentQuestion === 7 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">PAIN POINT // Q7 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">What is your biggest skill-gap pain point when hiring?</h3>
                <textarea
                  rows={3}
                  placeholder="e.g. Candidates know theory but lack practical tool exposure..."
                  value={empAnswers.q7_painPoint}
                  onChange={(e) => setEmpAnswers({ ...empAnswers, q7_painPoint: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2D2D2D] focus:border-[#FFD600] p-3 font-ibm-mono text-[12px] text-[#F5F5F0] outline-none resize-none"
                />
              </div>
            )}

            {currentQuestion === 8 && (
              <div className="flex flex-col gap-4">
                <span className="font-ibm-mono text-[10px] text-[#FFD600] font-bold tracking-[1px]">AI IMPORTANCE // Q8 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Rate how important &quot;AI-tool familiarity&quot; is for this role (1 to 5):</h3>
                <div className="bg-[#141414] p-4 border border-[#262626] flex flex-col gap-3">
                  <div className="flex justify-between font-ibm-mono text-[12px]">
                    <span>Importance Level:</span>
                    <span className="text-[#FFD600] font-bold">{empAnswers.q8_aiImportance} / 5</span>
                  </div>
                  <input
                    type="range" min="1" max="5"
                    value={empAnswers.q8_aiImportance}
                    onChange={(e) => setEmpAnswers({ ...empAnswers, q8_aiImportance: Number(e.target.value) })}
                    className="accent-[#FFD600]"
                  />
                </div>
              </div>
            )}

            {/* Q9-Q10: Validation & Preferred Contact */}
            {currentQuestion === 9 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">VALIDATION // Q9 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Would you validate skill-demand signals periodically?</h3>
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="e_q9" value={opt}
                      checked={empAnswers.q9_periodicallyValidate === opt}
                      onChange={(e) => setEmpAnswers({ ...empAnswers, q9_periodicallyValidate: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion === 10 && (
              <div className="flex flex-col gap-3">
                <span className="font-ibm-mono text-[10px] text-[#888] tracking-[1px]">CONTACT METHOD // Q10 OF 10</span>
                <h3 className="font-grotesk text-[20px] font-bold text-[#F5F5F0]">Preferred contact method for candidate matches:</h3>
                {["Dashboard Alert", "Weekly Email Digest", "HR Portal API"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] hover:border-[#FFD600] cursor-pointer">
                    <input
                      type="radio" name="e_q10" value={opt}
                      checked={empAnswers.q10_contactMethod === opt}
                      onChange={(e) => setEmpAnswers({ ...empAnswers, q10_contactMethod: e.target.value })}
                      className="accent-[#FFD600]"
                    />
                    <span className="font-ibm-mono text-[12px] text-[#F5F5F0]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-[#222] pt-4 mt-auto">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 1}
            className={`font-ibm-mono text-[12px] px-4 py-2 border border-[#333] transition-colors ${
              currentQuestion === 1
                ? "opacity-30 cursor-not-allowed text-[#555]"
                : "text-[#888] hover:text-[#F5F5F0] hover:border-[#777]"
            }`}
          >
            &lt; PREVIOUS
          </button>

          <span className="font-ibm-mono text-[10px] text-[#666]">
            ROW-LEVEL DATA ISOLATION ACTIVE
          </span>

          <button
            onClick={handleNext}
            className="bg-[#FFD600] hover:bg-[#e6c200] text-[#0A0A0A] font-grotesk font-bold text-[12px] px-6 py-2 tracking-[1.5px] transition-colors"
          >
            {currentQuestion === totalQuestions ? "SUBMIT & LAUNCH DASHBOARD >" : "NEXT QUESTION >"}
          </button>
        </div>

      </div>
    </div>
  );
}
