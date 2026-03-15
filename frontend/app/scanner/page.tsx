'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Scan, Upload, X, Download, Copy, Check } from 'lucide-react';

export default function Scanner() {
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const processScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResult({
        type: 'Aadhaar Card',
        confidence: 96,
        fields: [
          { label: 'Name', value: 'Rahul Kumar', confidence: 95 },
          { label: 'Aadhaar Number', value: '1234 5678 9012', confidence: 98 },
          { label: 'Date of Birth', value: '15/08/1990', confidence: 92 },
          { label: 'Gender', value: 'Male', confidence: 88 },
        ],
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Scan className="text-cyan-400" />
          ID Scanner
        </h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="glass rounded-2xl p-6">
            {!image ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${
                  isDragActive
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
                <p className="text-white mb-2">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop ID image'}
                </p>
                <p className="text-sm text-white/40">or click to browse</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={image}
                  alt="Uploaded ID"
                  className="w-full rounded-xl object-contain max-h-[400px]"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            {image && !result && (
              <button
                onClick={processScan}
                disabled={scanning}
                className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white disabled:opacity-50 transition"
              >
                {scanning ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scanning...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Scan className="w-4 h-4" />
                    Start Scanning
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Results Section */}
          <div className="glass rounded-2xl p-6">
            {!result ? (
              <div className="text-center py-12 text-white/40">
                <Scan className="w-16 h-16 mx-auto mb-4" />
                <p>Upload an ID document to see extracted data</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{result.type}</h2>
                    <p className="text-sm text-white/60">
                      Scanned {new Date().toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      result.confidence > 90
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {result.confidence}% confidence
                  </span>
                </div>

                <div className="space-y-3">
                  {result.fields.map((field: any, index: number) => (
                    <div
                      key={index}
                      className="glass rounded-xl p-4 flex items-center justify-between group hover:border-cyan-400/30 transition"
                    >
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wider">
                          {field.label}
                        </p>
                        <p className="text-lg font-medium text-white mt-1">
                          {field.value}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            field.confidence > 90
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {field.confidence}%
                        </span>
                        <button
                          onClick={() => copyToClipboard(field.value)}
                          className="p-2 opacity-0 group-hover:opacity-100 transition hover:bg-white/10 rounded-lg"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-white/60" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 py-2 glass rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition">
                    <Copy className="w-4 h-4" />
                    Copy All
                  </button>
                  <button className="flex-1 py-2 glass rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition">
                    <Download className="w-4 h-4" />
                    Download JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
