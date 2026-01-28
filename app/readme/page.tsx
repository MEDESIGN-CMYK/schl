'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ReadmePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border/40 bg-white/80 dark:bg-card/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Documentation</h1>
            <p className="text-muted-foreground text-sm">Housing Case Management System</p>
          </div>
          <Button 
            onClick={() => router.back()} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="prose dark:prose-invert prose-lg max-w-none space-y-8">
          
          {/* Intro Section */}
          <section className="bg-white dark:bg-card/50 rounded-xl border border-border/40 p-8 shadow-sm">
            <h2 className="text-4xl font-bold text-foreground mb-4">Housing Case Management System</h2>
            <p className="text-lg text-muted-foreground">
              A professional enterprise-grade housing case management system frontend built with React 19, Next.js 16, and TypeScript. This application is a <strong>frontend demonstration layer</strong> specifically designed for integration with a .NET/C# REST API backend.
            </p>
          </section>

          {/* Important Notice */}
          <section className="bg-accent/10 border border-accent/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-accent mb-3">⚠️ Demo Scope</h3>
            <p className="text-foreground/80 mb-4">
              <strong>This application is a FRONTEND DEMONSTRATION ONLY.</strong> The current implementation uses mock API data and client-side state management for demonstration purposes.
            </p>
            <ul className="space-y-2 text-foreground/75 ml-4">
              <li>✓ No real housing or personal data is used</li>
              <li>✓ Created solely to demonstrate enterprise application design</li>
              <li>✓ Designed to showcase .NET-oriented full-stack thinking</li>
            </ul>
          </section>

          {/* Project Purpose */}
          <section>
            <h3 className="text-3xl font-bold text-foreground mb-4">Project Purpose</h3>
            <p className="text-foreground/80 mb-4">
              This demo illustrates how an internal housing case management system could be designed and implemented in an enterprise environment.
            </p>
            <div className="bg-white dark:bg-card/50 rounded-lg border border-border/40 p-6 space-y-3">
              <h4 className="font-semibold text-foreground">The objective is to demonstrate:</h4>
              <ul className="space-y-2 text-foreground/75 ml-4">
                <li className="flex gap-3"><span>•</span> Full-stack architectural thinking</li>
                <li className="flex gap-3"><span>•</span> Clean separation between frontend and backend</li>
                <li className="flex gap-3"><span>•</span> Readiness for a .NET / C# backend implementation</li>
                <li className="flex gap-3"><span>•</span> Business-oriented application design</li>
                <li className="flex gap-3"><span>•</span> Patterns typically used in public-sector software systems</li>
              </ul>
            </div>
          </section>

          {/* Business Use Case */}
          <section>
            <h3 className="text-3xl font-bold text-foreground mb-4">Business Use Case</h3>
            <p className="text-foreground/80 mb-4">
              The application represents an internal tool used by housing agents and administrators to manage housing-related services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                <h4 className="font-semibold text-primary mb-3">Case Management</h4>
                <p className="text-foreground/75 text-sm">Manage housing-related cases including loans, grants, and assistance requests</p>
              </div>
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6">
                <h4 className="font-semibold text-secondary mb-3">Workflow Tracking</h4>
                <p className="text-foreground/75 text-sm">Track case status and priority for efficient workflow management</p>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                <h4 className="font-semibold text-accent mb-3">Analytics</h4>
                <p className="text-foreground/75 text-sm">Monitor system metrics through dashboards and analytics</p>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                <h4 className="font-semibold text-primary mb-3">Access Control</h4>
                <p className="text-foreground/75 text-sm">Apply role-based access for Agent and Admin permissions</p>
              </div>
            </div>
          </section>

          {/* Core Features */}
          <section>
            <h3 className="text-3xl font-bold text-foreground mb-4">Core Features</h3>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-card/50 rounded-lg border border-border/40 p-6">
                <h4 className="text-xl font-semibold text-foreground mb-3">Dashboard</h4>
                <ul className="space-y-2 text-foreground/75 ml-4">
                  <li className="flex gap-3"><span>•</span> Total cases overview with real-time statistics</li>
                  <li className="flex gap-3"><span>•</span> Status distribution visualization</li>
                  <li className="flex gap-3"><span>•</span> System health indicators</li>
                  <li className="flex gap-3"><span>•</span> Quick action buttons for common tasks</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-card/50 rounded-lg border border-border/40 p-6">
                <h4 className="text-xl font-semibold text-foreground mb-3">Case Management (CRUD)</h4>
                <ul className="space-y-2 text-foreground/75 ml-4">
                  <li className="flex gap-3"><span>•</span> <strong>List View:</strong> Filterable cases by status, priority, and date range</li>
                  <li className="flex gap-3"><span>•</span> <strong>Detail View:</strong> Comprehensive case information with full edit</li>
                  <li className="flex gap-3"><span>•</span> <strong>Create Case:</strong> Form with validation for new registration</li>
                  <li className="flex gap-3"><span>•</span> <strong>Update Case:</strong> Edit case status, priority, and notes</li>
                  <li className="flex gap-3"><span>•</span> <strong>Search & Filter:</strong> Find cases by multiple criteria</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-card/50 rounded-lg border border-border/40 p-6">
                <h4 className="text-xl font-semibold text-foreground mb-3">Role-Based Access</h4>
                <ul className="space-y-2 text-foreground/75 ml-4">
                  <li className="flex gap-3"><span>•</span> <strong>Agent Role:</strong> Create, view, and update cases</li>
                  <li className="flex gap-3"><span>•</span> <strong>Admin Role:</strong> Full system access plus administrative functions</li>
                  <li className="flex gap-3"><span>•</span> UI adapts dynamically based on user role</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-card/50 rounded-lg border border-border/40 p-6">
                <h4 className="text-xl font-semibold text-foreground mb-3">Administrative Features</h4>
                <ul className="space-y-2 text-foreground/75 ml-4">
                  <li className="flex gap-3"><span>•</span> Admin-only dashboard with system-wide statistics</li>
                  <li className="flex gap-3"><span>•</span> User management capabilities</li>
                  <li className="flex gap-3"><span>•</span> System settings and configuration</li>
                  <li className="flex gap-3"><span>•</span> Performance analytics and reporting</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h3 className="text-3xl font-bold text-foreground mb-4">Technology Stack</h3>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-card/50 rounded-lg border border-border/40 p-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">Frontend (Current Demo)</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'React Context'].map((tech) => (
                    <div key={tech} className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-primary">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-card/50 rounded-lg border border-border/40 p-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">Target Backend (.NET)</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['ASP.NET Core 8+', 'C# 12+', 'Entity Framework', 'JWT Auth', 'SQL Server', 'Azure Deployment'].map((tech) => (
                    <div key={tech} className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-secondary">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>         

          {/* Final Statement */}
          <section className="bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/30 rounded-xl p-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Final Statement</h3>
            <p className="text-lg text-foreground/85 leading-relaxed">
              This demonstration reflects how I approach enterprise software development, particularly in .NET-based, public-sector environments: <strong>clear architecture, separation of concerns, business alignment, and long-term maintainability.</strong>
            </p>
            <p className="text-foreground/75 mt-4">
              The application is NOT a startup prototype. It's a professional enterprise application designed for integration with a serious .NET backend in a government environment.
            </p>
          </section>

          {/* Footer Info */}
          <div className="text-center text-sm text-muted-foreground space-y-2 py-8">
            <p>Housing Case Management System</p>
            <p>Enterprise Frontend Demonstration – Ready for .NET Backend Integration</p>
            <p>Last Updated: January 28, 2026 | Version: 1.0.0</p>
          </div>

        </div>
      </div>
    </div>
  );
}
