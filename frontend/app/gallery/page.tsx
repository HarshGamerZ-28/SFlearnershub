"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Camera } from "lucide-react";

const GALLERY_IMAGES = [
  { url: "https://sflearnershub.com/wp-content/uploads/2023/06/IMG_0630-Large.jpeg", title: "Salesforce Community Event" },
  { url: "https://sflearnershub.com/wp-content/uploads/2023/06/IMG_0648-Large.jpeg", title: "Learning Session" },
  { url: "https://sflearnershub.com/wp-content/uploads/2023/06/DSC_5500-Large.jpeg", title: "Tech Workshop" },
  { url: "https://sflearnershub.com/wp-content/uploads/2023/06/GB3A3619-Large.jpeg", title: "Team Collaboration" },
  { url: "https://sflearnershub.com/wp-content/uploads/2023/06/DSC_5484-Large.jpeg", title: "Salesforce Training" },
  { url: "https://sflearnershub.com/wp-content/uploads/2023/06/DSC_6134-Large.jpeg", title: "Networking Event" },
  { url: "https://sflearnershub.com/wp-content/uploads/2024/01/IMG-20230903-WA0034.jpg", title: "Global Summit" },
  { url: "https://sflearnershub.com/wp-content/uploads/2024/01/IMG-20230904-WA0027.jpg", title: "Community Meetup" },
  { url: "https://sflearnershub.com/wp-content/uploads/2024/01/IMG20230902113404-scaled.jpg", title: "Learning Hub Launch" },
  { url: "https://sflearnershub.com/wp-content/uploads/2024/01/IMG-20230903-WA0025.jpg", title: "Certification Celebration" },
  { url: "https://sflearnershub.com/wp-content/uploads/2024/01/IMG-20230903-WA0043-scaled.jpg", title: "Mentorship Session" },
  { url: "https://sflearnershub.com/wp-content/uploads/2024/01/IMG-20230904-WA0025.jpg", title: "Salesforce Insights" },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-mono mb-6 animate-fade-in">
              <Camera size={16} /> Our Moments
            </div>
            <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl gradient-text mb-4 sm:mb-6 animate-fade-up">
              Gallery
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto animate-fade-up stagger-1">
              Capturing the journey of learning, growth, and community within the Salesforce ecosystem.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <div 
                key={i}
                className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 glass animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Image 
                  src={img.url} 
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 420px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  loading={i < 6 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 sm:p-6 z-10">
                  <span className="text-white font-display font-bold text-base sm:text-lg">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
