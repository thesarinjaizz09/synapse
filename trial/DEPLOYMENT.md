# Deployment Guide

This guide covers deploying the Workflow Automation Platform to various environments.

## Prerequisites

- Node.js 22+ and pnpm
- PostgreSQL 14+ (for production)
- Docker & Docker Compose (for containerized deployment)
- Manus OAuth credentials (VITE_APP_ID, OAUTH_SERVER_URL, etc.)

## Local Development

### Setup

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Docker Deployment

### Using Docker Compose (Recommended for local/staging)

```bash
# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start all services (PostgreSQL, Redis, App)
docker-compose up -d

# Run migrations
docker-compose exec app pnpm db:push

# View logs
docker-compose logs -f app
```

**Services:**
- App: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Standalone Docker Image

```bash
# Build image
docker build -t workflow-platform:latest .

# Run container
docker run -d \
  --name workflow-platform \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:password@db:5432/workflow" \
  -e JWT_SECRET="your-secret-key" \
  -e VITE_APP_ID="your-app-id" \
  -e OAUTH_SERVER_URL="https://api.manus.im" \
  -e VITE_OAUTH_PORTAL_URL="https://portal.manus.im" \
  -e BUILT_IN_FORGE_API_URL="https://api.manus.im/forge" \
  -e BUILT_IN_FORGE_API_KEY="your-key" \
  -e VITE_FRONTEND_FORGE_API_URL="https://api.manus.im/forge" \
  -e VITE_FRONTEND_FORGE_API_KEY="your-key" \
  workflow-platform:latest
```

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository with the code

### Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all required variables from `.env.example`:
     - `DATABASE_URL` (PostgreSQL connection string)
     - `JWT_SECRET` (generate a secure random string)
     - `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`
     - `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`
     - `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY`

3. **Database Setup**
   - Use a managed PostgreSQL service (Vercel Postgres, AWS RDS, etc.)
   - Set `DATABASE_URL` to your PostgreSQL connection string

4. **Deploy**
   - Vercel automatically deploys on push to main branch
   - Monitor deployment in Vercel dashboard

5. **Run Migrations**
   ```bash
   vercel env pull  # Pull environment variables
   pnpm db:push    # Run migrations
   ```

### Production Checklist
- [ ] Database backups enabled
- [ ] SSL certificates configured
- [ ] Environment variables secured
- [ ] Monitoring and logging setup
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring

## AWS ECS Deployment

### Prerequisites
- AWS account with ECS access
- ECR repository created
- RDS PostgreSQL instance

### Steps

1. **Build and Push Docker Image**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   
   docker build -t workflow-platform:latest .
   docker tag workflow-platform:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/workflow-platform:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/workflow-platform:latest
   ```

2. **Create ECS Task Definition**
   - Container image: Your ECR image URI
   - Port mappings: 3000:3000
   - Environment variables: Configure all required env vars
   - Memory: 1024 MB, CPU: 512

3. **Create ECS Service**
   - Launch type: EC2 or Fargate
   - Number of tasks: 2+ for high availability
   - Load balancer: Application Load Balancer

4. **Configure RDS**
   - PostgreSQL 14+
   - Multi-AZ for production
   - Automated backups enabled

## Google Cloud Run Deployment

### Steps

1. **Build and Push Image**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/workflow-platform
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy workflow-platform \
     --image gcr.io/PROJECT_ID/workflow-platform \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars DATABASE_URL=<your-db-url>,JWT_SECRET=<secret>,... \
     --memory 1Gi \
     --cpu 1
   ```

3. **Configure Cloud SQL**
   - Create PostgreSQL instance
   - Update DATABASE_URL in Cloud Run environment

## Production Best Practices

### Security
- Use strong JWT_SECRET (generate with `openssl rand -base64 32`)
- Enable HTTPS/SSL
- Use environment-specific secrets
- Rotate API keys regularly
- Enable database encryption at rest

### Performance
- Enable Redis caching
- Configure CDN for static assets
- Use connection pooling for database
- Implement rate limiting
- Monitor and optimize slow queries

### Monitoring
- Set up application logging (CloudWatch, Stackdriver, etc.)
- Configure error tracking (Sentry, Rollbar)
- Monitor database performance
- Set up alerts for critical issues
- Track API response times

### Scaling
- Use horizontal scaling (multiple instances)
- Configure auto-scaling based on CPU/memory
- Use load balancing
- Implement caching strategies
- Optimize database queries

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check migrations
pnpm db:push --verbose
```

### Application Won't Start
```bash
# Check logs
docker-compose logs app

# Verify environment variables
docker-compose exec app env | grep DATABASE_URL
```

### Performance Issues
- Check database query performance
- Monitor memory usage
- Review application logs
- Verify Redis connectivity
- Check network latency

## Rollback Procedure

1. **Vercel**: Use deployment history to rollback
2. **Docker**: Revert to previous image tag
3. **ECS**: Update task definition to previous version
4. **Cloud Run**: Deploy previous image version

## Support

For issues or questions:
- Check application logs
- Review error messages
- Consult Manus documentation
- Contact support team
