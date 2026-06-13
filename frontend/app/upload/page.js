"use client";
import { useState, useRef } from "react";
import { uploadDocument } from "../../lib/api";
import Header from "@/components/Header";

function Upload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" }); // "success" | "error"
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus({ type: "", message: "" }); // Reset status on new file
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setStatus({ type: "", message: "" });
    }
  };

  const upload = async () => {
    if (!file || isUploading) return;

    setIsUploading(true);
    setStatus({ type: "", message: "" });

    try {
      await uploadDocument(file);
      setStatus({ type: "success", message: `"${file.name}" uploaded successfully!` });
      setFile(null); // Clear file after successful upload
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Failed to upload document. Please try again." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-screen backdrop-blur-2xl bg-[url('/images/chat-bg.png')] bg-repeat animate-pan-bg">
        <Header/>
    <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-slate-200 font-sans">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-wide bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Knowledge Base Upload
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Upload PDF, TXT, or DOCX files to train your RAG Chatbot.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.txt,.docx,.doc"
      />

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-45 ${
          isDragging
            ? "border-emerald-400 bg-slate-800/60"
            : file
            ? "border-cyan-500/50 bg-slate-800/30"
            : "border-slate-700 hover:border-slate-500 bg-slate-800/10 hover:bg-slate-800/30"
        }`}
      >
        {/* Upload Icon */}
        <div className={`p-3 rounded-full mb-3 transition-colors duration-200 ${
          file ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
        </div>

        {/* Text Area */}
        {file ? (
          <div className="w-full max-w-xs">
            <p className="text-sm font-medium text-cyan-400 truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-slate-300">
              {isDragging ? "Drop your file here" : "Drag & drop your file here"}
            </p>
            <p className="text-xs text-slate-500 mt-1">or click to browse documents</p>
          </div>
        )}
      </div>

      {/* Dynamic Status Banner */}
      {status.message && (
        <div className={`mt-4 p-3 rounded-xl text-xs flex items-start gap-2.5 animate-fadeIn ${
          status.type === "success" 
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
            : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
        }`}>
          <span className="mt-0.5">
            {status.type === "success" ? "✓" : "⚠"}
          </span>
          <p>{status.message}</p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={upload}
        disabled={!file || isUploading}
        className={`w-full mt-5 py-2.5 px-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
          file && !isUploading
            ? "bg-linear-to-r from-emerald-500 to-teal-600 text-slate-900 font-semibold shadow-lg shadow-emerald-500/10 hover:opacity-90 cursor-pointer"
            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
        }`}
      >
        {isUploading ? (
          <>
            {/* Spinner */}
            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            <span>Processing Document...</span>
          </>
        ) : (
          <span>Upload to Vector DB</span>
        )}
      </button>
    </div>
    </div>
  );
}

export default Upload;