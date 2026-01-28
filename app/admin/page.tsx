'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function AdminPageContent() {
  const { user } = useAuth();
  const router = useRouter();

  // Check if user has admin role
  if (user?.role !== 'admin') {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="p-6 flex items-center justify-center min-h-96">
              <Card className="max-w-md border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle>Access Denied</CardTitle>
                  <CardDescription>You do not have permission to access this page</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => router.push('/')} variant="outline" className="w-full">
                    Return to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Administration</h2>
              <p className="text-muted-foreground">System management and configuration (Admin Only)</p>
            </div>

            {/* Role-Based Access Info */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Role-Based Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  This application demonstrates role-based access control with two roles:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Badge>Agent</Badge>
                    <span className="text-sm text-muted-foreground">
                      Can view and manage cases, create new cases, and update case status.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-100 text-orange-800">Admin</Badge>
                    <span className="text-sm text-muted-foreground">
                      Full access including admin panel, system settings, and user management. This page is
                      admin-only.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">System Settings</CardTitle>
                  <CardDescription>Configure system-wide parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Notification Settings</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Email notifications for case updates and assignments
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">User Management</CardTitle>
                  <CardDescription>Manage system users and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Active Users</p>
                    <p className="text-xs text-muted-foreground mb-3">2 agents and 1 admin currently active</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Manage Users
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Case Management</CardTitle>
                  <CardDescription>Bulk operations and case administration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Archive Old Cases</p>
                    <p className="text-xs text-muted-foreground mb-3">Archive cases older than 1 year</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Archive
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Audit & Compliance</CardTitle>
                  <CardDescription>System logs and compliance reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Activity Logs</p>
                    <p className="text-xs text-muted-foreground mb-3">View system activity and user actions</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Technical Implementation Info */}
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-base">Implementation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This admin page demonstrates role-based access control. The page checks the user's role and
                  only displays content if the user is an admin.
                </p>
                <div className="bg-foreground/5 p-3 rounded font-mono text-xs space-y-1">
                  <p>if (user?.role !== 'admin') {'{'}</p>
                  <p className="ml-4">return {'<'}AccessDenied /{'>'}</p>
                  <p>{'}'}</p>
                </div>
                <p>
                  In a production .NET application, this would be implemented through authorization policies,
                  JWT claims, and attribute-based access control.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminPageContent />
    </AuthProvider>
  );
}
