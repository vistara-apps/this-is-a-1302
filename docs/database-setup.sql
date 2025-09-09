-- SampleSecure Database Schema Setup
-- Run this script in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  userId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscriptionTier TEXT DEFAULT 'free' CHECK (subscriptionTier IN ('free', 'creator', 'pro')),
  stripeCustomerId TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Projects table
CREATE TABLE IF NOT EXISTS projects (
  projectId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID REFERENCES users(userId) ON DELETE CASCADE,
  projectName TEXT NOT NULL,
  description TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Rights Holders table
CREATE TABLE IF NOT EXISTS rightsHolders (
  rightsHolderId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contactEmail TEXT,
  contactPhone TEXT,
  address TEXT,
  website TEXT,
  notes TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Samples table
CREATE TABLE IF NOT EXISTS samples (
  sampleId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projectId UUID REFERENCES projects(projectId) ON DELETE CASCADE,
  audioFileUrl TEXT,
  audioFilePath TEXT,
  identifiedSongTitle TEXT,
  originalArtist TEXT,
  originalAlbum TEXT,
  originalYear INTEGER,
  rightsHolderId UUID REFERENCES rightsHolders(rightsHolderId),
  rightsHolderName TEXT,
  rightsHolderContact TEXT,
  clearanceStatus TEXT DEFAULT 'pending' CHECK (clearanceStatus IN ('pending', 'approved', 'rejected', 'negotiating')),
  sampleType TEXT,
  duration TEXT,
  bpm INTEGER,
  musicalKey TEXT,
  confidence DECIMAL(3,2),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Clearance Requests table
CREATE TABLE IF NOT EXISTS clearanceRequests (
  clearanceRequestId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sampleId UUID REFERENCES samples(sampleId) ON DELETE CASCADE,
  requestDate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submissionStatus TEXT DEFAULT 'draft' CHECK (submissionStatus IN ('draft', 'submitted', 'responded')),
  responseStatus TEXT DEFAULT 'pending' CHECK (responseStatus IN ('pending', 'approved', 'rejected', 'negotiating')),
  termsOffered TEXT,
  termsAccepted TEXT,
  agreementUrl TEXT,
  requestText TEXT,
  responseText TEXT,
  notes TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Usage Tracking table for subscription limits
CREATE TABLE IF NOT EXISTS usageTracking (
  usageId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID REFERENCES users(userId) ON DELETE CASCADE,
  actionType TEXT NOT NULL CHECK (actionType IN ('sample_search', 'clearance_request', 'project_create')),
  actionDate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_userId ON projects(userId);
CREATE INDEX IF NOT EXISTS idx_samples_projectId ON samples(projectId);
CREATE INDEX IF NOT EXISTS idx_samples_rightsHolderId ON samples(rightsHolderId);
CREATE INDEX IF NOT EXISTS idx_clearanceRequests_sampleId ON clearanceRequests(sampleId);
CREATE INDEX IF NOT EXISTS idx_usageTracking_userId ON usageTracking(userId);
CREATE INDEX IF NOT EXISTS idx_usageTracking_actionType ON usageTracking(actionType);
CREATE INDEX IF NOT EXISTS idx_usageTracking_actionDate ON usageTracking(actionDate);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rightsHolders_updated_at BEFORE UPDATE ON rightsHolders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_samples_updated_at BEFORE UPDATE ON samples FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clearanceRequests_updated_at BEFORE UPDATE ON clearanceRequests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE clearanceRequests ENABLE ROW LEVEL SECURITY;
ALTER TABLE usageTracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users can only see and update their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = userId::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = userId::text);

-- Projects policies
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid()::text = userId::text);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid()::text = userId::text);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid()::text = userId::text);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid()::text = userId::text);

