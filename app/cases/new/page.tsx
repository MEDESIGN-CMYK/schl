'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCase } from '@/lib/api-client';
import type { CreateCaseRequest } from '@/lib/types';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

function NewCaseFormContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateCaseRequest>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    propertyAddress: '',
    propertyCity: '',
    propertyProvince: '',
    propertyPostalCode: '',
    issueType: '',
    description: '',
    priority: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const response = await createCase(formData, user.id);
      if (response.success && response.data) {
        router.push(`/cases/${response.data.id}`);
      }
    } catch (error) {
      console.error('Failed to create case:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-2xl">
            <div className="mb-6">
              <Link href="/cases" className="text-primary hover:underline text-sm mb-2 inline-block">
                ← Back to Cases
              </Link>
              <h2 className="text-3xl font-bold text-foreground mb-2">Create New Case</h2>
              <p className="text-muted-foreground">Register a new housing case in the system</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Client Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Client Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="clientName">Full Name *</Label>
                        <Input
                          id="clientName"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleChange}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="clientEmail">Email Address *</Label>
                          <Input
                            id="clientEmail"
                            name="clientEmail"
                            type="email"
                            value={formData.clientEmail}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="clientPhone">Phone Number *</Label>
                          <Input
                            id="clientPhone"
                            name="clientPhone"
                            value={formData.clientPhone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Property Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="propertyAddress">Street Address *</Label>
                        <Input
                          id="propertyAddress"
                          name="propertyAddress"
                          value={formData.propertyAddress}
                          onChange={handleChange}
                          placeholder="123 Main Street"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="propertyCity">City *</Label>
                          <Input
                            id="propertyCity"
                            name="propertyCity"
                            value={formData.propertyCity}
                            onChange={handleChange}
                            placeholder="Toronto"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="propertyProvince">Province *</Label>
                          <Select
                            value={formData.propertyProvince}
                            onValueChange={(value) => handleSelectChange('propertyProvince', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select province" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AB">Alberta</SelectItem>
                              <SelectItem value="BC">British Columbia</SelectItem>
                              <SelectItem value="MB">Manitoba</SelectItem>
                              <SelectItem value="NB">New Brunswick</SelectItem>
                              <SelectItem value="NL">Newfoundland</SelectItem>
                              <SelectItem value="NS">Nova Scotia</SelectItem>
                              <SelectItem value="NT">Northwest Territories</SelectItem>
                              <SelectItem value="NU">Nunavut</SelectItem>
                              <SelectItem value="ON">Ontario</SelectItem>
                              <SelectItem value="PE">Prince Edward Island</SelectItem>
                              <SelectItem value="QC">Quebec</SelectItem>
                              <SelectItem value="SK">Saskatchewan</SelectItem>
                              <SelectItem value="YT">Yukon</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="propertyPostalCode">Postal Code *</Label>
                          <Input
                            id="propertyPostalCode"
                            name="propertyPostalCode"
                            value={formData.propertyPostalCode}
                            onChange={handleChange}
                            placeholder="M5V 3A8"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Case Details Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Case Details</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="issueType">Issue Type *</Label>
                        <Select
                          value={formData.issueType}
                          onValueChange={(value) => handleSelectChange('issueType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rent Increase">Rent Increase</SelectItem>
                            <SelectItem value="Unsafe Living Conditions">Unsafe Living Conditions</SelectItem>
                            <SelectItem value="Lease Dispute">Lease Dispute</SelectItem>
                            <SelectItem value="Deposit Return">Deposit Return</SelectItem>
                            <SelectItem value="Eviction Notice">Eviction Notice</SelectItem>
                            <SelectItem value="Maintenance Issues">Maintenance Issues</SelectItem>
                            <SelectItem value="Discrimination">Discrimination</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Provide a detailed description of the issue..."
                          className="min-h-32"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority Level *</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => handleSelectChange('priority', value)}
                        >
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
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 justify-end pt-4 border-t">
                    <Link href="/cases">
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Creating...' : 'Create Case'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function NewCasePage() {
  return (
    <AuthProvider>
      <NewCaseFormContent />
    </AuthProvider>
  );
}
