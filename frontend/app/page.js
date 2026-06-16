"use client";
import Header from "@/components/Header";
import Link from "next/link";

function Page({ onNavigate }) {
  // Note: if you use Next.js routing, replace 'onNavigate' with standard <Link> tags
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 overflow-x-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-30 mix-blend-screen select-none">
        <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 blur-[120px]" />
        <div className="absolute top-[10%] right-[20%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 blur-[100px]" />
      </div>

<Header />

      {/* Hero Section */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800/80 text-xs font-medium text-emerald-400 mb-6 shadow-inner animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Powered by Vector Embeddings & LLMs
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.15] mb-6">
          Chat with your private data, <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            zero hallucinations.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Upload your PDFs, internal wikis, or raw documents. Out smart engine contextually indexes them to deliver secure, grounded answers in seconds.
        </p>

        {/* Dynamic Navigation Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href={"/chat"}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-xl shadow-emerald-500/10 hover:opacity-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Start Chatting
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          
          <Link
            href={"/upload"}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Upload Documents
          </Link>
        </div>
      </header>

      {/* Feature Grid Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            Engineered for high accuracy
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Everything you need to turn static internal documents into real-time intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-slate-700/60 transition-all group">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H9.75M3 5.25h12M3 3h12m-12 4.5h12m-12 4.5h12m-12 4.5h12M3 21h12" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-1">Retrieval Augmented Generation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Queries extract the most relevant chunks out of your database system natively before framing LLM prompt structures.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-slate-700/60 transition-all group">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-.75m0-3V11.25A2.25 2.25 0 0013.5 9h-3.75M15 9.75M9 10.5h.008v.008H9V10.5z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-1">Instant Chunk Indexing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Files are automatically parsed, vectorized, broken down dynamically, and injected directly into isolated semantic stores.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-slate-700/60 transition-all group">
            <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-1">Enterprise-Grade Privacy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Data strictly stays structured within context windows securely. Your proprietary inputs are never used for open model training.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-8 border-t border-slate-900 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} RAGCore AI. All rights reserved. Built for secure internal semantic indexing.
      </footer>
    </div>
  );
}

export default Page;