'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ReportsPageContent() {
  const { user } = useAuth();
  const [reportType, setReportType] = React.useState('summary');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h2>
              <p className="text-muted-foreground">Case statistics and system analytics</p>
            </div>

            {/* Report Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generate Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Case Summary</SelectItem>
                        <SelectItem value="priority">Cases by Priority</SelectItem>
                        <SelectItem value="status">Cases by Status</SelectItem>
                        <SelectItem value="agent">Cases by Agent</SelectItem>
                        <SelectItem value="monthly">Monthly Trends</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Generate PDF</Button>
                </div>
              </CardContent>
            </Card>

            {/* Report Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Case Distribution by Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Open</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-blue-500 rounded w-16"></div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">In Progress</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-yellow-500 rounded w-12"></div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending Review</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-purple-500 rounded w-8"></div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Closed</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-green-500 rounded w-6"></div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Case Distribution by Priority</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Low</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-green-500 rounded w-20"></div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medium</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-yellow-500 rounded w-32"></div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">High</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-orange-500 rounded w-16"></div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Critical</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-red-500 rounded w-6"></div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                        Avg Resolution
                      </p>
                      <p className="text-2xl font-bold text-foreground">14 days</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                        Total Cases
                      </p>
                      <p className="text-2xl font-bold text-foreground">127</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                        Closed Cases
                      </p>
                      <p className="text-2xl font-bold text-foreground">89</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                        Success Rate
                      </p>
                      <p className="text-2xl font-bold text-foreground">98%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Agents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Performing Agents</CardTitle>
                <CardDescription>Agents by cases handled and resolution rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium text-foreground">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">18 cases resolved</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">95% success</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium text-foreground">Robert Chen</p>
                      <p className="text-xs text-muted-foreground">15 cases resolved</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">92% success</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-foreground">Emma Davis</p>
                      <p className="text-xs text-muted-foreground">12 cases resolved</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">90% success</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <AuthProvider>
      <ReportsPageContent />
    </AuthProvider>
  );
}
