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
    <div className="bg-ocean-blue-900/80 p-6 rounded-2xl shadow-lg border border-ocean-blue-800 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="text-right">
            <p className="text-sm text-ocean-blue-300">Total Credits Minted</p>
            <p className="text-3xl font-bold text-cyan-400">{totalCreditsMinted.toLocaleString()}</p>
        </div>
      </div>
      
      {projects.length > 0 ? (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
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
        <div className="flex flex-col items-center justify-center text-center text-ocean-blue-500 h-full py-20 border-2 border-dashed border-ocean-blue-800 rounded-lg">
          <ChartIcon className="h-16 w-16 mb-4" />
          <h3 className="text-xl font-semibold text-ocean-blue-300">No Projects Submitted Yet</h3>
          <p className="mt-1">{role === 'client' ? 'Submit a project to see its details here.' : 'Submitted projects will appear here for review.'}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;