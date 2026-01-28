# Housing Case Management System - API Specification

## Overview

This document provides the **definitive API specification** for the Housing Case Management System. This is a professional reference document for implementing the backend REST API in **.NET/C# (ASP.NET Core)**.

All endpoints, data models, and architectural patterns described here are **designed specifically for ASP.NET Core 8+ implementation** following enterprise .NET conventions and best practices commonly used in Canadian public-sector organizations.

**Frontend Technology:** React 19 + Next.js 16 + TypeScript  
**Intended Backend:** .NET 8+ with C# (ASP.NET Core) - **REQUIRED**  
**Database:** SQL Server (preferred for public sector) or PostgreSQL  
**Authentication:** JWT with .NET Identity or custom implementation  
**Architecture:** Clean Architecture with Controllers → Services → Repositories → Entity Framework

---

## Authentication & Authorization

### Headers
All API requests must include:
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Response Structure
All API responses follow a standard envelope format:

```json
{
  "success": boolean,
  "data": T,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

### Roles
- **Agent**: Can create, view, and update cases within their department
- **Admin**: Full system access including user management and configuration

---

## Data Models

### User (DTO)
```csharp
public class UserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public UserRole Role { get; set; } // "admin" | "agent"
    public string Department { get; set; }
    public DateTime CreatedAt { get; set; }
}

public enum UserRole
{
    Admin,
    Agent
}
```

### Housing Case (DTO)
```csharp
public class HousingCaseDto
{
    public string Id { get; set; }
    public string CaseNumber { get; set; }
    
    // Client Information
    public string ClientName { get; set; }
    public string ClientEmail { get; set; }
    public string ClientPhone { get; set; }
    
    // Case Status
    public CaseStatus Status { get; set; }
    public CasePriority Priority { get; set; }
    
    // Property Information
    public string PropertyAddress { get; set; }
    public string PropertyCity { get; set; }
    public string PropertyProvince { get; set; }
    public string PropertyPostalCode { get; set; }
    
    // Case Details
    public string IssueType { get; set; }
    public string Description { get; set; }
    public string? AssignedTo { get; set; }
    public string? Notes { get; set; }
    
    // Audit Fields
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string CreatedBy { get; set; }
    public string LastModifiedBy { get; set; }
}

public enum CaseStatus
{
    Open,
    InProgress,
    PendingReview,
    Closed,
    Archived
}

public enum CasePriority
{
    Low,
    Medium,
    High,
    Critical
}
```

### Create Case Request (DTO)
```csharp
public class CreateCaseRequest
{
    [Required]
    public string ClientName { get; set; }
    
    [Required]
    [EmailAddress]
    public string ClientEmail { get; set; }
    
    [Required]
    [Phone]
    public string ClientPhone { get; set; }
    
    [Required]
    public string PropertyAddress { get; set; }
    
    [Required]
    public string PropertyCity { get; set; }
    
    [Required]
    public string PropertyProvince { get; set; }
    
    [Required]
    public string PropertyPostalCode { get; set; }
    
    [Required]
    public string IssueType { get; set; }
    
    [Required]
    public string Description { get; set; }
    
    public CasePriority Priority { get; set; } = CasePriority.Medium;
}
```

### Update Case Request (DTO)
```csharp
public class UpdateCaseRequest
{
    public CaseStatus? Status { get; set; }
    public CasePriority? Priority { get; set; }
    public string? AssignedTo { get; set; }
    public string? Notes { get; set; }
    public string? IssueType { get; set; }
    public string? Description { get; set; }
}
```

### Dashboard Statistics (DTO)
```csharp
public class DashboardStatsDto
{
    public int TotalCases { get; set; }
    public int OpenCases { get; set; }
    public int InProgressCases { get; set; }
    public int ClosedCases { get; set; }
    public int CriticalCases { get; set; }
    public int AverageResolutionTime { get; set; } // in days
}
```

### Paginated Response (Generic)
```csharp
public class PaginatedResponse<T>
{
    public List<T> Data { get; set; }
    public int Total { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}
```

---

## API Endpoints

### Cases - List
**GET** `/api/cases`

Query Parameters:
- `page` (int, optional): Page number (default: 1)
- `pageSize` (int, optional): Items per page (default: 10)
- `status` (string, optional): Filter by status
- `priority` (string, optional): Filter by priority

Example Request:
```
GET /api/cases?page=1&pageSize=10&status=open
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "1",
        "caseNumber": "HC-2024-001",
        "clientName": "John Smith",
        "clientEmail": "john@example.com",
        "status": "open",
        "priority": "high",
        "propertyAddress": "123 Main St",
        "propertyCity": "Toronto",
        "propertyProvince": "ON",
        "issueType": "Rent Increase",
        "assignedTo": "Sarah Johnson",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-20T15:45:00Z"
      }
    ],
    "total": 45,
    "page": 1,
    "pageSize": 10
  },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

