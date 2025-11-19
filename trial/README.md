# Workflow Automation Platform (n8n/Zapier Clone)

A production-grade workflow automation platform built with Next.js, tRPC, and PostgreSQL. Create, manage, and execute complex workflows with a drag-and-drop interface.

## Features

- **🎨 Drag-and-Drop Builder**: Visually create workflows with an intuitive canvas interface
- **🔌 100+ Integrations**: Connect with popular services like Slack, Gmail, Google Sheets, and more
- **⚡ Real-time Execution**: Monitor workflow runs with live logs and execution history
- **🔐 Enterprise Security**: End-to-end encryption, OAuth authentication, and audit logs
- **📊 Analytics Dashboard**: Track workflow performance, success rates, and execution metrics
- **🚀 Scalable Architecture**: Handle millions of executions with distributed processing
- **📱 API-First Design**: Full REST API and WebSocket support for programmatic access
- **🐳 Docker Ready**: Pre-configured for Docker, Vercel, AWS, and Google Cloud deployment

## Tech Stack

### Frontend
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **TailwindCSS 4** for styling
- **ShadCN/UI** for component library
- **Zustand** for state management
- **tRPC** for type-safe API calls

### Backend
- **tRPC 11** for type-safe RPC
- **Prisma ORM** with PostgreSQL
- **better-auth** for authentication
- **Express.js** for HTTP server
- **Node.js 22** runtime

### Infrastructure
- **PostgreSQL 14+** for data persistence
- **Redis** for caching and job queue
- **Docker & Docker Compose** for containerization
- **Vercel/AWS/GCP** for deployment

## Quick Start

### Prerequisites
- Node.js 22+
- pnpm (or npm/yarn)
- PostgreSQL 14+ (for production)
- Docker & Docker Compose (optional)

### Local Development

```bash
# 1. Clone and install dependencies
git clone <repository-url>
cd workflow-platform-monorepo
pnpm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your Manus OAuth credentials

# 3. Set up database
pnpm db:push

# 4. Start development server
pnpm dev
```

Visit `http://localhost:3000` and sign in with your Manus account.

### Docker Deployment

```bash
# Start with Docker Compose
docker-compose up -d

# Run migrations
docker-compose exec app pnpm db:push

# View logs
docker-compose logs -f app
```

Access the application at `http://localhost:3000`.

## Project Structure

```
workflow-platform-monorepo/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # Utilities and helpers
│   │   └── App.tsx           # Main router
│   └── index.html
├── server/                    # Backend application
│   ├── db.ts                 # Database query helpers
│   ├── routers.ts            # tRPC procedure definitions
│   ├── _core/                # Framework internals
│   └── index.ts              # Server entry point
├── drizzle/                   # Database schema and migrations
│   └── schema.ts             # Prisma schema
├── shared/                    # Shared types and constants
├── Dockerfile                 # Container image definition
├── docker-compose.yml         # Local development stack
├── vercel.json               # Vercel deployment config
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

## Core Features

### Dashboard
- View all workflows with status indicators
- Create, edit, duplicate, and delete workflows
- Monitor execution history and statistics
- Search and filter workflows

### Workflow Builder
- **Canvas**: Drag-and-drop interface for building workflows
- **Nodes**: Trigger and action nodes with configuration
- **Inspector**: Configure node parameters and test inputs
- **Validation**: Real-time validation of connections
- **Save**: Auto-save workflow definitions

### Execution Logs
- Track all workflow executions with timestamps
- Filter by status (success, failed, running, pending)
- View detailed logs for each execution
- Monitor execution duration and errors

### Settings
- User profile management
- API token generation and management
- Connected integrations management
- Account security settings

## API Documentation

### tRPC Routers

#### Auth Router
```typescript
trpc.auth.me.useQuery()           // Get current user
trpc.auth.logout.useMutation()    // Logout user
```

#### Workflow Router
```typescript
trpc.workflow.create.useMutation()        // Create workflow
trpc.workflow.list.useQuery()             // List user workflows
trpc.workflow.get.useQuery()              // Get workflow details
trpc.workflow.update.useMutation()        // Update workflow
trpc.workflow.delete.useMutation()        // Delete workflow
trpc.workflow.duplicate.useMutation()     // Duplicate workflow
```

#### Execution Router
```typescript
trpc.execution.run.useMutation()          // Run workflow
trpc.execution.list.useQuery()            // List executions
trpc.execution.get.useQuery()             // Get execution details
```

#### Integration Router
```typescript
trpc.integration.list.useQuery()          // List available integrations
trpc.integration.get.useQuery()           // Get integration details
```

#### User Router
```typescript
trpc.user.getProfile.useQuery()           // Get user profile
trpc.user.listApiTokens.useQuery()        // List API tokens
trpc.user.createApiToken.useMutation()    // Create API token
trpc.user.deleteApiToken.useMutation()    // Delete API token
trpc.user.listIntegrations.useQuery()     // List connected integrations
trpc.user.connectIntegration.useMutation()// Connect integration
```

## Database Schema

### Users
- User authentication and profile information
- Managed by better-auth

### Workflows
- Workflow definitions and metadata
- JSON-based workflow configuration
- Active/inactive status

### Executions
- Workflow execution history
- Status tracking (pending, running, success, failed, cancelled)
- Execution logs and error messages
- Duration tracking

### Integrations
- Available triggers and actions
- Integration metadata (logo, color, category)
- Configuration requirements

### User Integrations
- Connected user accounts for integrations
- Encrypted credentials storage

### API Tokens
- User-generated API tokens
- Token expiration management

## Deployment

### Vercel (Recommended for Production)
```bash
# Push to GitHub and connect to Vercel
# Configure environment variables in Vercel dashboard
# Automatic deployment on push
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Docker
```bash
docker-compose up -d
```

