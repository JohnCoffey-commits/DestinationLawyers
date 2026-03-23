import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Specialities } from "@/components/sections/Specialities";
import { TimelineDial } from "@/components/sections/TimelineDial";
import { StatsSection } from "@/components/sections/StatsSection";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { ScrollTransitionBanner } from "@/components/sections/ScrollTransitionBanner";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { BackToTopButton } from "@/components/sections/BackToTopButton";

export const metadata: Metadata = {
  title: "Home",
  description: "Placeholder home description for the migrated site.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Placeholder Brand",
    description: "Placeholder home description for the migrated site.",
    url: "/",
  },
  twitter: {
    title: "Placeholder Brand",
    description: "Placeholder home description for the migrated site.",
  },
};

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <Navbar />
      <Hero />
      <Services />
      <Specialities />
      <TimelineDial />
      <StatsSection />
      <Team />
      <Testimonials />
      <ScrollTransitionBanner />
      <Contact />
      <Footer />
      <BackToTopButton />
    </div>
  );
}
