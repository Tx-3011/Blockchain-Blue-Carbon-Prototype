import React from 'react';
import { LeafIcon } from './Icons';

const AdminWelcome = () => {
  return (
    <div className="card p-8 h-full flex flex-col justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="p-6 glass rounded-2xl">
              <LeafIcon className="h-12 w-12 text-accent-400 animate-float" />
            </div>
            <div className="absolute -inset-2 bg-accent-500/20 rounded-2xl blur-lg"></div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-3 text-white">Administrator View</h2>
        <p className="text-dark-300 text-lg mb-6">
          Welcome, Admin. Review and approve project submissions for carbon credit minting.
        </p>
        <div className="glass p-6 rounded-xl border-l-4 border-accent-500">
          <p className="text-dark-200 text-sm leading-relaxed">
            <span className="font-semibold text-accent-400">Instructions:</span> Use the "Approve & Mint" button on any pending project to verify it and mint the corresponding carbon credits to the blockchain. Each approved project will generate a transaction hash for transparency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;