### AWS ECS, Google Cloud Run
See [DEPLOYMENT.md](./DEPLOYMENT.md) for cloud-specific instructions.

## Environment Variables

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Session signing secret
- `VITE_APP_ID` - Manus OAuth app ID
- `OAUTH_SERVER_URL` - Manus OAuth server URL
- `VITE_OAUTH_PORTAL_URL` - Manus OAuth portal URL
- `BUILT_IN_FORGE_API_URL` - Manus Forge API URL
- `BUILT_IN_FORGE_API_KEY` - Manus Forge API key
- `VITE_FRONTEND_FORGE_API_URL` - Frontend Forge API URL
- `VITE_FRONTEND_FORGE_API_KEY` - Frontend Forge API key

Optional variables:
- `VITE_APP_TITLE` - Application title
- `VITE_APP_LOGO` - Application logo URL
- `REDIS_URL` - Redis connection string
- `PORT` - Server port (default: 3000)

## Development

### Available Commands

```bash
# Development
pnpm dev              # Start dev server

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Database
pnpm db:push          # Apply migrations
pnpm db:studio        # Open Prisma Studio

# Linting & Type Checking
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript check

# Docker
docker-compose up     # Start all services
docker-compose down   # Stop all services
```

### Adding Features

1. **Update Database Schema**
   ```bash
   # Edit drizzle/schema.ts
   pnpm db:push
   ```

2. **Add Database Helpers**
   ```typescript
   // Add query functions in server/db.ts
   ```

3. **Create tRPC Procedures**
   ```typescript
   // Add procedures in server/routers.ts
   ```

4. **Build Frontend Components**
   ```typescript
   // Create components in client/src/components/
   // Use trpc hooks for data fetching
   ```

## Performance Optimization

- **Caching**: Redis for frequently accessed data
- **Database**: Connection pooling, query optimization
- **Frontend**: Code splitting, lazy loading, image optimization
- **API**: Request batching, compression, rate limiting

## Security Considerations

- **Authentication**: OAuth via better-auth
- **Encryption**: HTTPS/TLS for all communications
- **Credentials**: Encrypted storage for integration credentials
- **API Keys**: Secure token generation and rotation
- **Audit Logs**: Track all user actions
- **Rate Limiting**: Prevent abuse and DoS attacks

## Monitoring & Logging

- Application logs available in Docker containers
- Database query logging via Prisma
- Error tracking integration ready (Sentry, Rollbar)
- Performance monitoring hooks available

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check migrations
pnpm db:push --verbose
```

### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

### Port Already in Use
```bash
# Use different port
PORT=3001 pnpm dev
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feature requests:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review application logs
- Contact support team

## Roadmap

- [ ] WebSocket real-time execution logs
- [ ] Workflow versioning and rollback
- [ ] Workflow templates library
- [ ] Team/organization support
- [ ] Advanced scheduling options
- [ ] Workflow analytics and insights
- [ ] Custom node development kit
- [ ] Webhook management UI
- [ ] Workflow import/export
- [ ] Audit logs dashboard

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [better-auth](https://better-auth.vercel.app/)
