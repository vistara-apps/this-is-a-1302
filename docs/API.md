# SampleSecure API Documentation

## Overview

SampleSecure provides a comprehensive API for managing music sample identification, clearance requests, and rights holder information. The API is built using modern web technologies and integrates with several third-party services.

## Architecture

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API
- **Routing**: React Router v6

### Backend Services
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **AI Processing**: OpenAI GPT-4
- **Payments**: Stripe

## Authentication

All API requests require authentication using Supabase JWT tokens.

### Sign Up
```javascript
import { supabase } from './services/supabase'

const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword'
})
```

### Sign In
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
})
```

### Sign Out
```javascript
const { error } = await supabase.auth.signOut()
```

## Data Models

### User
```typescript
interface User {
  userId: string (UUID)
  email: string
  subscriptionTier: 'free' | 'creator' | 'pro'
  createdAt: string (ISO 8601)
  updatedAt: string (ISO 8601)
}
```

### Project
```typescript
interface Project {
  projectId: string (UUID)
  userId: string (UUID)
  projectName: string
  createdAt: string (ISO 8601)
  updatedAt: string (ISO 8601)
}
```

### Sample
```typescript
interface Sample {
  sampleId: string (UUID)
  projectId: string (UUID)
  audioFileUrl: string
  identifiedSongTitle: string
  originalArtist: string
  rightsHolderName: string
  rightsHolderContact: string
  clearanceStatus: 'pending' | 'approved' | 'rejected' | 'negotiating'
  clearanceRequestId: string (UUID)
  createdAt: string (ISO 8601)
  updatedAt: string (ISO 8601)
}
```

### RightsHolder
```typescript
interface RightsHolder {
  rightsHolderId: string (UUID)
  name: string
  contactEmail: string
  contactPhone: string
  address: string
  website: string
}
```

### ClearanceRequest
```typescript
interface ClearanceRequest {
  clearanceRequestId: string (UUID)
  sampleId: string (UUID)
  requestDate: string (ISO 8601)
  submissionStatus: 'draft' | 'submitted' | 'responded'
  responseStatus: 'pending' | 'approved' | 'rejected' | 'negotiating'
  termsOffered: string
  agreementUrl: string
  createdAt: string (ISO 8601)
  updatedAt: string (ISO 8601)
}
```

## API Endpoints

### Projects

#### Get User Projects
```javascript
import { supabaseService } from './services/supabase'

const projects = await supabaseService.getProjects(userId)
```

#### Create Project
```javascript
const project = await supabaseService.createProject({
  userId: 'user-uuid',
  projectName: 'My New Project'
})
```

#### Update Project
```javascript
const updatedProject = await supabaseService.updateProject(projectId, {
  projectName: 'Updated Project Name'
})
```

#### Delete Project
```javascript
await supabaseService.deleteProject(projectId)
```

### Samples

#### Get Project Samples
```javascript
const samples = await supabaseService.getSamples(projectId)
```

#### Create Sample
```javascript
const sample = await supabaseService.createSample({
  projectId: 'project-uuid',
  audioFileUrl: 'https://storage.url/audio.mp3',
  identifiedSongTitle: 'Original Song',
  originalArtist: 'Artist Name',
  rightsHolderName: 'Rights Holder',
  clearanceStatus: 'pending'
})
```

#### Update Sample
```javascript
const updatedSample = await supabaseService.updateSample(sampleId, {
  clearanceStatus: 'approved'
})
```

#### Delete Sample
```javascript
await supabaseService.deleteSample(sampleId)
```

### Rights Holders

#### Get All Rights Holders
```javascript
const rightsHolders = await supabaseService.getRightsHolders()
```

#### Create Rights Holder
```javascript
const rightsHolder = await supabaseService.createRightsHolder({
  name: 'Universal Music Group',
  contactEmail: 'clearances@umg.com',
  contactPhone: '+1-555-0123',
  address: '2220 Colorado Avenue, Santa Monica, CA 90404',
  website: 'https://www.universalmusic.com'
})
```

#### Update Rights Holder
```javascript
const updatedRightsHolder = await supabaseService.updateRightsHolder(rightsHolderId, {
  contactEmail: 'new-email@umg.com'
})
```

### Clearance Requests

#### Get User Clearance Requests
```javascript
const requests = await supabaseService.getClearanceRequests(userId)
```

#### Create Clearance Request
```javascript
const request = await supabaseService.createClearanceRequest({
  sampleId: 'sample-uuid',
  requestDate: new Date().toISOString(),
  submissionStatus: 'draft',
  responseStatus: 'pending',
  termsOffered: '$500 upfront + 5% royalties'
})
```

#### Update Clearance Request
```javascript
const updatedRequest = await supabaseService.updateClearanceRequest(requestId, {
  submissionStatus: 'submitted',
  responseStatus: 'approved'
})
```

### File Upload

#### Upload Audio File
```javascript
const file = document.getElementById('audio-input').files[0]
const path = `samples/${userId}/${Date.now()}-${file.name}`

const { publicUrl } = await supabaseService.uploadAudioFile(file, path)
```

#### Delete Audio File
```javascript
await supabaseService.deleteAudioFile(filePath)
```

## AI Services

### Sample Identification

#### Identify Sample from Audio
```javascript
import { openaiService } from './services/openai'

const audioFile = document.getElementById('audio-input').files[0]
const description = 'Hip-hop drum break sample'

const result = await openaiService.identifySample(audioFile, description)
// Returns: { identifiedSongs: [...], audioAnalysis: {...} }
```

#### Generate Clearance Request
```javascript
const sampleInfo = {
  originalSong: 'Amen, Brother',
  originalArtist: 'The Winstons',
  sampleType: 'drum break',
  duration: '7 seconds',
  projectName: 'My Hip-Hop Track'
}