Suggested C# Controller:
```csharp
[HttpGet]
[Authorize]
public async Task<ActionResult<ApiResponse<PaginatedResponse<HousingCaseDto>>>> GetCases(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10,
    [FromQuery] string? status = null,
    [FromQuery] string? priority = null)
{
    var result = await _caseService.GetCasesAsync(page, pageSize, status, priority);
    return Ok(new ApiResponse<PaginatedResponse<HousingCaseDto>> { Success = true, Data = result });
}
```

---

### Cases - Get By ID
**GET** `/api/cases/{id}`

Path Parameters:
- `id` (string, required): Case ID

Response (200 OK):
```json
{
  "success": true,
  "data": { /* HousingCaseDto */ },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

Response (404 Not Found):
```json
{
  "success": false,
  "error": {
    "code": "CASE_NOT_FOUND",
    "message": "Case with ID {id} not found"
  },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

Suggested C# Controller:
```csharp
[HttpGet("{id}")]
[Authorize]
public async Task<ActionResult<ApiResponse<HousingCaseDto>>> GetCaseById(string id)
{
    var caseData = await _caseService.GetCaseByIdAsync(id);
    if (caseData == null)
    {
        return NotFound(new ApiResponse<HousingCaseDto>
        {
            Success = false,
            Error = new ErrorInfo { Code = "CASE_NOT_FOUND", Message = "Case not found" }
        });
    }
    return Ok(new ApiResponse<HousingCaseDto> { Success = true, Data = caseData });
}
```

---

### Cases - Create
**POST** `/api/cases`

Request Body:
```json
{
  "clientName": "Maria Garcia",
  "clientEmail": "maria@example.com",
  "clientPhone": "(555) 234-5678",
  "propertyAddress": "456 Oak Avenue",
  "propertyCity": "Vancouver",
  "propertyProvince": "BC",
  "propertyPostalCode": "V6B 4X1",
  "issueType": "Unsafe Living Conditions",
  "description": "Mold, water damage, and heating system failure in rental unit.",
  "priority": "critical"
}
```

Response (201 Created):
```json
{
  "success": true,
  "data": { /* Created HousingCaseDto */ },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

Suggested C# Controller:
```csharp
[HttpPost]
[Authorize(Roles = "Admin,Agent")]
public async Task<ActionResult<ApiResponse<HousingCaseDto>>> CreateCase(
    [FromBody] CreateCaseRequest request)
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var createdCase = await _caseService.CreateCaseAsync(request, userId);
    return CreatedAtAction(nameof(GetCaseById), new { id = createdCase.Id },
        new ApiResponse<HousingCaseDto> { Success = true, Data = createdCase });
}
```

---

### Cases - Update
**PATCH** `/api/cases/{id}`

Path Parameters:
- `id` (string, required): Case ID

Request Body:
```json
{
  "status": "in_progress",
  "priority": "high",
  "assignedTo": "Robert Chen",
  "notes": "Site inspection scheduled for Jan 25. Landlord contacted."
}
```

Response (200 OK):
```json
{
  "success": true,
  "data": { /* Updated HousingCaseDto */ },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

Suggested C# Controller:
```csharp
[HttpPatch("{id}")]
[Authorize(Roles = "Admin,Agent")]
public async Task<ActionResult<ApiResponse<HousingCaseDto>>> UpdateCase(
    string id,
    [FromBody] UpdateCaseRequest request)
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var updatedCase = await _caseService.UpdateCaseAsync(id, request, userId);
    return Ok(new ApiResponse<HousingCaseDto> { Success = true, Data = updatedCase });
}
```

---

### Cases - Delete (Archive)
**DELETE** `/api/cases/{id}`

Path Parameters:
- `id` (string, required): Case ID

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "message": "Case archived successfully"
  },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

Suggested C# Controller:
```csharp
[HttpDelete("{id}")]
[Authorize(Roles = "Admin,Agent")]
public async Task<ActionResult<ApiResponse<object>>> DeleteCase(string id)
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    await _caseService.DeleteCaseAsync(id, userId);
    return Ok(new ApiResponse<object>
    {
        Success = true,
        Data = new { Message = "Case archived successfully" }
    });
}
```

---

