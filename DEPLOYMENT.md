# Deployment Guide for {s}ee Dashboard

This guide covers deployment strategies and configurations for the {s}ee Dashboard across different environments.

## 🎯 Overview

{s}ee Dashboard is a static React application that can be deployed to various platforms. This guide covers production deployment best practices and configuration options.

## 📋 Prerequisites

-   Node.js (version 18 or higher)
-   npm or yarn
-   Git
-   Access to your chosen deployment platform
-   Supabase account and project

## 🗄️ Supabase Configuration

### Setting Up Supabase

1. **Create a Supabase Project**

    - Visit [supabase.com](https://supabase.com) and sign in
    - Create a new project and note your project URL and API keys
    - Current project: `htykqrmczqockvmrsfui`

2. **Configure Environment Variables**

    For local development:

    ```bash
    # .env.local
    VITE_SUPABASE_URL=https://htykqrmczqockvmrsfui.supabase.co
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

    For CI/CD pipelines, add these as secrets in your deployment platform.

3. **Database Schema Setup**

    ```sql
    -- Example schema (to be expanded)
    CREATE TABLE financial_metrics (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      project_id UUID NOT NULL,
      metric_name TEXT NOT NULL,
      metric_value NUMERIC NOT NULL,
      date_recorded TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_by UUID REFERENCES auth.users(id)
    );

    -- Add row-level security policies
    ALTER TABLE financial_metrics ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can view their own data" ON financial_metrics
      FOR SELECT USING (auth.uid() = created_by);

    CREATE POLICY "Users can insert their own data" ON financial_metrics
      FOR INSERT WITH CHECK (auth.uid() = created_by);
    ```

4. **Linking Local CLI**

    ```bash
    npm run supabase:link
    ```

## 🏗️ Build Process

### Production Build

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Preview build locally (optional)
npm run preview
```

The build process creates optimized files in the `build/` directory:

```
build/
├── assets/
│   ├── index-[hash].js      # Main application bundle
│   ├── index-[hash].css     # Compiled styles
│   └── [various assets]     # Images, fonts, etc.
├── index.html               # Main HTML file
└── [static files]           # Public assets
```

### Build Optimization

The production build includes:

-   **Code Splitting**: Automatic route-based splitting
-   **Tree Shaking**: Eliminates unused code
-   **Minification**: Compressed JavaScript and CSS
-   **Asset Optimization**: Compressed images and fonts
-   **Modern Bundle**: ES6+ for modern browsers

## 🌐 Deployment Platforms

### Vercel (Recommended)

Vercel provides excellent React support with automatic deployments:

#### Setup via Git Integration

1. **Connect Repository**

    ```bash
    # Push your code to GitHub/GitLab/Bitbucket
    git push origin main
    ```

2. **Import Project**

    - Visit [vercel.com](https://vercel.com)
    - Click "New Project"
    - Import your repository

3. **Configure Build Settings**
    ```json
    {
        "buildCommand": "npm run build",
        "outputDirectory": "build",
        "installCommand": "npm install",
        "devCommand": "npm run dev"
    }
    ```

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify

Netlify offers great static site hosting with powerful features:

#### Git Integration

1. **Connect Repository**

    - Visit [netlify.com](https://netlify.com)
    - "New site from Git"
    - Choose your repository

2. **Build Settings**
    ```
    Build command: npm run build
    Publish directory: build
    ```

#### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

### GitHub Pages

For free hosting with GitHub Pages:

#### Setup

1. **Install gh-pages**

    ```bash
    npm install --save-dev gh-pages
    ```

2. **Update package.json**

    ```json
    {
        "homepage": "https://yourusername.github.io/see_dashboard1",
        "scripts": {
            "predeploy": "npm run build",
            "deploy": "gh-pages -d build"
        }
    }
    ```

3. **Deploy**
    ```bash
    npm run deploy
    ```

### AWS S3 + CloudFront

For enterprise-grade hosting:

#### S3 Bucket Setup

```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Configure for static website hosting
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html

# Upload build files
npm run build
aws s3 sync build/ s3://your-bucket-name --delete
```

#### CloudFront Distribution

```json
{
    "Origins": [
        {
            "DomainName": "your-bucket-name.s3.amazonaws.com",
            "Id": "S3-your-bucket-name",
            "S3OriginConfig": {
                "OriginAccessIdentity": ""
            }
        }
    ],
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-your-bucket-name",
        "ViewerProtocolPolicy": "redirect-to-https",
        "Compress": true
    },
    "CustomErrorResponses": [
        {
            "ErrorCode": 404,
            "ResponseCode": 200,
            "ResponsePagePath": "/index.html"
        }
    ]
}
```

### Docker Deployment

For containerized deployments:

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### Build and Run

```bash
# Build Docker image
docker build -t see-dashboard .

# Run container
docker run -p 3000:80 see-dashboard
```

## 🔄 Environment-Specific Configuration

### Development

```bash
# Use local environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Staging

Staging environment should use a separate Supabase project or schema to prevent data corruption in production.

```bash
# Environment variables for staging
VITE_SUPABASE_URL=https://staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=staging_anon_key
```

### Production

Production deployments should use secure environment variable configuration and proper database schema management.

```bash
# Environment variables for production
VITE_SUPABASE_URL=https://htykqrmczqockvmrsfui.supabase.co
VITE_SUPABASE_ANON_KEY=production_anon_key
```

## 🔒 Security Configuration

### HTTPS Setup

Always use HTTPS in production:

```javascript
// Redirect HTTP to HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace(
        `https:${location.href.substring(location.protocol.length)}`,
    )
}
```

### Content Security Policy

Add CSP headers for security:

```html
<meta
    http-equiv="Content-Security-Policy"
    content="
  default-src 'self';
  script-src 'self' 'unsafe-eval' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.yourdomain.com;
"
/>
```

### Security Headers

```nginx
# Additional security headers
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()";
```

## 📊 Performance Optimization

### Caching Strategy

```nginx
# Cache static assets aggressively
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary "Accept-Encoding";
}