-- Samples policies
CREATE POLICY "Users can view own samples" ON samples FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.projectId = samples.projectId 
    AND projects.userId::text = auth.uid()::text
  )
);
CREATE POLICY "Users can insert own samples" ON samples FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.projectId = samples.projectId 
    AND projects.userId::text = auth.uid()::text
  )
);
CREATE POLICY "Users can update own samples" ON samples FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.projectId = samples.projectId 
    AND projects.userId::text = auth.uid()::text
  )
);
CREATE POLICY "Users can delete own samples" ON samples FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.projectId = samples.projectId 
    AND projects.userId::text = auth.uid()::text
  )
);

-- Clearance requests policies
CREATE POLICY "Users can view own clearance requests" ON clearanceRequests FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM samples 
    JOIN projects ON projects.projectId = samples.projectId
    WHERE samples.sampleId = clearanceRequests.sampleId 
    AND projects.userId::text = auth.uid()::text
  )
);
CREATE POLICY "Users can insert own clearance requests" ON clearanceRequests FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM samples 
    JOIN projects ON projects.projectId = samples.projectId
    WHERE samples.sampleId = clearanceRequests.sampleId 
    AND projects.userId::text = auth.uid()::text
  )
);
CREATE POLICY "Users can update own clearance requests" ON clearanceRequests FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM samples 
    JOIN projects ON projects.projectId = samples.projectId
    WHERE samples.sampleId = clearanceRequests.sampleId 
    AND projects.userId::text = auth.uid()::text
  )
);
CREATE POLICY "Users can delete own clearance requests" ON clearanceRequests FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM samples 
    JOIN projects ON projects.projectId = samples.projectId
    WHERE samples.sampleId = clearanceRequests.sampleId 
    AND projects.userId::text = auth.uid()::text
  )
);

-- Usage tracking policies
CREATE POLICY "Users can view own usage" ON usageTracking FOR SELECT USING (auth.uid()::text = userId::text);
CREATE POLICY "Users can insert own usage" ON usageTracking FOR INSERT WITH CHECK (auth.uid()::text = userId::text);

