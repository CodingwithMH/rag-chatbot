import React from 'react'
import Link from 'next/link'
const Header = () => {
  return (
    <>
     <nav className="relative z-10 mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md shadow-emerald-500/20">
            R
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            RAG<span className="text-emerald-400">Core</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
          href={'/chat'}
            className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
          >
            Launch Chat
          </Link>
          <Link 
            href={'/upload'}
            className="text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-xl border border-slate-800 transition-all shadow-sm"
          >
            Train Base
          </Link>
        </div>
      </nav> 
    </>
  )
}

export default Header
