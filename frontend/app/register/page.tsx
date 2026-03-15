'use client';

import { useState } from 'react';
import { Scan, User, Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="glass rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mx-auto mb-4">
            <Scan className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-white/60 mt-2">Start scanning ID documents</p>
        </div>

        <form className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Full name"
              className="w-full pl-10 pr-4 py-3 glass rounded-xl bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 glass rounded-xl bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 glass rounded-xl bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/40 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <label className="flex items-start gap-3 text-sm text-white/60 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 rounded bg-white/10 border-white/20"
            />
            <span>
              I agree to the <Link href="/terms" className="text-cyan-400">Terms</Link> and{' '}
              <Link href="/privacy" className="text-cyan-400">Privacy Policy</Link>
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 space-y-2">
          {['Free 100MB storage', 'Unlimited scans', 'Export to JSON, PDF'].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {feature}
            </div>
          ))}
        </div>

        <p className="text-center mt-6 text-white/60">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