-- Rights holders are publicly readable but only admins can modify
CREATE POLICY "Rights holders are publicly readable" ON rightsHolders FOR SELECT USING (true);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('audio-samples', 'audio-samples', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Users can upload their own audio files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'audio-samples' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own audio files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'audio-samples' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own audio files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'audio-samples' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own audio files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'audio-samples' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Insert sample rights holders data
INSERT INTO rightsHolders (name, contactEmail, contactPhone, address, website) VALUES
  ('Universal Music Group', 'clearances@umg.com', '+1-310-865-5000', '2220 Colorado Avenue, Santa Monica, CA 90404', 'https://www.universalmusic.com'),
  ('Sony Music Entertainment', 'licensing@sonymusic.com', '+1-212-833-8000', '25 Madison Avenue, New York, NY 10010', 'https://www.sonymusic.com'),
  ('Warner Music Group', 'clearances@wmg.com', '+1-212-275-2000', '1633 Broadway, New York, NY 10019', 'https://www.wmg.com'),
  ('EMI Music Publishing', 'licensing@emimusicpub.com', '+1-310-659-2200', '2100 Colorado Avenue, Santa Monica, CA 90404', 'https://www.emimusicpub.com'),
  ('BMG Rights Management', 'licensing@bmg.com', '+1-212-586-2000', '1540 Broadway, New York, NY 10036', 'https://www.bmg.com'),
  ('Kobalt Music Group', 'licensing@kobaltmusic.com', '+1-212-586-6600', '2 Gansevoort Street, New York, NY 10014', 'https://www.kobaltmusic.com'),
  ('Downtown Music Holdings', 'licensing@downtown.com', '+1-212-564-4730', '1 World Trade Center, New York, NY 10007', 'https://www.downtown.com'),
  ('Concord Music Group', 'licensing@concordmusic.com', '+1-310-385-4455', '100 N Crescent Dr, Beverly Hills, CA 90210', 'https://www.concordmusic.com'),
  ('Reservoir Media', 'licensing@reservoir-media.com', '+1-212-675-7878', '1633 Broadway, New York, NY 10019', 'https://www.reservoir-media.com'),
  ('Round Hill Music', 'licensing@roundhillmusic.com', '+1-615-321-4444', '1201 Demonbreun Street, Nashville, TN 37203', 'https://www.roundhillmusic.com')
ON CONFLICT DO NOTHING;

-- Create function to get user usage for current month
CREATE OR REPLACE FUNCTION get_user_monthly_usage(user_id UUID, action_type TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM usageTracking
    WHERE userId = user_id
    AND actionType = action_type
    AND actionDate >= date_trunc('month', CURRENT_DATE)
    AND actionDate < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to track usage
CREATE OR REPLACE FUNCTION track_usage(user_id UUID, action_type TEXT, metadata JSONB DEFAULT NULL)
RETURNS UUID AS $$
DECLARE
  usage_id UUID;
BEGIN
  INSERT INTO usageTracking (userId, actionType, metadata)
  VALUES (user_id, action_type, metadata)
  RETURNING usageId INTO usage_id;
  
  RETURN usage_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check subscription limits
CREATE OR REPLACE FUNCTION check_subscription_limit(user_id UUID, action_type TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  current_usage INTEGER;
  tier_limit INTEGER;
BEGIN
  -- Get user's subscription tier
  SELECT subscriptionTier INTO user_tier FROM users WHERE userId = user_id;
  
  -- Get current usage for this month
  SELECT get_user_monthly_usage(user_id, action_type) INTO current_usage;
  
  -- Determine limit based on tier and action type
  CASE user_tier
    WHEN 'free' THEN
      CASE action_type
        WHEN 'sample_search' THEN tier_limit := 3;
        WHEN 'clearance_request' THEN tier_limit := 1;
        WHEN 'project_create' THEN tier_limit := 1;
        ELSE tier_limit := 0;
      END CASE;
    WHEN 'creator' THEN
      CASE action_type
        WHEN 'sample_search' THEN tier_limit := 50;
        WHEN 'clearance_request' THEN tier_limit := 10;
        WHEN 'project_create' THEN tier_limit := 5;
        ELSE tier_limit := 0;
      END CASE;
    WHEN 'pro' THEN
      tier_limit := -1; -- Unlimited
    ELSE
      tier_limit := 0;
  END CASE;
  
  -- Return true if unlimited or under limit
  RETURN tier_limit = -1 OR current_usage < tier_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create a view for user dashboard statistics
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT 
  u.userId,
  u.subscriptionTier,
  COUNT(DISTINCT p.projectId) as total_projects,
  COUNT(DISTINCT s.sampleId) as total_samples,
  COUNT(DISTINCT cr.clearanceRequestId) as total_clearance_requests,
  COUNT(DISTINCT CASE WHEN s.clearanceStatus = 'approved' THEN s.sampleId END) as approved_samples,
  COUNT(DISTINCT CASE WHEN s.clearanceStatus = 'pending' THEN s.sampleId END) as pending_samples,
  COUNT(DISTINCT CASE WHEN s.clearanceStatus = 'rejected' THEN s.sampleId END) as rejected_samples
FROM users u
LEFT JOIN projects p ON u.userId = p.userId
LEFT JOIN samples s ON p.projectId = s.projectId
LEFT JOIN clearanceRequests cr ON s.sampleId = cr.sampleId
GROUP BY u.userId, u.subscriptionTier;

-- Grant access to the view
GRANT SELECT ON user_dashboard_stats TO anon, authenticated;

-- Create RLS policy for the view
CREATE POLICY "Users can view own dashboard stats" ON user_dashboard_stats FOR SELECT USING (auth.uid()::text = userId::text);

COMMENT ON TABLE users IS 'User accounts and subscription information';
COMMENT ON TABLE projects IS 'User projects containing samples';
COMMENT ON TABLE samples IS 'Audio samples with identification and clearance information';
COMMENT ON TABLE rightsHolders IS 'Rights holders and their contact information';
COMMENT ON TABLE clearanceRequests IS 'Sample clearance requests and their status';
COMMENT ON TABLE usageTracking IS 'Track user actions for subscription limits';
COMMENT ON VIEW user_dashboard_stats IS 'Dashboard statistics for users';
