'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Shield, Database, Save, Trash2, Download } from 'lucide-react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60 mb-8">Manage your preferences</p>

        <div className="space-y-6">
          {/* Appearance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                {darkMode ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-cyan-400" />}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Appearance</h2>
                <p className="text-sm text-white/60">Customize your interface</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-sm text-white/60">Toggle dark theme</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-cyan-500/30' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-xl mt-4">
              <div>
                <p className="text-white font-medium">Language</p>
                <p className="text-sm text-white/60">Select your language</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="glass px-4 py-2 rounded-xl bg-transparent text-white"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                <p className="text-sm text-white/60">Manage alerts</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-sm text-white/60">Get scan completion alerts</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-green-500/30' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Data Management</h2>
                <p className="text-sm text-white/60">Export or delete your data</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 glass rounded-xl flex items-center gap-3 hover:bg-white/5 transition">
                <Download className="w-5 h-5 text-cyan-400" />
                <span className="text-white">Export All Data</span>
              </button>
              <button className="p-4 glass rounded-xl flex items-center gap-3 hover:bg-white/5 transition text-red-400">
                <Trash2 className="w-5 h-5" />
                <span>Delete All Data</span>
              </button>
            </div>
          </motion.div>

          <div className="flex justify-end">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
