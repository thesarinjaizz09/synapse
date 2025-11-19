# Workflow Automation Platform - TODO

## Core Infrastructure
- [x] Initialize monorepo with Next.js, tRPC, Prisma, better-auth
- [x] Configure database schema (User, Workflow, Execution, Integration)
- [x] Set up Prisma migrations
- [x] Implement authentication (better-auth with OAuth providers)
- [x] Create tRPC routers (auth, workflow, execution, integration, user)

## Frontend - Authentication UI
- [x] Sign in/up page (Email, Google, GitHub) - via better-auth
- [x] Auth-protected dashboard & builder routes
- [x] User profile settings page
- [x] API tokens management UI
- [x] Integration management UI

## Frontend - Dashboard
- [x] Dashboard layout with workflow cards/grid
- [x] "Create Workflow," "Import," "Run History" buttons
- [x] Stats panel (total runs, success rate, last run time)
- [x] Workflow list with search/filter
- [x] Quick actions (edit, run, delete, duplicate)

## Frontend - Workflow Builder
- [x] Drag-and-drop canvas (basic implementation)
- [x] Node types (Trigger, Action)
- [x] Connectors between nodes with draggable edges
- [x] Live validation of node connections
- [x] Sidebar with trigger and action nodes
- [x] Inspector panel for node configuration
- [ ] Input/output test preview
- [x] Save/publish workflow

## Frontend - Execution Logs
- [x] Execution logs table (runs, timestamps, status, duration)
- [ ] Real-time logs via WebSocket
- [x] Filter by success/failure/date range
- [ ] Detailed execution view with node-by-node logs

## Backend - Workflow Engine
- [ ] JSON-based workflow schema definition
- [ ] Topological sort for execution order
- [ ] Async action execution
- [ ] Error handling and retry logic
- [ ] Timeout management

## Backend - Trigger & Action System
- [ ] Pluggable architecture for integrations
- [ ] Webhook trigger implementation
- [ ] HTTP Request node
- [ ] Email sender node
- [ ] Google Sheets (read/write)
- [ ] Slack/Discord message sender
- [ ] Integration metadata (logo, color, category)

## Backend - tRPC Routers
- [ ] authRouter (user management, sessions)
- [ ] workflowRouter (CRUD workflows, duplicate, delete)
- [ ] executionRouter (run workflows, fetch logs)
- [ ] integrationRouter (list available triggers/actions)
- [ ] userRouter (manage API tokens, connected services)

## Backend - Database & Migrations
- [ ] User table with auth fields
- [ ] Workflow table with definition storage
- [ ] Execution table with logs
- [ ] Integration table with metadata
- [ ] Session/token tables for auth

## Deployment & DevOps
- [ ] Docker configuration (Dockerfile, docker-compose)
- [ ] Environment variables setup
- [ ] Vercel deployment configuration
- [ ] Database connection pooling
- [ ] Health check endpoints

## Optional Features
- [ ] WebSocket for real-time log streaming
- [ ] Workflow versioning
- [ ] Workflow templates
- [ ] Team/organization support
- [ ] Webhook integrations
- [ ] Scheduled workflows

## Testing & Documentation
- [ ] API documentation
- [ ] User guide
- [ ] Deployment guide
- [ ] Development setup guide
