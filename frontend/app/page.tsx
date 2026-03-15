'use client';

import { motion } from 'framer-motion';
import { Scan, Shield, Zap, Camera, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">India ID Scanner</span>
          </div>
          <Link 
            href="/login" 
            className="px-4 py-2 glass rounded-lg hover:bg-white/20 transition"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="pt-20 pb-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">AI-powered field detection</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-white mb-2">Scan Indian ID Cards</span>
              <span className="gradient-text">With AI Precision</span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Extract structured data from Aadhaar, PAN, Voter ID, and more. 
              Secure, fast, and built for India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/scanner"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition"
              >
                <Scan className="w-5 h-5" />
                Start Scanning
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 glass rounded-xl hover:bg-white/10 transition"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '99.9%', label: 'Accuracy' },
              { value: '<3s', label: 'Processing' },
              { value: '8+', label: 'ID Types' },
              { value: '100%', label: 'Secure' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Scan, title: 'AI-Powered OCR', desc: 'Advanced text extraction' },
                { icon: Shield, title: 'Bank-Grade Security', desc: 'Your data is protected' },
                { icon: Camera, title: 'Camera Scan', desc: 'Scan with your phone' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6"
                >
                  <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
