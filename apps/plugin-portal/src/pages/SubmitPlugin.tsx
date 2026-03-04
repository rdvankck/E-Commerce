import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, ArrowLeft, FileText, X, Check, AlertCircle, Zap, Shield, Code, Package } from 'lucide-react';

export default function SubmitPlugin() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Link
        to="/developer"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Submit a Plugin</h1>
          <p className="text-gray-400 mt-2">
            Share your plugin with the community. Follow the steps below to submit.
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                  ${step >= s
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }
                `}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full ${step > s ? 'bg-brand-500' : 'bg-gray-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Upload Plugin Package</h2>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-2xl p-12 text-center transition-all
                ${isDragging
                  ? 'border-brand-500 bg-brand-500/10'
                  : 'border-gray-700 hover:border-gray-600'
                }
              `}
            >
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-white font-medium mb-2">
                Drag and drop your plugin package here
              </p>
              <p className="text-sm text-gray-500 mb-6">or</p>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl cursor-pointer hover:from-brand-500 hover:to-brand-400 transition-all font-semibold shadow-lg shadow-brand-500/30">
                <Upload className="w-5 h-5" />
                Browse Files
                <input
                  type="file"
                  accept=".zip,.tgz"
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                />
              </label>
              <p className="text-xs text-gray-500 mt-6">
                Supported formats: .zip, .tgz (max 50MB)
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-500/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                        <span className="text-sm text-white font-medium">{file.name}</span>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={files.length === 0}
                className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-500/30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Plugin Details</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Plugin Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                  placeholder="My Awesome Plugin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                  placeholder="Brief description of your plugin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500">
                  <option value="">Select a category</option>
                  <option value="commerce">Commerce</option>
                  <option value="content">Content & Media</option>
                  <option value="marketing">Marketing</option>
                  <option value="analytics">Analytics</option>
                  <option value="authentication">Authentication</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Price
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
                    <input type="radio" name="price" value="free" defaultChecked className="text-brand-500 focus:ring-brand-500 focus:ring-offset-0" />
                    <span className="text-white">Free</span>
                  </label>
                  <label className="flex items-center gap-3 px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
                    <input type="radio" name="price" value="paid" className="text-brand-500 focus:ring-brand-500 focus:ring-offset-0" />
                    <span className="text-white">Paid</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Description (Markdown)
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                  placeholder="Describe your plugin in detail..."
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Review & Submit</h2>

            <div className="space-y-4 mb-8">
              <div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-brand-400" />
                  Plugin Manifest
                </h3>
                <p className="text-sm text-gray-400">manifest.json parsed successfully</p>
                <div className="mt-3 flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">All required fields present</span>
                </div>
              </div>

              <div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-400" />
                  Validation
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Plugin structure valid</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">No security issues detected</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Dependencies compatible</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-400">Review Process</h3>
                    <p className="text-sm text-yellow-300/80 mt-1">
                      Your plugin will be reviewed by our team within 2-3 business days.
                      You'll receive an email notification once approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Submit for Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
