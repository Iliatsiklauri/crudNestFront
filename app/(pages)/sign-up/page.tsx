import AuthModal from '@/app/components/AuthModal/AuthModal';
import React from 'react';

export default function page() {
  return (
    <div className="w-full min-h-screen bg-slate-600 flex items-center justify-center">
      <AuthModal type />
    </div>
  );
}
