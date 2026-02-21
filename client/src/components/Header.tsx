import { Sparkles } from "lucide-react";
import logoImg from "@assets/logo.png"; // Assuming user will provide this

export function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            {/* Fallback to icon if logo image fails/missing */}
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              FeedbackLoop
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
              Community Voice
            </p>
          </div>
        </div>
        
        <div className="hidden sm:block">
          <a 
            href="mailto:support@feedbackloop.com"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </header>
  );
}
