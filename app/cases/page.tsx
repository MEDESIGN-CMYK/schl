'use client';

import React, { useState, useEffect } from 'react';
import { getCases } from '@/lib/api-client';
import type { HousingCase } from '@/lib/types';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthProvider } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CasesListContent() {
  const [cases, setCases] = useState<HousingCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await getCases(1, 50, statusFilter === 'all' ? undefined : statusFilter, priorityFilter === 'all' ? undefined : priorityFilter);
        if (response.success && response.data) {
          setCases(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load cases:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCases();
  }, [statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending_review':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Cases</h2>
                <p className="text-muted-foreground">Manage all housing cases</p>
              </div>
              <Link href="/cases/new">
                <Button>New Case</Button>
              </Link>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 flex-wrap">
                  <div className="w-40">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending_review">Pending Review</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-40">
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by priority..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cases Table */}
            {isLoading ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">Loading cases...</div>
                </CardContent>
              </Card>
            ) : cases.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">No cases found</div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {cases.map((caseItem) => (
                  <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{caseItem.caseNumber}</h3>
                              <Badge className={getStatusColor(caseItem.status)}>
                                {caseItem.status.replace('_', ' ')}
                              </Badge>
                              <Badge className={getPriorityColor(caseItem.priority)}>
                                {caseItem.priority}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-foreground mb-1">{caseItem.clientName}</p>
                            <p className="text-sm text-muted-foreground mb-1">{caseItem.issueType}</p>
                            <p className="text-xs text-muted-foreground">
                              {caseItem.propertyAddress}, {caseItem.propertyCity}, {caseItem.propertyProvince}
                            </p>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <p>{caseItem.assignedTo || 'Unassigned'}</p>
                            <p>{new Date(caseItem.updatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function CasesPage() {
  return (
    <AuthProvider>
      <CasesListContent />
    </AuthProvider>
  );
}
