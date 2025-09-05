import React, { useState } from 'react';
import { Project } from '../types';
import { LocationIcon, CreditIcon, AreaIcon, HashIcon, ClockIcon, CheckCircleIcon, SparklesIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  role: 'client' | 'admin';
  onApprove?: (projectId: number) => Promise<void>;
}

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  if (status === 'approved') {
    return (
      <div className="flex items-center gap-2 bg-accent-500/20 text-accent-400 px-4 py-2 rounded-xl text-sm font-semibold border border-accent-500/30">
        <CheckCircleIcon className="h-4 w-4" />
        <span>Approved & Minted</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-xl text-sm font-semibold border border-amber-500/30">
      <ClockIcon className="h-4 w-4" />
      <span>Pending Approval</span>
    </div>
  );
};


const ProjectCard = ({ project, role, onApprove }: ProjectCardProps) => {
  const [isApproving, setIsApproving] = useState(false);
  
  const handleApprove = async () => {
    if (!onApprove) return;
    setIsApproving(true);
    await onApprove(project.id);
    setIsApproving(false);
  };

  return (
    <div className="card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col md:flex-row gap-6">
      {project.imageUrl && (
        <div className="md:w-1/3 flex-shrink-0">
          <div className="relative group">
            <img src={project.imageUrl} alt={project.projectName} className="w-full h-48 object-cover rounded-xl border border-dark-600" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      )}
      <div className="flex-grow">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
              <h3 className="text-xl font-bold text-white mb-1">{project.projectName}</h3>
              {project.status === 'approved' && project.mintedAt && (
                 <p className="text-sm text-dark-400">Minted on {new Date(project.mintedAt).toLocaleDateString()}</p>
              )}
          </div>
          <StatusBadge status={project.status} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-3 glass p-3 rounded-xl">
            <LocationIcon className="h-5 w-5 text-accent-400" />
            <span className="text-dark-200 font-medium">{project.location}</span>
          </div>
          <div className="flex items-center gap-3 glass p-3 rounded-xl">
            <AreaIcon className="h-5 w-5 text-accent-400" />
            <span className="text-dark-200 font-medium">{project.areaHectares} hectares</span>
          </div>
          <div className="flex items-center gap-3 glass p-3 rounded-xl md:col-span-2">
              <CreditIcon className="h-5 w-5 text-accent-400" />
              <span className="text-dark-200 font-semibold">
                {project.carbonCredits.toLocaleString()} Credits 
                {project.status === 'pending' ? ' (to be minted)' : ' (minted)'}
              </span>
          </div>
        </div>
        
        {project.aiAnalysisNotes && (
          <div className="mb-4 p-4 glass rounded-xl border-l-4 border-accent-500">
            <div className="flex items-center gap-2 text-sm font-semibold text-accent-400 mb-2">
              <SparklesIcon className="h-4 w-4" />
              AI Analysis Notes
            </div>
            <p className="text-sm text-dark-300 italic">"{project.aiAnalysisNotes}"</p>
          </div>
        )}

        {project.status === 'approved' && project.txHash && (
          <div className="mb-4 p-3 glass rounded-xl">
            <div className="flex items-center gap-2 text-xs mb-1">
              <HashIcon className="h-4 w-4 text-dark-500" />
              <span className="text-dark-500 font-medium">Transaction Hash</span>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-accent-400 font-mono text-sm hover:text-accent-300 transition-colors break-all"
              title={project.txHash}
            >
              {project.txHash}
            </a>
          </div>
        )}

        {role === 'admin' && project.status === 'pending' && onApprove && (
          <div className="pt-4 border-t border-dark-700">
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isApproving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Minting Credits...
                  </>
                ) : (
                  'Approve & Mint Credits'
                )}
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;