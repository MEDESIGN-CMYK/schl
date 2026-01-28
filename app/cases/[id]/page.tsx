'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCaseById, updateCase } from '@/lib/api-client';
import type { HousingCase } from '@/lib/types';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthProvider, useAuth } from '@/lib/auth-context';
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
import { Textarea } from '@/components/ui/textarea';

function CaseDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const caseId = params.id as string;

  const [caseData, setCaseData] = useState<HousingCase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    async function loadCase() {
      try {
        const response = await getCaseById(caseId);
        if (response.success && response.data) {
          setCaseData(response.data);
          setNotes(response.data.notes || '');
          setStatus(response.data.status);
          setPriority(response.data.priority);
        }
      } catch (error) {
        console.error('Failed to load case:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCase();
  }, [caseId]);

  const handleSave = async () => {
    if (!caseData || !user) return;

    setIsSaving(true);
    try {
      const response = await updateCase(
        caseId,
        {
          status: status as any,
          priority: priority as any,
          notes,
        },
        user.id,
      );

      if (response.success && response.data) {
        setCaseData(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to save case:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (st: string) => {
    switch (st) {
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

  const getPriorityColor = (pr: string) => {
    switch (pr) {
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
                <Link href="/cases" className="text-primary hover:underline text-sm mb-2 inline-block">
                  ← Back to Cases
                </Link>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {isLoading ? 'Loading...' : caseData?.caseNumber}
                </h2>
              </div>
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                disabled={isSaving}
                variant={isEditing ? 'default' : 'outline'}
              >
                {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Case'}
              </Button>
            </div>

            {!isLoading && caseData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Case Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Case Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Status</p>
                          {isEditing ? (
                            <Select value={status} onValueChange={setStatus}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="pending_review">Pending Review</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge className={getStatusColor(caseData.status)}>
                              {caseData.status.replace('_', ' ')}
                            </Badge>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Priority</p>
                          {isEditing ? (
                            <Select value={priority} onValueChange={setPriority}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge className={getPriorityColor(caseData.priority)}>
                              {caseData.priority}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Issue Type</p>
                        <p className="text-foreground font-medium">{caseData.issueType}</p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Description</p>
                        <p className="text-foreground text-sm leading-relaxed">{caseData.description}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Client Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Name</p>
                        <p className="text-foreground">{caseData.clientName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Email</p>
                          <p className="text-foreground text-sm">{caseData.clientEmail}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Phone</p>
                          <p className="text-foreground text-sm">{caseData.clientPhone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Property Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Address</p>
                        <p className="text-foreground">
                          {caseData.propertyAddress}
                          <br />
                          {caseData.propertyCity}, {caseData.propertyProvince} {caseData.propertyPostalCode}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <Textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add case notes..."
                          className="min-h-24"
                        />
                      ) : (
                        <p className="text-foreground text-sm leading-relaxed">
                          {notes || <span className="text-muted-foreground">No notes added</span>}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Case Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Case ID</p>
                        <p className="text-foreground font-mono text-xs">{caseData.id}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Assigned To</p>
                        <p className="text-foreground">{caseData.assignedTo || 'Unassigned'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Created</p>
                        <p className="text-foreground text-xs">
                          {new Date(caseData.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Last Updated</p>
                        <p className="text-foreground text-xs">
                          {new Date(caseData.updatedAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Created By</p>
                        <p className="text-foreground text-xs">{caseData.createdBy}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Modified By</p>
                        <p className="text-foreground text-xs">{caseData.lastModifiedBy}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function CaseDetailPage() {
  return (
    <AuthProvider>
      <CaseDetailContent />
    </AuthProvider>
  );
}
