'use client';

import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '@/lib/api-client';
import type { DashboardStats } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await getDashboardStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header with Animation */}
      <div className="space-y-2" style={{ animation: 'fadeIn 0.6s ease-out' }}>
        <h2 className="text-5xl font-bold text-foreground">
          Dashboard
        </h2>
        <p className="text-muted-foreground text-base font-medium">Overview of housing case management system</p>
      </div>

      {/* Stats Grid with Professional Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Cases"
          value={stats?.totalCases ?? 0}
          description="All cases in system"
          color="primary"
        />
        <StatCard
          title="Open Cases"
          value={stats?.openCases ?? 0}
          description="Awaiting action"
          color="accent"
        />
        <StatCard
          title="In Progress"
          value={stats?.inProgressCases ?? 0}
          description="Currently being worked on"
          color="secondary"
        />
        <StatCard
          title="Closed Cases"
          value={stats?.closedCases ?? 0}
          description="Resolved"
          color="muted"
        />
        <StatCard
          title="Critical"
          value={stats?.criticalCases ?? 0}
          description="High priority"
          color="destructive"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/60 bg-white dark:bg-card/50 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-500" style={{ animation: 'slideInUp 0.6s ease-out 0.1s both' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">System Health</CardTitle>
            <CardDescription className="text-muted-foreground">Performance and status indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Case Resolution Rate</span>
              <Badge className="bg-green-100 text-green-800">98%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Resolution Time</span>
              <span className="text-sm font-semibold">{stats?.averageResolutionTime ?? 0} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System Uptime</span>
              <Badge className="bg-blue-100 text-blue-800">99.9%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-xs text-muted-foreground">Just now</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white dark:bg-card/50 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-500" style={{ animation: 'slideInUp 0.6s ease-out 0.2s both' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Quick Actions</CardTitle>
            <CardDescription className="text-muted-foreground">Common operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/cases/new" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg font-semibold transition-all duration-300">
                Create New Case
              </Button>
            </Link>
            <Link href="/cases" className="block">
              <Button className="w-full bg-white dark:bg-muted text-foreground border border-primary/30 hover:bg-primary/5 hover:border-primary/60 font-semibold transition-all duration-300">
                View All Cases
              </Button>
            </Link>
            <Link href="/reports" className="block">
              <Button className="w-full bg-white dark:bg-muted text-foreground border border-secondary/30 hover:bg-secondary/5 hover:border-secondary/60 font-semibold transition-all duration-300">
                Generate Report
              </Button>
            </Link>
            <Link href="/admin" className="block">
              <Button className="w-full bg-white dark:bg-muted text-foreground border border-accent/30 hover:bg-accent/5 hover:border-accent/60 font-semibold transition-all duration-300">
                Admin Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border/60 bg-white dark:bg-card/50 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-500" style={{ animation: 'slideInUp 0.6s ease-out 0.3s both' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">About This Application</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p className="leading-relaxed">
              This is a professional demonstration of an enterprise housing case management system designed for
              integration with a .NET backend API.
            </p>
            <p className="leading-relaxed">
              The application demonstrates clean architecture principles, role-based access control, and CRUD
              operations suitable for government and public sector applications.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white dark:bg-card/50 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-500" style={{ animation: 'slideInUp 0.6s ease-out 0.4s both' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs font-semibold">
                Next.js 16
              </Badge>
              <Badge className="bg-secondary/10 text-secondary border border-secondary/30 text-xs font-semibold">
                React 19
              </Badge>
              <Badge className="bg-accent/10 text-accent border border-accent/30 text-xs font-semibold">
                TypeScript
              </Badge>
              <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs font-semibold">
                Tailwind CSS
              </Badge>
            </div>
            <p className="mt-4 leading-relaxed font-medium">Frontend layer ready for .NET C# REST API integration.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  color,
}: {
  title: string;
  value: number;
  description: string;
  color: string;
}) {
  const colorMap = {
    primary: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary', label: 'text-primary' },
    secondary: { bg: 'bg-secondary/10', border: 'border-secondary/30', text: 'text-secondary', label: 'text-secondary' },
    accent: { bg: 'bg-accent/10', border: 'border-accent/30', text: 'text-accent', label: 'text-accent' },
    destructive: { bg: 'bg-destructive/10', border: 'border-destructive/30', text: 'text-destructive', label: 'text-destructive' },
    muted: { bg: 'bg-muted', border: 'border-border/50', text: 'text-muted-foreground', label: 'text-muted-foreground' },
  };

  const colors = colorMap[color as keyof typeof colorMap];

  return (
    <Card className={`${colors.bg} border border-${colors.border} shadow-md hover:shadow-lg hover:border-${colors.text}/50 transition-all duration-500 hover:-translate-y-1`} style={{ animation: 'scaleIn 0.5s ease-out' }}>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <p className={`text-xs font-bold uppercase tracking-widest ${colors.label} opacity-70`}>{title}</p>
          <p className={`text-5xl font-bold ${colors.text}`}>{value}</p>
          <p className="text-xs text-muted-foreground font-medium">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
