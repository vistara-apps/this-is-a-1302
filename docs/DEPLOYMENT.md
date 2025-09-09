# SampleSecure Deployment Guide

This guide covers deploying SampleSecure to production environments.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_APP_URL=https://your-domain.vercel.app
   VITE_APP_NAME=SampleSecure
   VITE_APP_VERSION=1.0.0
   VITE_ENABLE_AUDIO_ANALYSIS=true
   VITE_ENABLE_PAYMENTS=true
   VITE_ENABLE_BLOCKCHAIN=false
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-project.vercel.app`

### Option 2: Netlify

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**
   - Add the same environment variables as listed above

### Option 3: Docker

1. **Build Docker Image**
   ```bash
   docker build -t samplesecure .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e VITE_SUPABASE_URL=your_supabase_url \
     -e VITE_SUPABASE_ANON_KEY=your_supabase_key \
     -e VITE_OPENAI_API_KEY=your_openai_key \
     -e VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key \
     samplesecure
   ```

## 🗄️ Database Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization and region
4. Set a strong database password
5. Wait for project creation (2-3 minutes)

### 2. Run Database Schema

1. Go to your project's SQL Editor
2. Copy and paste the contents of `docs/database-setup.sql`
3. Click "Run" to execute the schema
4. Verify tables are created in the Table Editor

### 3. Configure Storage

1. Go to Storage in your Supabase dashboard
2. The `audio-samples` bucket should be created automatically
3. Verify the bucket policies are in place

### 4. Set Up Authentication

1. Go to Authentication > Settings
2. Configure your site URL: `https://your-domain.com`
3. Add redirect URLs for password reset: `https://your-domain.com/reset-password`
4. Enable email confirmations if desired

## 🔑 API Keys Setup

### OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new secret key
5. Add to your environment variables as `VITE_OPENAI_API_KEY`

**Important**: In production, OpenAI API calls should be made server-side for security. Consider implementing a backend API route.

### Stripe Setup

1. **Create Stripe Account**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Complete account setup and verification

2. **Create Products and Prices**
   ```bash
   # Creator Plan
   stripe products create --name="Creator Plan" --description="50 searches, 10 clearances per month"
   stripe prices create --product=prod_xxx --unit-amount=1500 --currency=usd --recurring[interval]=month

   # Pro Plan  
   stripe products create --name="Pro Plan" --description="Unlimited searches and clearances"
   stripe prices create --product=prod_xxx --unit-amount=4900 --currency=usd --recurring[interval]=month
   ```

3. **Update Price IDs**
   - Update the `priceId` values in `src/services/stripe.js`
   - Replace `price_creator_monthly` and `price_pro_monthly` with actual Stripe price IDs

4. **Configure Webhooks**
   - Add webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook signing secret for backend use

## 🔒 Security Configuration

### Environment Variables Security

- Never commit `.env` files to version control
- Use your hosting platform's environment variable settings
- Rotate API keys regularly
- Use different keys for development and production

### Supabase Security

1. **Row Level Security (RLS)**
   - Verify RLS is enabled on all tables
   - Test policies with different user accounts
   - Monitor auth logs for suspicious activity

2. **API Keys**
   - Use the anon key for client-side operations
   - Keep the service role key secure and server-side only
   - Enable API key restrictions if available

### Content Security Policy

Add CSP headers to your hosting platform:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.openai.com https://api.stripe.com;
```

## 📊 Monitoring & Analytics

### Error Monitoring

1. **Sentry Integration** (Recommended)
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

   Add to your `main.jsx`:
   ```javascript
   import * as Sentry from "@sentry/react";

   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
     environment: import.meta.env.MODE,
   });
   ```

2. **Update Error Handler**
   - Modify `src/services/errorHandler.js` to send errors to Sentry
   - Set up alerts for critical errors

### Performance Monitoring

1. **Web Vitals**
   ```bash
   npm install web-vitals
   ```

2. **Analytics**
   - Google Analytics 4
   - Mixpanel for user behavior
   - Supabase Analytics for database insights

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
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
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
        VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🧪 Testing in Production

### Health Checks

1. **Authentication Flow**
   - Sign up with new email
   - Verify email confirmation
   - Sign in and out
   - Password reset flow

2. **Core Features**
   - Upload audio file
   - Sample identification
   - Clearance request generation
   - Project management

3. **Payment Flow**
   - Subscription upgrade
   - Payment processing
   - Webhook handling
   - Customer portal access

### Load Testing

Use tools like:
- **Artillery.io** for API load testing
- **Lighthouse** for performance auditing
- **WebPageTest** for real-world performance

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Loading**
   - Verify variable names start with `VITE_`
   - Check hosting platform environment settings
   - Restart deployment after adding variables

3. **Supabase Connection Issues**
   - Verify URL and anon key are correct
   - Check if project is paused (free tier limitation)
   - Verify RLS policies allow access

4. **Stripe Integration Issues**
   - Verify publishable key (starts with `pk_`)
   - Check webhook endpoint is accessible
   - Verify price IDs match your Stripe products

### Debug Mode

Enable debug logging in production:

```javascript
// Add to main.jsx
if (import.meta.env.VITE_DEBUG === 'true') {
  window.DEBUG = true;
}
```

## 📈 Scaling Considerations

### Performance Optimization

1. **Code Splitting**
   ```javascript
   // Lazy load pages
   const Dashboard = lazy(() => import('./pages/Dashboard'))
   ```

2. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - CDN for static assets

3. **Database Optimization**
   - Add indexes for frequently queried columns
   - Use database functions for complex queries
   - Implement caching for static data

### Infrastructure Scaling

1. **CDN Setup**
   - Cloudflare for global distribution
   - Cache static assets
   - DDoS protection

2. **Database Scaling**
   - Supabase Pro for better performance
   - Read replicas for heavy read workloads
   - Connection pooling

3. **API Rate Limiting**
   - Implement rate limiting for OpenAI calls
   - Queue system for heavy processing
   - Caching for repeated requests

## 🔐 Backup & Recovery

### Database Backups

1. **Automated Backups**
   - Supabase Pro includes daily backups
   - Set up additional backup schedule if needed

2. **Manual Backups**
   ```bash
   # Export data
   pg_dump -h your-supabase-host -U postgres -d postgres > backup.sql
   ```

### Disaster Recovery

1. **Environment Recreation**
   - Document all environment variables
   - Keep infrastructure as code
   - Test recovery procedures regularly

2. **Data Recovery**
   - Test backup restoration
   - Document recovery procedures
   - Set up monitoring for data integrity

## 📞 Support & Maintenance

### Monitoring Checklist

- [ ] Application uptime monitoring
- [ ] Database performance monitoring
- [ ] Error rate tracking
- [ ] API usage monitoring
- [ ] Security vulnerability scanning

### Regular Maintenance

- [ ] Update dependencies monthly
- [ ] Review and rotate API keys quarterly
- [ ] Audit user permissions
- [ ] Review and optimize database queries
- [ ] Update documentation

### Support Channels

- **Documentation**: Keep this guide updated
- **Issue Tracking**: Use GitHub Issues
- **User Support**: Set up support email
- **Status Page**: Consider status page for outages

---

**Need Help?** Check the [API Documentation](API.md) or create an issue in the repository.
