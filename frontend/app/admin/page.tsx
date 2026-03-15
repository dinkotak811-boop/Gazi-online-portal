'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Activity, Search, Ban, CheckCircle, Shield, MoreVertical } from 'lucide-react';

const users = [
  { id: '1', name: 'Rahul Kumar', email: 'rahul@example.com', scans: 45, status: 'active' },
  { id: '2', name: 'Priya Sharma', email: 'priya@example.com', scans: 128, status: 'active' },
  { id: '3', name: 'Amit Patel', email: 'amit@example.com', scans: 12, status: 'suspended' },
];

const stats = [
  { label: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
  { label: 'Total Scans', value: '45.2K', icon: FileText, color: 'purple' },
  { label: 'Success Rate', value: '99.2%', icon: Activity, color: 'green' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/60">Manage users and system</p>
          </div>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white">Admin Access</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="glass rounded-2xl p-2 mb-6">
          <div className="flex gap-2">
            {['overview', 'users', 'scans', 'logs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium capitalize transition ${
                  activeTab === tab ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass rounded-xl bg-transparent text-white"
                />
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-white/60">User</th>
                  <th className="text-left p-4 text-sm font-medium text-white/60">Scans</th>
                  <th className="text-left p-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-white/10 hover:bg-white/5">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-sm text-white/60">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-white">{user.scans}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        className={`p-2 rounded-lg ${
                          user.status === 'active'
                            ? 'hover:bg-red-500/20 text-red-400'
                            : 'hover:bg-green-500/20 text-green-400'
                        }`}
                      >
                        {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