### Dashboard - Statistics
**GET** `/api/dashboard/stats`

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalCases": 127,
    "openCases": 45,
    "inProgressCases": 38,
    "closedCases": 40,
    "criticalCases": 4,
    "averageResolutionTime": 14
  },
  "timestamp": "2024-01-28T10:30:00Z"
}
```

Suggested C# Controller:
```csharp
[HttpGet("stats")]
[Authorize]
public async Task<ActionResult<ApiResponse<DashboardStatsDto>>> GetDashboardStats()
{
    var stats = await _dashboardService.GetStatsAsync();
    return Ok(new ApiResponse<DashboardStatsDto> { Success = true, Data = stats });
}
```

---

## Future Backend Implementation Plan (.NET)

### Phase 1: Project Setup & Database
1. Create new ASP.NET Core 8 solution with Visual Studio 2022+
2. Set up three-tier architecture:
   - `HousingCaseManagement.API` - HTTP controllers and middleware
   - `HousingCaseManagement.Core` - Business logic, services, and DTOs
   - `HousingCaseManagement.Data` - EF Core context and repositories
3. Install required NuGet packages:
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
   dotnet add package FluentValidation.AspNetCore
   dotnet add package Serilog.AspNetCore
   ```
4. Configure database connection in `appsettings.json`
5. Create database schema using EF Core migrations
6. Seed initial data (users, roles, sample cases)

### Phase 2: Identity & Authentication
1. Implement JWT token generation and validation
2. Create UserService with password hashing (bcrypt)
3. Set up claims-based authorization
4. Add role definitions (Admin, Agent)
5. Implement token refresh logic
6. Add audit logging for authentication events

### Phase 3: Core Business Logic
1. Implement CaseService with business rules
2. Create repository pattern for data access
3. Add FluentValidation for DTOs
4. Implement soft deletes for case archival
5. Add case number generation logic
6. Create dashboard service for statistics

### Phase 4: API Endpoints
1. Implement CasesController with CRUD operations
2. Add filtering, sorting, and pagination
3. Implement DashboardController for statistics
4. Add proper error handling and response envelopes
5. Implement role-based authorization attributes
6. Add request/response logging

### Phase 5: Testing & Deployment
1. Write unit tests for services
2. Create integration tests for API endpoints
3. Set up CI/CD pipeline in Azure DevOps
4. Configure SQL Server on Azure
5. Deploy to Azure App Service
6. Set up monitoring and alerting

---

## Suggested .NET Architecture

### Project Structure
```
HousingCaseManagement/
├── HousingCaseManagement.API/
│   ├── Controllers/
│   │   ├── CasesController.cs
│   │   ├── DashboardController.cs
│   │   └── AuthController.cs
│   ├── Program.cs
│   └── appsettings.json
├── HousingCaseManagement.Core/
│   ├── Models/
│   │   ├── HousingCase.cs
│   │   ├── User.cs
│   │   └── Enums.cs
│   ├── DTOs/
│   │   ├── HousingCaseDto.cs
│   │   ├── CreateCaseRequest.cs
│   │   └── DashboardStatsDto.cs
│   ├── Interfaces/
│   │   ├── ICaseService.cs
│   │   ├── IDashboardService.cs
│   │   └── IRepository.cs
│   └── Services/
│       ├── CaseService.cs
│       └── DashboardService.cs
├── HousingCaseManagement.Data/
│   ├── Context/
│   │   └── HousingCaseDbContext.cs
│   └── Repositories/
│       └── CaseRepository.cs
└── HousingCaseManagement.Tests/
    └── Services/
        └── CaseServiceTests.cs
```

### Service Layer Pattern (Example)
```csharp
public interface ICaseService
{
    Task<PaginatedResponse<HousingCaseDto>> GetCasesAsync(int page, int pageSize, string? status, string? priority);
    Task<HousingCaseDto?> GetCaseByIdAsync(string id);
    Task<HousingCaseDto> CreateCaseAsync(CreateCaseRequest request, string userId);
    Task<HousingCaseDto> UpdateCaseAsync(string id, UpdateCaseRequest request, string userId);
    Task DeleteCaseAsync(string id, string userId);
}

public class CaseService : ICaseService
{
    private readonly ICaseRepository _repository;
    private readonly ILogger<CaseService> _logger;
    
    public async Task<HousingCaseDto> CreateCaseAsync(CreateCaseRequest request, string userId)
    {
        // Validate input
        if (string.IsNullOrEmpty(request.ClientName))
            throw new ArgumentException("Client name is required");
        
        // Create entity
        var caseEntity = new HousingCase
        {
            Id = Guid.NewGuid().ToString(),
            CaseNumber = await GenerateCaseNumberAsync(),
            ClientName = request.ClientName,
            // ... map other fields
            CreatedAt = DateTime.UtcNow,
            CreatedBy = userId
        };
        
        // Save to database
        await _repository.AddAsync(caseEntity);
        await _repository.SaveChangesAsync();
        
        // Return DTO
        return MapToDto(caseEntity);
    }
}
```

