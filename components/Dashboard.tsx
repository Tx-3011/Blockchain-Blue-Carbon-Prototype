import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import { ChartIcon } from './Icons';

interface DashboardProps {
  projects: Project[];
  totalCreditsMinted: number;
  role: 'client' | 'admin';
  onApproveProject?: (projectId: number) => Promise<void>;
}

const Dashboard = ({ projects, totalCreditsMinted, role, onApproveProject }: DashboardProps) => {
  const title = role === 'admin' ? "Project Submissions" : "My Projects";
  
  return (
    <div className="card p-8 h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-dark-400">
            {role === 'client' ? 'Track your submitted projects and their status' : 'Review and approve submitted projects'}
          </p>
        </div>
        <div className="text-right">
            <p className="text-sm text-dark-400 mb-1">Total Credits Minted</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-400 animate-pulse"></div>
              <p className="text-4xl font-bold gradient-text">{totalCreditsMinted.toLocaleString()}</p>
            </div>
        </div>
      </div>
      
      {projects.length > 0 ? (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
              role={role}
              onApprove={onApproveProject}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-dark-400 h-full py-20 border-2 border-dashed border-dark-700 rounded-2xl glass">
          <div className="relative mb-6">
            <ChartIcon className="h-20 w-20 text-dark-500" />
            <div className="absolute -inset-2 bg-accent-500/10 rounded-full blur-lg"></div>
          </div>
          <h3 className="text-2xl font-semibold text-dark-300 mb-2">No Projects Submitted Yet</h3>
          <p className="text-dark-500 max-w-md">
            {role === 'client' 
              ? 'Submit your first blue carbon project to get started with AI-powered analysis and carbon credit estimation.' 
              : 'Submitted projects will appear here for your review and approval.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;