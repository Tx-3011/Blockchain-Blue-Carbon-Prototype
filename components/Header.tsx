import React from 'react';
import { LeafIcon, WalletIcon } from './Icons';

interface HeaderProps {
  walletAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnecting: boolean;
  currentRole: 'client' | 'admin';
  onRoleChange: (role: 'client' | 'admin') => void;
}

const RoleButton = ({
  role,
  currentRole,
  onClick,
  children,
}: {
  role: 'client' | 'admin';
  currentRole: 'client' | 'admin';
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const isActive = role === currentRole;
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25'
          : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700/50 hover:text-white border border-dark-600 hover:border-dark-500'
      }`}
    >
      {children}
    </button>
  );
};

const Header = ({ walletAddress, onConnect, onDisconnect, isConnecting, currentRole, onRoleChange }: HeaderProps) => {
  const displayAddress = walletAddress 
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` 
    : 'Connect Wallet';

  return (
    <header className="glass-dark sticky top-0 z-10 border-b border-dark-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <LeafIcon className="h-10 w-10 text-accent-400 animate-float" />
            <div className="absolute -inset-1 bg-accent-500/20 rounded-full blur-sm"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text tracking-tight">
              Blue Carbon MRV
            </h1>
            <p className="text-xs text-dark-400 -mt-1">Monitoring, Reporting & Verification</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 glass p-1 rounded-2xl">
            <RoleButton role="client" currentRole={currentRole} onClick={() => onRoleChange('client')}>Client View</RoleButton>
            <RoleButton role="admin" currentRole={currentRole} onClick={() => onRoleChange('admin')}>Admin View</RoleButton>
        </div>
        
        {walletAddress ? (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl text-sm">
                    <div className="h-2 w-2 rounded-full bg-accent-400 animate-pulse"></div>
                    <span className="font-mono text-dark-200">{displayAddress}</span>
                </div>
                <button
                    onClick={onDisconnect}
                    className="text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl transition-all duration-200 border border-red-500/30 hover:border-red-500/50"
                >
                    Disconnect
                </button>
            </div>
        ) : (
            <button
                onClick={onConnect}
                disabled={isConnecting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                <WalletIcon className="h-5 w-5" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
        )}
      </div>
       <div className="md:hidden flex items-center justify-center gap-2 glass p-3 mx-4 mb-2 rounded-xl">
            <RoleButton role="client" currentRole={currentRole} onClick={() => onRoleChange('client')}>Client View</RoleButton>
            <RoleButton role="admin" currentRole={currentRole} onClick={() => onRoleChange('admin')}>Admin View</RoleButton>
        </div>
    </header>
  );
};

export default Header;