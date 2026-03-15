'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Trash2,
  Download,
  Search,
  Grid,
  List,
  Clock,
  HardDrive,
  Scan,
} from 'lucide-react';

const mockDocuments = [
  {
    id: '1',
    name: 'Aadhaar Card - Front',
    type: 'Aadhaar',
    date: new Date(Date.now() - 86400000),
    size: 2457600,
    confidence: 96,
  },
  {
    id: '2',
    name: 'PAN Card',
    type: 'PAN',
    date: new Date(Date.now() - 172800000),
    size: 1843200,
    confidence: 94,
  },
];

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = mockDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60 mb-8">Manage your scanned documents</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Documents</p>
                <p className="text-3xl font-bold text-white mt-1">24</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Storage Used</p>
                <p className="text-3xl font-bold text-white mt-1">15.2 MB</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Avg. Accuracy</p>
                <p className="text-3xl font-bold text-white mt-1">94%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Scan className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass rounded-xl bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex bg-white/5 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        {filteredDocs.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No documents found</h3>
            <p className="text-white/60">Upload your first document to get started</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-5 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      doc.type === 'Aadhaar'
                        ? 'bg-orange-500/20'
                        : doc.type === 'PAN'
                        ? 'bg-blue-500/20'
                        : 'bg-purple-500/20'
                    }`}
                  >
                    <FileText
                      className={`w-7 h-7 ${
                        doc.type === 'Aadhaar'
                          ? 'text-orange-400'
                          : doc.type === 'PAN'
                          ? 'text-blue-400'
                          : 'text-purple-400'
                      }`}
                    />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button className="p-2 hover:bg-white/10 rounded-lg">
                      <Download className="w-4 h-4 text-white/60" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-1 truncate">{doc.name}</h3>
                <p className="text-sm text-white/60 mb-3">{doc.type}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(doc.date)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      doc.confidence > 90
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {doc.confidence}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            {filteredDocs.map((doc, index) => (
              <div
                key={doc.id}
                className={`flex items-center p-4 hover:bg-white/5 transition ${
                  index !== filteredDocs.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    doc.type === 'Aadhaar'
                      ? 'bg-orange-500/20'
                      : doc.type === 'PAN'
                      ? 'bg-blue-500/20'
                      : 'bg-purple-500/20'
                  }`}
                >
                  <FileText
                    className={`w-6 h-6 ${
                      doc.type === 'Aadhaar'
                        ? 'text-orange-400'
                        : doc.type === 'PAN'
                        ? 'text-blue-400'
                        : 'text-purple-400'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{doc.name}</h3>
                  <p className="text-sm text-white/60">
                    {doc.type} • {formatDate(doc.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      doc.confidence > 90
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {doc.confidence}%
                  </span>
                  <span className="text-sm text-white/40 hidden sm:block">
                    {formatSize(doc.size)}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-white/10 rounded-lg">
                      <Download className="w-4 h-4 text-white/60" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
