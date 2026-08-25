"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PixelDivider from "@/components/PixelDivider";
import Logos from "@/components/Logos";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Bento from "@/components/Bento";
import Comparison from "@/components/Comparison";
import Showcase from "@/components/Showcase";
import FAQ from "@/components/FAQ";
import Roadmap from "@/components/Roadmap";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import AssessmentModal from "@/components/AssessmentModal";
import DashboardModal from "@/components/DashboardModal";

type RoleTab = "student" | "professional" | "employer";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleTab>("professional");

  const openAuth = () => setAuthModalOpen(true);
  
  // Step: Auth signup/login -> launches mandatory assessment
  const handleRoleAuthComplete = (role: RoleTab) => {
    setActiveRole(role);
    setAuthModalOpen(false);
    setAssessmentModalOpen(true);
  };

  // Step: Assessment completed -> opens final dashboard
  const handleAssessmentComplete = (assessmentData: any) => {
    setAssessmentModalOpen(false);
    setDashboardModalOpen(true);
  };

  // Direct demo trigger (e.g. Hero EXPLORE DASHBOARD)
  const openDashboardDirect = (role: RoleTab = "professional") => {
    setActiveRole(role);
    setDashboardModalOpen(true);
  };

  return (
    <main className="flex flex-col w-full bg-[#0A0A0A] pt-[60px]">
      <Navbar onOpenAuth={openAuth} onOpenDashboard={openDashboardDirect} />
      <Hero onOpenAuth={openAuth} onOpenDashboard={openDashboardDirect} />
      <PixelDivider />
      <Logos />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Bento />
      <Comparison />
      <Showcase />
      <FAQ />
      <Roadmap />
      <FinalCTA onOpenAuth={openAuth} onOpenDashboard={openDashboardDirect} />
      <Footer />

      {/* Step 1 & 2: Auth / Role Selection Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSelectRoleDashboard={(role) => handleRoleAuthComplete(role)}
      />

      {/* Step 3: Mandatory Onboarding Assessment Wizard (10 Qs per role) */}
      <AssessmentModal
        isOpen={assessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
        role={activeRole}
        onComplete={handleAssessmentComplete}
      />

      {/* Step 4: Role-Specific Dashboard Modal */}
      <DashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        initialRole={activeRole}
      />
    </main>
  );
}
