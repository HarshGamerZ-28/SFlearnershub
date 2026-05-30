import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Metadata } from "next";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about SF Learners Hub and our team.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-12 pb-24 px-6 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden relative shadow-lg shadow-brand-500/25 border border-[rgba(91,114,240,0.2)]">
              <Image src="/logo.jpg" alt="SF Learners Hub" fill className="object-cover scale-[1.18]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">About Us</span>
            </h1>
            <p className="text-lg text-slate-400 font-medium">
              Senior Salesforce Developer || 5x Salesforce Certified || 2x Copado Certified || 37x Super Badges || 6x Ranger || Content Writer
            </p>
          </div>

          <div className="glass p-8 md:p-12 rounded-3xl border border-[rgba(91,114,240,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              Self-motivated IT Professional with 2+ years of experience overall. and customers to achieve the desired result. Hands-on experience as a Salesforce administrator and capable of developing applications on the Salesforce platform.
            </p>
            <p>
              Team Player with good interpersonal and communication skills. Capable of understanding functional and technical requirements for the implementation.
            </p>
            <p>
              I have good knowledge of Salesforce like Sharing Rules, Apex Sharing, Apex Classes, Aura, LWC, triggers, profiles, permissions sets, OWD, Profiles, Data Security, Data Management, Data Modeling, Flows, Process Builder, Process Automation, User Management, integration, etc.
            </p>
            
            <h2 className="font-display text-2xl font-bold text-white pt-6 pb-2">What We Do : Salesforce Learners</h2>
            
            <p>
              Salesforce is the world&apos;s #1 customer relationship management (CRM) platform. Salesforce help your marketing, sales, commerce, service and IT teams work as one from anywhere — so you can keep your customers happy everywhere.
            </p>
            <p>
              Our team of seasoned Salesforce professionals and trainers is committed to providing you with high-quality, up-to-date content. We understand that learning Salesforce can be a transformative journey, and we are here to guide you every step of the way.
            </p>
            <p>
              Join our vibrant community of Salesforce enthusiasts, connect with fellow learners, and stay updated with the latest industry trends and Salesforce innovations.
            </p>
            <p className="text-brand-400 font-medium pt-4">
              Let&apos;s embark on this exciting journey together, and unlock the endless possibilities that Salesforce has to offer. Welcome to Salesforce Learners!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
