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
      <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
        <CheckCircleIcon className="h-4 w-4" />
        <span>Approved</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
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
    <div className="bg-ocean-blue-950/70 border border-ocean-blue-800 rounded-xl p-4 transition-shadow hover:shadow-cyan-500/10 hover:shadow-lg flex flex-col md:flex-row gap-4">
      {project.imageUrl && (
        <div className="md:w-1/3 flex-shrink-0">
          <img src={project.imageUrl} alt={project.projectName} className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}
      <div className="flex-grow">
        <div className="flex justify-between items-start gap-4">
          <div>
              <h3 className="text-lg font-bold text-white">{project.projectName}</h3>
              {project.status === 'approved' && project.mintedAt && (
                 <p className="text-xs text-ocean-blue-400">{new Date(project.mintedAt).toLocaleString()}</p>
              )}
          </div>
          <StatusBadge status={project.status} />
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <LocationIcon className="h-5 w-5 text-ocean-blue-500" />
            <span className="text-ocean-blue-300">{project.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <AreaIcon className="h-5 w-5 text-ocean-blue-500" />
            <span className="text-ocean-blue-300">{project.areaHectares} hectares</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
              <CreditIcon className="h-5 w-5 text-ocean-blue-500" />
              <span className="text-ocean-blue-300 font-semibold">{project.carbonCredits.toLocaleString()} Credits {project.status === 'pending' ? '(to be minted)' : ''}</span>
          </div>
        </div>
        
        {project.aiAnalysisNotes && (
          <div className="mt-3 pt-3 border-t border-ocean-blue-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400 mb-1">
              <SparklesIcon className="h-4 w-4" />
              AI Analysis Notes
            </div>
            <p className="text-xs text-ocean-blue-300 italic">"{project.aiAnalysisNotes}"</p>
          </div>
        )}

        {project.status === 'approved' && project.txHash && (
          <div className="mt-3 flex items-center gap-2 text-xs">
              <HashIcon className="h-4 w-4 text-ocean-blue-600" />
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-ocean-blue-500 font-mono truncate hover:text-cyan-400 transition-colors"
                title={project.txHash}
              >
                {project.txHash}
              </a>
          </div>
        )}

        {role === 'admin' && project.status === 'pending' && onApprove && (
          <div className="mt-4 pt-4 border-t border-ocean-blue-800">
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-ocean-blue-700 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg transition-colors text-sm"
              >
                {isApproving ? 'Minting...' : 'Approve & Mint Credits'}
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;