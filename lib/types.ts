/**
 * Housing Case Management System - Type Definitions
 * Designed to align with .NET backend entities (DTOs and Models)
 */

export type UserRole = 'admin' | 'agent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  createdAt: Date;
}

export type CaseStatus = 'open' | 'in_progress' | 'pending_review' | 'closed' | 'archived';
export type CasePriority = 'low' | 'medium' | 'high' | 'critical';

export interface HousingCase {
  id: string;
  caseNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: CaseStatus;
  priority: CasePriority;
  propertyAddress: string;
  propertyCity: string;
  propertyProvince: string;
  propertyPostalCode: string;
  issueType: string;
  description: string;
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
}

export interface CreateCaseRequest {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyAddress: string;
  propertyCity: string;
  propertyProvince: string;
  propertyPostalCode: string;
  issueType: string;
  description: string;
  priority: CasePriority;
}

export interface UpdateCaseRequest {
  status?: CaseStatus;
  priority?: CasePriority;
  assignedTo?: string;
  notes?: string;
  issueType?: string;
  description?: string;
}

export interface CaseListResponse {
  data: HousingCase[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export interface DashboardStats {
  totalCases: number;
  openCases: number;
  inProgressCases: number;
  closedCases: number;
  criticalCases: number;
  averageResolutionTime: number;
}
