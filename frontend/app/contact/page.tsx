import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Twitter, Youtube, Linkedin, Facebook, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SF Learners Hub.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-12 pb-24 px-6 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Contact Us</span>
            </h1>
            <p className="text-lg text-slate-400 font-medium">
              We'd love to hear from you. Get in touch with us using the details below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3 glass p-8 rounded-3xl border border-[rgba(91,114,240,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-dark-700/50 border border-[rgba(91,114,240,0.2)] rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-brand-500 focus:bg-dark-700/80 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-dark-700/50 border border-[rgba(91,114,240,0.2)] rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-brand-500 focus:bg-dark-700/80 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-300 ml-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-dark-700/50 border border-[rgba(91,114,240,0.2)] rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-brand-500 focus:bg-dark-700/80 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 bg-dark-700/50 border border-[rgba(91,114,240,0.2)] rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-brand-500 focus:bg-dark-700/80 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-glow w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Details */}
              <div className="glass p-8 rounded-3xl border border-[rgba(91,114,240,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <h2 className="font-display text-2xl font-bold text-white mb-6">Contact Details</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="text-brand-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Address</h3>
                      <p className="leading-relaxed">Gali No 7 Kishori Kunj Colony<br />Haud Bari Dholpur, RJ 328021 India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                      <Mail className="text-violet-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <a href="mailto:mnbari4@gmail.com" className="hover:text-brand-400 transition-colors">mnbari4@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Phone className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Phone</h3>
                      <a href="tel:+919829251986" className="hover:text-emerald-400 transition-colors">+91 (982) 925 19 86</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Us */}
              <div className="glass p-8 rounded-3xl border border-[rgba(91,114,240,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <h2 className="font-display text-2xl font-bold text-white mb-6">Visit Us</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="text-brand-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Address</h3>
                      <p className="leading-relaxed">A4, Mittal Colony, Sodala,<br />Jaipur, Rajasthan 302006</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                      <Mail className="text-violet-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <a href="mailto:mnbari4@gmail.com" className="hover:text-brand-400 transition-colors">mnbari4@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Phone className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Phone</h3>
                      <a href="tel:+919829251986" className="hover:text-emerald-400 transition-colors">+91 (982) 925 19 86</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Keep In Touch */}
            <div className="lg:col-span-5 glass p-8 rounded-3xl border border-[rgba(91,114,240,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-center mt-2">
              <h2 className="font-display text-2xl font-bold text-white mb-8">Keep In Touch</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: "Linkedin", icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/sflearnershub/" },
                  { name: "Twitter", icon: <Twitter size={20} />, href: "https://twitter.com/SFLearnersHub" },
                  { name: "Medium", icon: <span className="font-bold font-serif px-1">M</span>, href: "https://amansfdc.medium.com/" },
                  { name: "Telegram", icon: <span className="font-bold px-1 text-sm">TG</span>, href: "https://t.me/+hzQFkLg8qSkyN2Q1" },
                  { name: "Youtube", icon: <Youtube size={20} />, href: "https://www.youtube.com/channel/UCYDK82lewStiUKKL3zhxBGg" },
                  { name: "Facebook", icon: <Facebook size={20} />, href: "https://www.facebook.com/profile.php?id=61555359370537" },
                  { name: "Instagram", icon: <Instagram size={20} />, href: "https://www.instagram.com/sflearnershub" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-brand-500/20 border border-[rgba(91,114,240,0.2)] hover:border-brand-500/50 text-slate-300 hover:text-white transition-all font-medium"
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
