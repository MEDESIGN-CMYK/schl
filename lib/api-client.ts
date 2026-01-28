/**
 * Mock API Client for Housing Case Management System
 * 
 * This layer abstracts API interactions and can be easily replaced with
 * actual HTTP calls to a .NET backend API.
 * 
 * In a real implementation, this would use fetch() or axios to call
 * endpoints like: POST /api/cases, GET /api/cases/{id}, etc.
 */

import type {
  HousingCase,
  CreateCaseRequest,
  UpdateCaseRequest,
  CaseListResponse,
  ApiResponse,
  DashboardStats,
} from './types';

// Mock data store (in real app, this would be backend API calls)
const mockCases: HousingCase[] = [
  {
    id: '1',
    caseNumber: 'HC-2024-001',
    clientName: 'John Smith',
    clientEmail: 'john.smith@email.com',
    clientPhone: '(555) 123-4567',
    status: 'open',
    priority: 'high',
    propertyAddress: '123 Main Street',
    propertyCity: 'Toronto',
    propertyProvince: 'ON',
    propertyPostalCode: 'M5V 3A8',
    issueType: 'Rent Increase',
    description: 'Client reports unauthorized rent increase without proper notice.',
    assignedTo: 'Sarah Johnson',
    notes: 'Initial assessment completed. Awaiting documentation.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    createdBy: 'admin@housing.gov',
    lastModifiedBy: 'sarah.johnson@housing.gov',
  },
  {
    id: '2',
    caseNumber: 'HC-2024-002',
    clientName: 'Maria Garcia',
    clientEmail: 'maria.garcia@email.com',
    clientPhone: '(555) 234-5678',
    status: 'in_progress',
    priority: 'critical',
    propertyAddress: '456 Oak Avenue',
    propertyCity: 'Vancouver',
    propertyProvince: 'BC',
    propertyPostalCode: 'V6B 4X1',
    issueType: 'Unsafe Living Conditions',
    description: 'Mold, water damage, and heating system failure in rental unit.',
    assignedTo: 'Robert Chen',
    notes: 'Site inspection scheduled for Jan 25. Landlord contacted.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-21'),
    createdBy: 'admin@housing.gov',
    lastModifiedBy: 'robert.chen@housing.gov',
  },
  {
    id: '3',
    caseNumber: 'HC-2024-003',
    clientName: 'James Wilson',
    clientEmail: 'james.wilson@email.com',
    clientPhone: '(555) 345-6789',
    status: 'pending_review',
    priority: 'medium',
    propertyAddress: '789 Elm Street',
    propertyCity: 'Montreal',
    propertyProvince: 'QC',
    propertyPostalCode: 'H1A 1A1',
    issueType: 'Lease Dispute',
    description: 'Disagreement over lease renewal terms and conditions.',
    assignedTo: 'Emma Davis',
    notes: 'Awaiting legal review before proceeding.',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-19'),
    createdBy: 'admin@housing.gov',
    lastModifiedBy: 'emma.davis@housing.gov',
  },
  {
    id: '4',
    caseNumber: 'HC-2024-004',
    clientName: 'Lisa Anderson',
    clientEmail: 'lisa.anderson@email.com',
    clientPhone: '(555) 456-7890',
    status: 'closed',
    priority: 'low',
    propertyAddress: '321 Pine Road',
    propertyCity: 'Calgary',
    propertyProvince: 'AB',
    propertyPostalCode: 'T2P 0H5',
    issueType: 'Deposit Return',
    description: 'Landlord refusing to return security deposit after move-out.',
    assignedTo: 'Michael Brown',
    notes: 'Case resolved. Full deposit returned to client.',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'admin@housing.gov',
    lastModifiedBy: 'michael.brown@housing.gov',
  },
];

/**
 * Simulates API delay for realistic behavior
 */
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/cases
 * Fetch all cases with optional filtering and pagination
 */