const userInfo = {
  name: 'John Producer',
  email: 'john@example.com'
}

const requestText = await openaiService.generateClearanceRequest(sampleInfo, userInfo)
```

#### Analyze Clearance Request
```javascript
const requestText = "Dear Rights Holder, I am writing to request..."
const analysis = await openaiService.analyzeClearanceRequest(requestText)
// Returns: { score: 85, suggestions: [...], improvements: [...] }
```

## Payment Services

### Subscription Management

#### Get Subscription Tiers
```javascript
import { SUBSCRIPTION_TIERS } from './services/stripe'

const tiers = Object.values(SUBSCRIPTION_TIERS)
```

#### Redirect to Checkout
```javascript
import { stripeService } from './services/stripe'

await stripeService.redirectToCheckout('price_creator_monthly', customerId)
```

#### Check Usage Limits
```javascript
const canCreateSample = stripeService.canPerformAction(user, 'samples', currentSampleCount)
const limits = stripeService.getUsageLimits(user)
```

#### Access Customer Portal
```javascript
await stripeService.redirectToPortal(customerId)
```

## Error Handling

### Using Error Handler Service
```javascript
import { useErrorHandler } from './services/errorHandler'

const { handleError, showError } = useErrorHandler()

try {
  await someApiCall()
} catch (error) {
  const processedError = handleError(error, { 
    component: 'SampleUpload',
    action: 'uploadFile'
  })
  
  // Show user-friendly error message
  showError(processedError)
}
```

### Error Types
- `NETWORK`: Connection or network-related errors
- `AUTHENTICATION`: Authentication failures
- `AUTHORIZATION`: Permission-related errors
- `VALIDATION`: Input validation errors
- `PAYMENT`: Payment processing errors
- `UPLOAD`: File upload errors
- `API`: Third-party API errors
- `UNKNOWN`: Unclassified errors

## Rate Limits

### Subscription-Based Limits

#### Free Tier
- 3 sample searches per month
- 1 clearance request per month
- 1 project maximum

#### Creator Tier ($15/month)
- 50 sample searches per month
- 10 clearance requests per month
- 5 projects maximum

#### Pro Tier ($49/month)
- Unlimited sample searches
- Unlimited clearance requests
- Unlimited projects

## Webhooks

### Stripe Webhooks
Handle subscription events from Stripe:

```javascript
// Backend webhook handler example
app.post('/api/webhooks/stripe', (req, res) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  try {
    const event = stripeService.validateWebhook(req.body, sig, endpointSecret)
    
    switch (event.type) {
      case 'customer.subscription.created':
        // Handle new subscription
        break
      case 'customer.subscription.updated':
        // Handle subscription changes
        break
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        break
    }
    
    res.json({ received: true })
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`)
  }
})
```

## Database Schema

### Supabase Tables

#### Users Table
```sql
CREATE TABLE users (
  userId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscriptionTier TEXT DEFAULT 'free',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Projects Table
```sql
CREATE TABLE projects (
  projectId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID REFERENCES users(userId) ON DELETE CASCADE,
  projectName TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Samples Table
```sql
CREATE TABLE samples (
  sampleId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projectId UUID REFERENCES projects(projectId) ON DELETE CASCADE,
  audioFileUrl TEXT,
  identifiedSongTitle TEXT,
  originalArtist TEXT,
  rightsHolderName TEXT,
  rightsHolderContact TEXT,
  clearanceStatus TEXT DEFAULT 'pending',
  clearanceRequestId UUID,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Rights Holders Table
```sql
CREATE TABLE rightsHolders (
  rightsHolderId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contactEmail TEXT,
  contactPhone TEXT,
  address TEXT,
  website TEXT
);
```

#### Clearance Requests Table
```sql
CREATE TABLE clearanceRequests (
  clearanceRequestId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sampleId UUID REFERENCES samples(sampleId) ON DELETE CASCADE,
  requestDate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submissionStatus TEXT DEFAULT 'draft',
  responseStatus TEXT DEFAULT 'pending',
  termsOffered TEXT,
  agreementUrl TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Buckets

#### Audio Samples Bucket
```sql
-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('audio-samples', 'audio-samples', true);

-- Set up RLS policies
CREATE POLICY "Users can upload their own audio files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'audio-samples' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own audio files" ON storage.objects
  FOR SELECT USING (bucket_id = 'audio-samples' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Environment Variables

### Required Environment Variables
```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
VITE_OPENAI_API_KEY=your_openai_api_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=SampleSecure
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_AUDIO_ANALYSIS=true
VITE_ENABLE_PAYMENTS=true
VITE_ENABLE_BLOCKCHAIN=false
```

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your API keys
4. Set up Supabase database with the provided schema
5. Configure Stripe products and prices
6. Run development server: `npm run dev`

## Production Deployment

1. Build the application: `npm run build`
2. Deploy to your hosting platform (Vercel, Netlify, etc.)
3. Set up environment variables in production
4. Configure Stripe webhooks
5. Set up error monitoring (Sentry, etc.)

## Security Considerations

- All API keys should be stored securely and never exposed to the client
- Implement proper Row Level Security (RLS) policies in Supabase
- Validate all user inputs on both client and server side
- Use HTTPS in production
- Implement rate limiting to prevent abuse
- Regular security audits and dependency updates

## Support

For API support and questions:
- Email: support@samplesecure.com
- Documentation: https://docs.samplesecure.com
- GitHub Issues: https://github.com/samplesecure/app/issues
