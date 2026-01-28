# Housing Case Management System - Frontend Demonstration

A professional enterprise-grade housing case management system frontend built with React 19, Next.js 16, and TypeScript. This application is a **frontend demonstration layer** specifically designed for integration with a .NET/C# REST API backend following ASP.NET Core enterprise architecture patterns commonly used in Canadian public-sector organizations.

---

## ⚠️ IMPORTANT – DEMO SCOPE

**This application is a FRONTEND DEMONSTRATION ONLY.**

The current implementation uses mock API data and client-side state management for demonstration purposes. It is intentionally designed to serve as a reference implementation for integrating with a production .NET (C#) REST API backend following ASP.NET Core enterprise architecture patterns.

**This demonstrates:**
- Frontend architecture thinking aligned with enterprise .NET systems
- Clear API contracts and data flow
- Role-based access control and security patterns
- Professional UI/UX for government and institutional applications
- Type-safe integration patterns between frontend and backend

**Not included in this demo:**
- Real database persistence
- Production authentication (JWT implementation is in API spec only)
- Actual user management
- Real case archival or audit trails

See **Backend Implementation** section below for how this integrates with .NET.

---

## 📌 Project Purpose

This demo illustrates how an internal housing case management system could be designed and implemented in an enterprise environment.

**The objective is to demonstrate:**
- Full-stack architectural thinking
- Clean separation between frontend and backend
- Readiness for a .NET / C# backend implementation
- Business-oriented application design (case management, dashboards, workflows)
- Patterns typically used in public-sector software systems

## 🧩 Business Use Case

The application represents an internal tool used by housing agents and administrators to:

- **Manage housing-related cases** (loans, grants, assistance requests)
- **Track case status and priority** for workflow management
- **Monitor system metrics** through dashboards and analytics
- **Apply role-based access** (Agent / Admin permissions)

This mirrors real-world systems used in public housing and financial assistance organizations like CMHC, provincial housing authorities, and government service delivery organizations.

## 🔑 Core Features

### Dashboard
- Total cases overview with real-time statistics
- Status distribution visualization
- System health indicators
- Quick action buttons for common tasks

### Case Management (CRUD Operations)
- **List View**: Filterable cases by status, priority, and date range
- **Detail View**: Comprehensive case information with full edit capabilities
- **Create Case**: Form with validation for new case registration
- **Update Case**: Edit case status, priority, notes, and case details
- **Search & Filter**: Find cases by status, priority, assigned agent, and other criteria

### Role-Based Access Control
- **Agent Role**: Create, view, and update cases within assigned portfolio
- **Admin Role**: Full system access plus administrative capabilities
- UI adapts dynamically based on user role
- Protected routes prevent unauthorized access

### Administrative Features
- Admin-only dashboard with system-wide statistics
- User management capabilities
- System settings and configuration interface
- Audit logging setup (future production feature)
- Performance analytics and reporting screens

## 🛠️ Technology & Architecture Overview

### 🎯 Target Backend (Planned .NET Implementation)

This demo is architected specifically for a .NET backend:

- **Framework**: ASP.NET Core 8+
- **Language**: C# 12+
- **ORM**: Entity Framework Core 8
- **Database**: SQL Server or PostgreSQL
- **Authentication**: JWT with .NET Identity
- **API Pattern**: RESTful with standard envelope responses
- **Validation**: FluentValidation
- **Logging**: Serilog for structured logging
- **Deployment**: Azure App Service / Azure SQL / Azure DevOps CI/CD

### 🧱 Planned Backend Architecture

```
/Controllers       - RESTful API endpoints following Microsoft conventions
/Services          - Business logic layer with dependency injection
/Models            - Domain entities representing database schema
/DTOs              - Data transfer objects for request/response contracts
/Repositories      - Data access abstraction layer
```

- Service-oriented business logic
- Clean separation of concerns
- Enterprise-ready structure
- DTO-based data contracts

### 🎨 Frontend Layer (Current Demo)

- **React 19**: Latest React features with hooks and server components
- **Next.js 16**: App Router with TypeScript and middleware support
- **TypeScript**: Strict type checking throughout application
- **Tailwind CSS v4**: Utility-first styling with semantic design tokens
- **shadcn/ui**: Professional, accessible component library
- **API Client**: Type-safe abstraction layer (`/lib/api-client.ts`)
- **State Management**: React Context for authentication and user state

**The frontend is fully decoupled and ready to connect to a .NET C# REST API.**

### Mock Backend (Frontend Demonstration)

- `/lib/api-client.ts`: API client layer with mock data for demonstration
- `/lib/types.ts`: TypeScript type definitions matching .NET DTOs
- Realistic API response delays and error handling patterns
- Ready for direct replacement with real API calls
- Realistic API response delays and error handling patterns

## Why This Architecture?

### Frontend/Backend Separation
This demonstration intentionally separates frontend and backend concerns for several enterprise reasons:

1. **Team Scalability**: Large organizations have separate frontend and backend teams. This architecture allows both teams to work independently on well-defined API contracts.

2. **Enterprise .NET Alignment**: Canadian public-sector organizations (CMHC, provincial housing authorities, etc.) typically use enterprise .NET stacks. Frontend-backend separation is standard in these environments.

3. **Deployment Flexibility**: Frontend can be deployed independently to CDNs, while backend scales separately on cloud infrastructure (Azure, AWS).

4. **Testability**: Clear API contracts make both frontend and backend easier to unit test in isolation.

5. **Security**: Proper separation allows for fine-grained authentication, authorization, and audit logging at the API boundary.

### Why This Frontend Stack?
- **React/Next.js** is the modern standard for web frontends in enterprise environments
- **TypeScript** provides type safety that mirrors C# development practices
- **Tailwind CSS** enables rapid, consistent UI development
- **API-first approach** ensures frontend developers don't depend on backend implementation details

---

## Project Structure

```
├── /app                          # Next.js App Router
│   ├── page.tsx                 # Dashboard home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles with design tokens
│   ├── /cases                   # Case management routes
│   │   ├── page.tsx            # Cases list
│   │   ├── /[id]
│   │   │   └── page.tsx        # Case detail/edit
│   │   └── /new
│   │       └── page.tsx        # Create case form
│   ├── /admin                   # Admin routes
│   │   └── page.tsx            # Admin panel (role-protected)
│   └── /reports                 # Reports and analytics
│       └── page.tsx            # Reports page
├── /components                  # React components
│   ├── header.tsx              # Top navigation bar
│   ├── sidebar.tsx             # Left sidebar navigation
│   ├── dashboard-content.tsx   # Dashboard statistics
│   └── /ui                      # shadcn/ui components
├── /lib                         # Utilities and business logic
│   ├── api-client.ts           # API integration layer
│   ├── auth-context.tsx        # Authentication state
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Helper functions
├── /public                      # Static assets
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
└── API_SPECIFICATION.md        # Detailed API specification
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd housing-case-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials

The application comes with a demo user pre-loaded:
- **Name**: Sarah Johnson
- **Role**: Agent
- **Email**: agent@housing.gov

To test as an admin, modify `/lib/auth-context.tsx`:
```typescript
role: 'admin'  // Change from 'agent' to 'admin'
```

## Architecture Overview

### API Layer (`/lib/api-client.ts`)

The API client provides a clean abstraction for backend integration:

```typescript
// Current implementation uses mock data
// To integrate with real backend, replace fetch with:
const response = await fetch(`${API_BASE_URL}/api/cases/${id}`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

All API methods follow the same pattern:
- Simulate realistic delays (500ms)
- Return typed responses matching API specification
- Support filtering and pagination
- Include proper error handling

### Type System (`/lib/types.ts`)

Comprehensive TypeScript interfaces aligned with .NET DTOs:

```typescript
interface HousingCase {
  id: string;
  caseNumber: string;
  clientName: string;
  status: CaseStatus;
  priority: CasePriority;
  // ... other fields
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  timestamp: string;
}
```

### Authentication (`/lib/auth-context.tsx`)

React Context-based authentication:

```typescript
const { user, setUser, logout } = useAuth();

// User object contains: id, email, name, role, department
// Role-based access control implemented in components
if (user?.role !== 'admin') {
  return <AccessDenied />;
}
```

## API Integration Guide

### Replacing Mock API with Real Backend

1. **Set API Base URL** (in environment variables)
   ```
   NEXT_PUBLIC_API_URL=https://api.housingservices.gov
   ```

2. **Update API Client**
   ```typescript
   // /lib/api-client.ts
   const API_BASE = process.env.NEXT_PUBLIC_API_URL;
   
   export async function getCases(page: number, pageSize: number) {
     const response = await fetch(
       `${API_BASE}/api/cases?page=${page}&pageSize=${pageSize}`,
       { headers: { 'Authorization': `Bearer ${token}` } }
     );
     return response.json();
   }
   ```

3. **Add Real Authentication**
   Replace mock user in `/lib/auth-context.tsx` with:
   - JWT token handling
   - Secure token storage (httpOnly cookies recommended)
   - Refresh token logic

## Public-Sector Considerations

This application demonstrates enterprise architecture patterns critical for government and institutional applications:

### Data Security & Privacy
- **Role-Based Access Control**: Different user roles see different data (Agent vs. Admin)
- **Claim-Based Authorization**: Granular permissions based on user attributes
- **Secure Token Handling**: JWT tokens with proper expiration and refresh logic
- **HTTPS Only**: All API communications encrypted
- **Input Validation**: All user inputs validated before processing

### Audit & Compliance
- **Audit Trails** (future feature): All case modifications logged with user ID and timestamp
- **Data Retention**: Soft deletes preserve historical records for compliance
- **Access Logging**: Track who accessed what data and when
- **Immutable Records**: Certain fields cannot be modified after creation
- **Compliance Reporting**: Dashboard and report generation for oversight

### Accessibility & Inclusion
- **WCAG 2.1 Compliance**: Color contrast, keyboard navigation, screen reader support
- **Responsive Design**: Works on desktop and mobile devices
- **Clear Language**: Plain language in UI and documentation
- **Form Accessibility**: Proper labels, error messages, and validation feedback

### Performance & Reliability
- **Pagination**: Handles large datasets efficiently
- **Query Optimization**: Indexed database queries
- **Error Recovery**: Graceful handling of network failures
- **Caching Strategy**: Reduces unnecessary API calls
- **Long-Term Maintainability**: Clean code, comprehensive documentation

---

## .NET Backend Implementation

This frontend is designed to work with a .NET 8+ backend following enterprise architecture patterns. See `API_SPECIFICATION.md` for:

- **Complete endpoint specifications** with C# controller examples
- **DTO definitions** matching TypeScript interfaces
- **Service layer patterns** for business logic
- **Entity Framework Core configuration** for database operations
- **JWT authentication/authorization** setup
- **Project structure** recommendations for scalable .NET applications

### Suggested Backend Stack
- **Framework**: ASP.NET Core 8+ (LTS)
- **ORM**: Entity Framework Core 8
- **Database**: SQL Server or PostgreSQL
- **Authentication**: JWT with .NET Identity or custom implementation
- **Validation**: FluentValidation or Data Annotations
- **Logging**: Serilog with structured logging
- **CI/CD**: Azure DevOps or GitHub Actions

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         END USER / BROWSER                          │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTP/HTTPS
                                  │
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER (Current Demo)                     │
│                      React 19 + Next.js 16                           │
│                       TypeScript + Tailwind                          │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Pages: Dashboard, Cases, Admin, Reports                     │  │
│  │ Components: Headers, Sidebars, Forms, Tables               │  │
│  │ State: React Context (Auth), Mock API Client              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Uses: /lib/api-client.ts (Type-safe API abstraction)               │
│  Auth:  Mock JWT (demo) → Real JWT (production)                    │
│  Cache: React Context (demo) → SWR/TanStack Query (production)     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                 Calls RESTful API via fetch() with Bearer token
                                  │
┌─────────────────────────────────────────────────────────────────────┐
│            BACKEND LAYER (To be implemented in .NET)                 │
│            ASP.NET Core 8+ Controllers + Services                    │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Controllers: CasesController, DashboardController          │  │
│  │ Services: CaseService, DashboardService                   │  │
│  │ Models: HousingCase, User, DTOs                          │  │
│  │ Validation: FluentValidation, Data Annotations            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Auth:  JWT Token Validation + Claims-based Authorization          │
│  Logging: Serilog (structured logging)                             │
│  Caching: Redis (optional) for dashboard stats                     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                            EF Core ORM
                                  │
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                                     │
│            SQL Server or PostgreSQL (recommended)                     │
│                                                                      │
│  Tables: HousingCases, Users, AuditLogs, Roles                      │
│  Indexes: CaseNumber, ClientName, Status, Priority                  │
│  Features: Soft Deletes, Audit Trails, Role-Based Data Access     │
└─────────────────────────────────────────────────────────────────────┘

Optional Integrations:
├─ Microsoft Dynamics 365 CRM (client data, sync)
├─ Azure Service Bus (async messaging)
├─ Azure Key Vault (secrets management)
├─ Application Insights (monitoring & telemetry)
└─ Azure DevOps (CI/CD pipeline)
```

### Data Flow Example

```
User Action: Create New Case
    ↓
Frontend Form Input
    ↓
Type-checked (TypeScript) & Validated (React Hook Form)
    ↓
POST /api/cases with Bearer token & JSON body
    ↓
API receives request, validates JWT token
    ↓
Authorization middleware checks user role
    ↓
CasesController.CreateCase() is invoked
    ↓
CaseService validates business rules
    ↓
Repository adds case to database via EF Core
    ↓
API returns 201 Created with new HousingCaseDto
    ↓
Frontend receives response, updates state
    ↓
UI refreshes to show new case in list
    ↓
Optional: Audit log written to database
```

---

## Design System

### Color Palette (Professional Government Theme)
- **Primary**: Deep Blue (#4055B2)
- **Secondary**: Teal (#5578C0)
- **Neutral**: Light Gray to Dark Gray
- **Accent**: Cyan (#7FC4E8)
- **Destructive**: Red for warnings/errors

### Typography
- **Headings**: Inter font family
- **Body**: Inter font family
- **Mono**: Monospace for code/IDs

### Semantic Design Tokens
Configured in `globals.css`:
```css
--primary: oklch(0.45 0.15 256.59);
--secondary: oklch(0.55 0.12 258.55);
--accent: oklch(0.60 0.18 205.91);
--border: oklch(0.92 0 0);
```

## Key Features Explained

### Case Management
- **Create**: Form with validation for all required fields
- **Read**: List view with filtering, detail view with full information
- **Update**: Inline editing of status, priority, and notes
- **Delete**: Archive cases instead of permanent deletion

### Dashboard Statistics
- Real-time metrics from mock API
- Status breakdown (Open, In Progress, Pending, Closed)
- Performance indicators
- Average resolution time tracking

### Role-Based Access
- Sidebar navigation filtered by role
- Admin page shows access denied for non-admin users
- Protected routes prevent unauthorized access

### Responsive Design
- Mobile-first approach
- Sidebar navigation hides on mobile, becomes hamburger menu (ready to implement)
- Forms and tables adapt to screen size
- Touch-friendly interface for mobile devices

## Performance Optimizations

- **Code Splitting**: Each route is automatically code-split
- **Image Optimization**: Next.js Image component ready
- **Caching**: API responses could be cached with SWR or React Query
- **Database Indexing**: Ready for backend optimization (see API spec)

## Testing

### Unit Testing (Ready to Implement)
```bash
npm run test
```

The structure supports:
- Component testing with React Testing Library
- API client testing with Jest
- Type checking with TypeScript

### Manual Testing
1. Create a new case
2. Filter cases by status and priority
3. Update case details
4. Access admin panel (requires admin role)
5. View dashboard statistics

## Security Considerations

### Current Demo Implementation
- User role stored in context (demo only)
- No real authentication

### Production Implementation Checklist
- [ ] Implement JWT token handling
- [ ] Use httpOnly cookies for tokens
- [ ] Add CSRF protection
- [ ] Implement refresh token rotation
- [ ] Add input validation and sanitization
- [ ] Set proper CORS headers
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Add security headers (CSP, X-Frame-Options, etc.)
- [ ] Regular dependency updates

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
CMD ["npm", "start"]
```

### Environment Variables (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=Housing Case Management
```

## Development Guidelines

### Code Style
- ESLint configured for consistency
- Prettier for code formatting
- TypeScript strict mode enabled

### Component Best Practices
- Separate client and server components
- Use composition over inheritance
- Keep components small and focused
- Proper prop typing with TypeScript

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/case-export

# Make changes
git add .
git commit -m "Add case export functionality"

# Push and create PR
git push origin feature/case-export
```

## Common Tasks

### Add a New Case Field
1. Update `/lib/types.ts` - Add to HousingCase interface
2. Update `/lib/api-client.ts` - Include in mock data
3. Update case form in `/app/cases/new/page.tsx`
4. Update case detail view in `/app/cases/[id]/page.tsx`
5. Update API spec in `API_SPECIFICATION.md`

### Implement Real Authentication
1. Add auth library (e.g., `next-auth` or custom JWT)
2. Update `/lib/auth-context.tsx` with real login logic
3. Add `/app/login/page.tsx` route
4. Replace mock user with real token handling
5. Update API client with token injection

### Connect Real API
1. Set `NEXT_PUBLIC_API_URL` environment variable
2. Replace mock functions in `/lib/api-client.ts` with fetch calls
3. Remove mock delay simulation
4. Add error handling and retry logic
5. Test with actual backend

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

## Future Enhancements

- [ ] Export cases to PDF/Excel
- [ ] Advanced filtering and search
- [ ] Case notes with rich text editor
- [ ] Document attachment and management
- [ ] Email notifications
- [ ] SMS alerts for critical cases
- [ ] Integration with external services
- [ ] Mobile app version
- [ ] Real-time notifications with WebSockets
- [ ] Advanced reporting with charts and graphs

## Support & Documentation

- **API Specification**: See `/API_SPECIFICATION.md`
- **Component Library**: shadcn/ui components in `/components/ui`
- **Type Definitions**: All types in `/lib/types.ts`

## License

This is a demonstration project for interview purposes. 

## Author

Created as a professional demonstration of full-stack development capabilities for a .NET position at a Canadian housing organization.

---

## Quick Reference

### Available Routes
- `/` - Dashboard
- `/cases` - Case list
- `/cases/new` - Create case
- `/cases/[id]` - Case detail
- `/admin` - Admin panel (admin only)
- `/reports` - Reports and analytics

### Mock API Endpoints
- `GET /api/cases` - List cases with filtering
- `GET /api/cases/{id}` - Get case details
- `POST /api/cases` - Create case
- `PATCH /api/cases/{id}` - Update case
- `DELETE /api/cases/{id}` - Archive case
- `GET /api/dashboard/stats` - Get dashboard statistics

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API base URL (when integrated)

### Key Files
- `lib/api-client.ts` - API integration layer
- `lib/auth-context.tsx` - Authentication state
- `lib/types.ts` - Type definitions
- `components/sidebar.tsx` - Navigation
- `app/page.tsx` - Dashboard page

---

## 🔄 Example System Flow

```
User Interface (Browser)
  ↓
Frontend (Next.js / React / TypeScript)
  ↓
API Client Layer (Type-Safe Abstraction)
  ↓
.NET REST API (ASP.NET Core)
  ↓
Entity Framework Core (ORM)
  ↓
Database (SQL Server / Azure SQL)
```

## 🔌 API Integration Design

The application communicates through a dedicated API client layer, designed to map directly to ASP.NET Core controllers.

**See `/API_SPECIFICATION.md` for:**
- REST endpoint definitions
- Example C# controller signatures
- DTO models matching TypeScript types
- Authentication and authorization strategies
- Service-layer patterns
- Entity Framework design recommendations

## 🏛️ Public-Sector Considerations

This demo was designed with public-sector requirements in mind:

- **Role-Based Access Control**: Different user roles with granular permissions
- **Security-First Architecture**: JWT authentication, secure session management, input validation
- **Audit-Friendly Data Flow**: Structured logging and activity tracking (future production feature)
- **Accessibility Awareness**: WCAG-ready design approach with proper color contrast and keyboard navigation
- **Data Protection**: Secure handling of sensitive information, role-based data visibility
- **Maintainability**: Clear separation of responsibilities across layers for long-term scalability

## 🔗 Microsoft Dynamics 365 (Future Integration)

This architecture is compatible with Microsoft Dynamics 365 CRM integration scenarios:
- Synchronizing cases with CRM entities
- Sharing customer profiles across systems
- Integrating workflows and automation
- Extending analytics and reporting capabilities

See `/API_SPECIFICATION.md` for detailed Dynamics 365 integration patterns.

---

## 📝 Final Notes

**This project is not a production system:**
- No real housing or personal data is used
- Created solely to demonstrate enterprise application design
- Designed to showcase .NET-oriented full-stack thinking

**What this demonstrates:**
- I understand **frontend/backend separation** and why it matters in enterprise systems
- I've designed clear **API contracts** (DTO patterns, error handling, pagination)
- I follow **type-safe patterns** that mirror .NET conventions (TypeScript ≈ C#)
- I think about **security, authorization, and audit trails** from the ground up
- I understand **public-sector requirements** (WCAG, audit logging, data protection)
- The architecture supports **real-world .NET patterns** (Services, Repositories, DTOs, EF Core)

**This is NOT a startup prototype.** It's a professional enterprise application designed for integration with a serious .NET backend in a government environment.

The `/API_SPECIFICATION.md` is your blueprint. It contains everything needed to build the .NET backend—including C# controller templates, DTO definitions, EF Core setup, and authentication patterns.

---

## 🎯 Final Statement

This demonstration reflects how I approach enterprise software development, particularly in .NET-based, public-sector environments: **clear architecture, separation of concerns, business alignment, and long-term maintainability.**

---

## 🚀 Getting Started

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# Visit http://localhost:3000
```

### Demo Credentials

The application comes with a pre-configured demo user:

- **Name**: Sarah Johnson
- **Email**: sarah.johnson@housing.gov
- **Role**: Agent

To test as Admin, update the `role` in `/lib/auth-context.tsx`.

### Next Steps

1. **Explore the Dashboard**: View the overview and system statistics
2. **Manage Cases**: Create, view, and update housing cases
3. **Check API Spec**: Review `/API_SPECIFICATION.md` for backend implementation details
4. **Review Architecture**: See the `/lib/api-client.ts` for API integration patterns

---

## 📖 Documentation Quick Links

- **[API_SPECIFICATION.md](/API_SPECIFICATION.md)**: Complete REST API specification and .NET C# implementation guide
- **[lib/api-client.ts](/lib/api-client.ts)**: Type-safe API client layer with mock data
- **[lib/types.ts](/lib/types.ts)**: TypeScript type definitions matching .NET DTOs

---

## 📝 Final Notes

**This project is not a production system:**
- No real housing or personal data is used
- Created solely to demonstrate enterprise application design
- Designed to showcase .NET-oriented full-stack thinking

**What this demonstrates:**
- I understand **frontend/backend separation** and why it matters in enterprise systems
- I've designed clear **API contracts** (DTO patterns, error handling, pagination)
- I follow **type-safe patterns** that mirror .NET conventions (TypeScript ≈ C#)
- I think about **security, authorization, and audit trails** from the ground up
- I understand **public-sector requirements** (WCAG, audit logging, data protection)
- The architecture supports **real-world .NET patterns** (Services, Repositories, DTOs, EF Core)

**This is NOT a startup prototype.** It's a professional enterprise application designed for integration with a serious .NET backend in a government environment.

---

**Last Updated**: January 28, 2026  
**Version**: 1.0.0  
**Status**: Enterprise Frontend Demonstration – Ready for .NET Backend Integration  
**Intended for**: Senior Full Stack .NET Developer positions in Canadian public-sector organizations