export async function getCases(
  page: number = 1,
  pageSize: number = 10,
  status?: string,
  priority?: string,
): Promise<ApiResponse<CaseListResponse>> {
  await delay();

  let filtered = [...mockCases];

  if (status) {
    filtered = filtered.filter((c) => c.status === status);
  }

  if (priority) {
    filtered = filtered.filter((c) => c.priority === priority);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return {
    success: true,
    data: {
      data,
      total,
      page,
      pageSize,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * GET /api/cases/{id}
 * Fetch a single case by ID
 */
export async function getCaseById(id: string): Promise<ApiResponse<HousingCase>> {
  await delay();

  const caseData = mockCases.find((c) => c.id === id);

  if (!caseData) {
    return {
      success: false,
      error: {
        code: 'CASE_NOT_FOUND',
        message: `Case with ID ${id} not found`,
      },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    data: caseData,
    timestamp: new Date().toISOString(),
  };
}

/**
 * POST /api/cases
 * Create a new housing case
 */
export async function createCase(
  request: CreateCaseRequest,
  userId: string,
): Promise<ApiResponse<HousingCase>> {
  await delay();

  const newCase: HousingCase = {
    id: Math.random().toString(36).substr(2, 9),
    caseNumber: `HC-2024-${String(mockCases.length + 1).padStart(3, '0')}`,
    clientName: request.clientName,
    clientEmail: request.clientEmail,
    clientPhone: request.clientPhone,
    status: 'open',
    priority: request.priority,
    propertyAddress: request.propertyAddress,
    propertyCity: request.propertyCity,
    propertyProvince: request.propertyProvince,
    propertyPostalCode: request.propertyPostalCode,
    issueType: request.issueType,
    description: request.description,
    notes: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: userId,
    lastModifiedBy: userId,
  };

  mockCases.push(newCase);

  return {
    success: true,
    data: newCase,
    timestamp: new Date().toISOString(),
  };
}

/**
 * PATCH /api/cases/{id}
 * Update an existing housing case
 */
export async function updateCase(
  id: string,
  request: UpdateCaseRequest,
  userId: string,
): Promise<ApiResponse<HousingCase>> {
  await delay();

  const caseIndex = mockCases.findIndex((c) => c.id === id);

  if (caseIndex === -1) {
    return {
      success: false,
      error: {
        code: 'CASE_NOT_FOUND',
        message: `Case with ID ${id} not found`,
      },
      timestamp: new Date().toISOString(),
    };
  }

  const updatedCase = {
    ...mockCases[caseIndex],
    ...request,
    updatedAt: new Date(),
    lastModifiedBy: userId,
  };

  mockCases[caseIndex] = updatedCase;

  return {
    success: true,
    data: updatedCase,
    timestamp: new Date().toISOString(),
  };
}

/**
 * DELETE /api/cases/{id}
 * Delete a case (archive it)
 */
export async function deleteCase(
  id: string,
  userId: string,
): Promise<ApiResponse<{ message: string }>> {
  await delay();

  const caseIndex = mockCases.findIndex((c) => c.id === id);

  if (caseIndex === -1) {
    return {
      success: false,
      error: {
        code: 'CASE_NOT_FOUND',
        message: `Case with ID ${id} not found`,
      },
      timestamp: new Date().toISOString(),
    };
  }

  mockCases[caseIndex].status = 'archived';
  mockCases[caseIndex].lastModifiedBy = userId;

  return {
    success: true,
    data: { message: 'Case archived successfully' },
    timestamp: new Date().toISOString(),
  };
}

/**
 * GET /api/dashboard/stats
 * Fetch dashboard statistics
 */
export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  await delay();

  const stats: DashboardStats = {
    totalCases: mockCases.length,
    openCases: mockCases.filter((c) => c.status === 'open').length,
    inProgressCases: mockCases.filter((c) => c.status === 'in_progress').length,
    closedCases: mockCases.filter((c) => c.status === 'closed').length,
    criticalCases: mockCases.filter((c) => c.priority === 'critical').length,
    averageResolutionTime: 14,
  };

  return {
    success: true,
    data: stats,
    timestamp: new Date().toISOString(),
  };
}
