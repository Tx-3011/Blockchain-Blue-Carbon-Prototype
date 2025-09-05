import React from 'react';
import { LeafIcon } from './Icons';

const AdminWelcome = () => {
  return (
    <div className="bg-ocean-blue-900/80 p-6 rounded-2xl shadow-lg border border-ocean-blue-800 h-full flex flex-col justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-ocean-blue-800 rounded-full">
            <LeafIcon className="h-10 w-10 text-cyan-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white">Administrator View</h2>
        <p className="text-ocean-blue-300">
          Welcome, Admin. You can review all project submissions from the dashboard.
        </p>
        <p className="text-ocean-blue-400 mt-4 text-sm">
          Use the "Approve & Mint" button on any pending project to verify it and mint the corresponding carbon credits to the blockchain.
        </p>
      </div>
    </div>
  );
};

export default AdminWelcome;