'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DashboardContent } from '@/components/dashboard-content';
import { AuthProvider } from '@/lib/auth-context';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </AuthProvider>
  );
}
