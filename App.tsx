import React, { useState, useCallback, useMemo } from 'react';
import { Project } from './types';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import Dashboard from './components/Dashboard';
import AdminWelcome from './components/AdminWelcome';
import PrototypeBanner from './components/PrototypeBanner';

const App = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<'client' | 'admin'>('client');

  const handleConnectWallet = useCallback(async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    try {
        const mockAddress = "0x1234567890AbCdEf1234567890aBcDeF12345678";
        setWalletAddress(mockAddress);
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please try again.");
    } finally {
        setIsConnecting(false);
    }
  }, []);

  const handleDisconnectWallet = useCallback(() => {
    setWalletAddress(null);
  }, []);

  const handleProjectSubmit = (newProject: Omit<Project, 'id' | 'status'>) => {
    setProjects(prevProjects => [
      { 
        ...newProject, 
        id: Date.now(),
        status: 'pending',
      }, 
      ...prevProjects
    ]);
  };

  const handleApproveAndMint = async (projectId: number) => {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2500));

    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === projectId
          ? {
              ...p,
              status: 'approved',
              txHash: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
              mintedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };
  
  const totalCreditsMinted = useMemo(() => {
    return projects
      .filter(p => p.status === 'approved')
      .reduce((sum, project) => sum + project.carbonCredits, 0);
  }, [projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 font-sans">
      <PrototypeBanner />
      <Header 
        walletAddress={walletAddress}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnectWallet}
        isConnecting={isConnecting}
        currentRole={currentUserRole}
        onRoleChange={setCurrentUserRole}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {currentUserRole === 'client' ? (
              <ProjectForm 
                walletConnected={!!walletAddress} 
                onProjectSubmitted={handleProjectSubmit}
                onConnectWallet={handleConnectWallet}
              />
            ) : (
              <AdminWelcome />
            )}
          </div>
          <div className="lg:col-span-2">
            <Dashboard 
              projects={projects}
              totalCreditsMinted={totalCreditsMinted}
              role={currentUserRole}
              onApproveProject={handleApproveAndMint}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-dark-400 text-sm border-t border-dark-800">
        <p className="flex items-center justify-center gap-2">
          <span>Built for the Blue Carbon Ecosystem</span>
          <span className="text-dark-500">•</span>
          <span className="text-amber-400 font-semibold">Prototype Only</span>
        </p>
      </footer>
    </div>
  );
};

export default App;