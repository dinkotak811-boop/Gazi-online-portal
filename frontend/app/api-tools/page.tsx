'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check, Terminal, Key, RefreshCw, Zap, Shield } from 'lucide-react';

const codeExamples = {
  curl: `curl -X POST http://localhost:5000/api/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@aadhaar.jpg"`,

  javascript: `const formData = new FormData();
formData.append('image', file);

const response = await fetch('http://localhost:5000/api/scan', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: formData
});

const result = await response.json();`,

  python: `import requests

url = "http://localhost:5000/api/scan"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
files = {"image": open("aadhaar.jpg", "rb")}

response = requests.post(url, headers=headers, files=files)
print(response.json())`,
};

export default function ApiTools() {
  const [activeTab, setActiveTab] = useState<'curl' | 'javascript' | 'python'>('curl');
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('sk_live_51H...x9z2');

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">API & Developer Tools</h1>
        <p className="text-white/60 mb-8">Integrate ID Scanner into your apps</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'API Calls Today', value: '1,234' },
            { label: 'Success Rate', value: '99.9%' },
            { label: 'Avg. Latency', value: '245ms' },
            { label: 'Rate Limit', value: '100/min' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* API Key */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">API Key</h2>
                <p className="text-sm text-white/60">Your secret key</p>
              </div>
            </div>

            <div className="glass rounded-xl p-4 mb-4 font-mono text-sm text-white/80 break-all">
              {apiKey}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(apiKey)}
                className="flex-1 py-2 glass rounded-lg hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={() => setApiKey('sk_live_' + Math.random().toString(36).substring(2, 15))}
                className="p-2 glass rounded-lg hover:bg-white/10 transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Examples */}
          <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
            <div className="flex border-b border-white/10">
              {(['curl', 'javascript', 'python'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`flex-1 py-4 text-sm font-medium capitalize transition ${
                    activeTab === lang ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5' : 'text-white/60'
                  }`}
                >
                  {lang === 'curl' ? 'cURL' : lang}
                </button>
              ))}
            </div>

            <div className="relative p-6 bg-slate-950">
              <pre className="text-sm text-white/80 font-mono overflow-x-auto whitespace-pre-wrap">
                {codeExamples[activeTab]}
              </pre>
              <button
                onClick={copyCode}
                className="absolute top-4 right-4 p-2 glass rounded-lg hover:bg-white/10 transition"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: Zap, title: 'Fast', desc: '< 3 seconds' },
            { icon: Shield, title: 'Secure', desc: 'Bank-grade' },
            { icon: Terminal, title: 'Easy', desc: 'Simple API' },
          ].map((feature, i) => (
            <div key={i} className="glass rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-medium">{feature.title}</p>
                <p className="text-sm text-white/60">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