### Entity Framework Core Setup
```csharp
public class HousingCaseDbContext : DbContext
{
    public HousingCaseDbContext(DbContextOptions<HousingCaseDbContext> options)
        : base(options) { }
    
    public DbSet<HousingCase> Cases { get; set; }
    public DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure Case entity
        modelBuilder.Entity<HousingCase>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CaseNumber).IsRequired().HasMaxLength(50);
            entity.Property(e => e.ClientName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Status).HasConversion<string>();
            entity.Property(e => e.Priority).HasConversion<string>();
        });
    }
}
```

---

## Authentication & Authorization

### JWT Token Implementation
```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
        };
    });

services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));
    options.AddPolicy("AgentOrAdmin", policy =>
        policy.RequireRole("Agent", "Admin"));
});
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| CASE_NOT_FOUND | 404 | Case does not exist |
| INVALID_INPUT | 400 | Request validation failed |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | User lacks permission |
| INTERNAL_ERROR | 500 | Server error |

---

## Implementation Notes

1. **Database**: Use SQL Server or PostgreSQL with Entity Framework Core
2. **Validation**: Implement FluentValidation for DTOs
3. **Logging**: Use Serilog for structured logging
4. **CORS**: Configure CORS to allow frontend requests from `localhost:3000` (development) and production domains
5. **Async/Await**: All database operations should be async
6. **Soft Deletes**: Consider implementing soft deletes for case archival
7. **Audit Trail**: Log all create/update operations with user ID and timestamp
8. **Caching**: Consider implementing Redis caching for dashboard statistics

---

## Frontend Integration Example

The React frontend calls these endpoints like this:

```typescript
// GET request
const response = await fetch('/api/cases?page=1&pageSize=10', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// POST request
const response = await fetch('/api/cases', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(createCaseRequest)
});

// PATCH request
const response = await fetch(`/api/cases/${id}`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updateRequest)
});
```

---

## Microsoft Dynamics 365 CRM Integration (Future Enhancement)

Many Canadian public-sector organizations use Microsoft Dynamics 365 CRM for client relationship management. This system can be integrated with Dynamics 365 as follows:

### High-Level Integration Strategy

1. **Case Synchronization**
   - Housing cases created in this system sync to Dynamics 365 as `Account` records
   - Case updates push back to Dynamics 365 for centralized client tracking
   - Bi-directional sync ensures data consistency

2. **Client Data Enrichment**
   - Client information pulled from Dynamics 365 during case creation
   - Existing client relationships visible within case context
   - Prevent duplicate client records across systems

3. **Activity Logging**
   - Case interactions logged as Activities in Dynamics 365
   - Provides unified view of client engagement
   - Supports government audit and compliance requirements

4. **Implementation Pattern**
   ```csharp
   public class DynamicsIntegrationService
   {
       private readonly IOrganizationServiceProxy _dynamicsService;
       
       public async Task SyncCaseToDynamicsAsync(HousingCase caseEntity)
       {
           var entity = new Entity("account")
           {
               ["name"] = caseEntity.ClientName,
               ["emailaddress1"] = caseEntity.ClientEmail,
               // ... map other fields
           };
           
           await _dynamicsService.CreateAsync(entity);
       }
   }
   ```

5. **Security Considerations**
   - Use Azure Service Principal for server-to-server authentication
   - Implement field-level security for sensitive data
   - Audit all Dynamics 365 API calls
   - Use Dynamics 365 connection references in Azure Logic Apps for workflow automation

### Benefits for Public Sector
- Unified view of citizen interactions across government services
- Automated workflow orchestration for case approvals
- Built-in compliance and audit trails
- Integration with Microsoft 365 (Teams, SharePoint) for collaboration
- Power BI dashboards for government reporting

---

## Testing Recommendations

Use xUnit with Moq for unit testing:

```csharp
[Fact]
public async Task CreateCase_WithValidData_ReturnsCreatedCase()
{
    // Arrange
    var mockRepository = new Mock<ICaseRepository>();
    var service = new CaseService(mockRepository.Object);
    var request = new CreateCaseRequest { /* ... */ };
    
    // Act
    var result = await service.CreateCaseAsync(request, "user-1");
    
    // Assert
    Assert.NotNull(result);
    Assert.Equal(request.ClientName, result.ClientName);
    mockRepository.Verify(r => r.AddAsync(It.IsAny<HousingCase>()), Times.Once);
}
```

---

## Additional Resources

- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [REST API Design Guidelines](https://restfulapi.net/)