# Cache HTML with shorter duration
location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### Compression

```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;
```

### CDN Configuration

For global performance, use a CDN:

```javascript
// webpack.config.js (if ejected)
module.exports = {
    output: {
        publicPath:
            process.env.NODE_ENV === 'production'
                ? 'https://cdn.yourdomain.com/'
                : '/',
    },
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
    push:
        branches: [main]

jobs:
    deploy:
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: '18'
                  cache: 'npm'

            - name: Install dependencies
              run: npm ci

            - name: Run tests
              run: npm test -- --coverage --watchAll=false

            - name: Build application
              run: npm run build

            - name: Deploy to Vercel
              uses: amondnet/vercel-action@v25
              with:
                  vercel-token: ${{ secrets.VERCEL_TOKEN }}
                  vercel-org-id: ${{ secrets.ORG_ID }}
                  vercel-project-id: ${{ secrets.PROJECT_ID }}
                  vercel-args: '--prod'
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
    - test
    - build
    - deploy

variables:
    NODE_VERSION: '18'

cache:
    paths:
        - node_modules/

test:
    stage: test
    image: node:${NODE_VERSION}
    script:
        - npm ci
        - npm run lint
        - npm test -- --coverage --watchAll=false

build:
    stage: build
    image: node:${NODE_VERSION}
    script:
        - npm ci
        - npm run build
    artifacts:
        paths:
            - build/
        expire_in: 1 hour

deploy:
    stage: deploy
    image: alpine:latest
    script:
        - apk add --no-cache curl
        - curl -X POST "https://api.netlify.com/build_hooks/$NETLIFY_BUILD_HOOK"
    only:
        - main
```

## 🚨 Monitoring and Logging

### Error Tracking with Sentry

```javascript
// src/utils/sentry.js
import * as Sentry from '@sentry/react'

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_ENV,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
})
```

### Analytics Integration

```javascript
// src/utils/analytics.js
import { gtag } from 'ga-gtag'

export const trackPageView = (path) => {
    gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_path: path,
    })
}

export const trackEvent = (action, category, label) => {
    gtag('event', action, {
        event_category: category,
        event_label: label,
    })
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Routing Issues (404 on Refresh)

**Problem**: Direct URL access returns 404
**Solution**: Configure server to serve `index.html` for all routes

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### 2. Build Size Too Large

**Problem**: Bundle size exceeds platform limits
**Solution**: Implement code splitting

```javascript
// Use dynamic imports
const Component = lazy(() => import('./Component'))
```

#### 3. Environment Variables Not Working

**Problem**: Variables not available in production
**Solution**: Ensure variables start with `REACT_APP_`

```bash
# Correct
REACT_APP_API_URL=https://api.example.com

# Incorrect
API_URL=https://api.example.com
```

### Performance Debugging

```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 📝 Deployment Checklist

Before deploying to production:

-   [ ] All environment variables configured
-   [ ] HTTPS enabled and configured
-   [ ] Security headers implemented
-   [ ] Caching strategy configured
-   [ ] Error tracking setup (Sentry)
-   [ ] Analytics tracking configured
-   [ ] Performance monitoring enabled
-   [ ] Backup strategy in place
-   [ ] Domain and DNS configured
-   [ ] SSL certificate valid
-   [ ] CI/CD pipeline tested
-   [ ] Staging environment validated

---

This deployment guide ensures your {s}ee Dashboard is properly configured for production use with optimal performance and security.
