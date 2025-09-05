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
      className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
        isActive
          ? 'bg-cyan-500 text-white'
          : 'bg-transparent text-ocean-blue-300 hover:bg-ocean-blue-700'
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
    <header className="bg-ocean-blue-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LeafIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">
            Blue Carbon MRV
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-ocean-blue-800 p-1 rounded-full">
            <RoleButton role="client" currentRole={currentRole} onClick={() => onRoleChange('client')}>Client View</RoleButton>
            <RoleButton role="admin" currentRole={currentRole} onClick={() => onRoleChange('admin')}>Admin View</RoleButton>
        </div>
        
        {walletAddress ? (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-ocean-blue-800 px-3 py-1.5 rounded-full text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span>{displayAddress}</span>
                </div>
                <button
                    onClick={onDisconnect}
                    className="text-sm bg-red-500/20 hover:bg-red-500/40 text-red-300 px-4 py-2 rounded-full transition-colors"
                >
                    Disconnect
                </button>
            </div>
        ) : (
            <button
                onClick={onConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 bg-ocean-blue-600 hover:bg-ocean-blue-500 disabled:bg-ocean-blue-800 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-full transition-colors"
            >
                <WalletIcon className="h-5 w-5" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
        )}
      </div>
       <div className="md:hidden flex items-center justify-center gap-2 bg-ocean-blue-900 p-2">
            <RoleButton role="client" currentRole={currentRole} onClick={() => onRoleChange('client')}>Client View</RoleButton>
            <RoleButton role="admin" currentRole={currentRole} onClick={() => onRoleChange('admin')}>Admin View</RoleButton>
        </div>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
    </header>
  );
};

export default Header;