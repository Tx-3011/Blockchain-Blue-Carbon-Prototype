import React from 'react';
import { LeafIcon } from './Icons';

interface TitleScreenProps {
  onGetStarted: () => void;
}

const TitleScreen = ({ onGetStarted }: TitleScreenProps) => {
  return (
    <div className="h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex flex-col relative overflow-hidden">
      {/* Prototype Banner */}
      <div className="relative bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-b border-amber-500/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="text-center">
              <p className="text-amber-200 font-semibold text-sm">
                🚧 <span className="font-bold">PROTOTYPE / MOCK APPLICATION</span> 🚧
              </p>
              <p className="text-amber-300/80 text-xs mt-1">
                This is a demonstration prototype for Blue Carbon MRV. Not for production use.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 via-transparent to-cyan-500/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-6">
            <div className="relative inline-block">
              <div className="p-6 glass rounded-2xl mb-4">
                <LeafIcon className="h-16 w-16 text-accent-400 animate-float" />
              </div>
              <div className="absolute -inset-3 bg-accent-500/20 rounded-2xl blur-xl"></div>
            </div>
          </div>

          {/* Project Name */}
          <h1 className="text-7xl md:text-8xl font-bold gradient-text mb-4 text-shadow-lg">
            Sea02
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl font-semibold text-dark-300 mb-6">
            Blue Carbon Monitoring, Reporting & Verification
          </h2>
          
          {/* Description */}
          <p className="text-base text-dark-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          AI + Blockchain-powered platform for coastal ecosystem restoration — analyze projects, verify blue carbon, and mint transparent carbon credits.
          </p>

          {/* Get Started Button */}
          <button
            onClick={onGetStarted}
            className="btn-primary text-lg px-10 py-3 rounded-xl shadow-2xl hover:shadow-accent-500/30 transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
