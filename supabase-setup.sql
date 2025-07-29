-- AI Coach Database Setup for Supabase

-- Table for storing chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient querying
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Table for storing user context and preferences
CREATE TABLE IF NOT EXISTS user_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  goals TEXT[] DEFAULT '{}',
  fitness_level TEXT DEFAULT 'beginner',
  preferences JSONB DEFAULT '{"workout_types": [], "dietary_restrictions": [], "equipment": []}',
  current_metrics JSONB DEFAULT '{}',
  injuries TEXT[] DEFAULT '{}',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user context lookups
CREATE INDEX IF NOT EXISTS idx_user_contexts_user_id ON user_contexts(user_id);

-- Table for knowledge base storage
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'fitness',
  confidence REAL DEFAULT 0.7,
  sources TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for knowledge base searches
CREATE INDEX IF NOT EXISTS idx_knowledge_base_topic ON knowledge_base(topic);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);

-- Table for storing extracted insights
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  confidence REAL DEFAULT 0.7,
  extracted_from TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for insights queries
CREATE INDEX IF NOT EXISTS idx_insights_user_id ON insights(user_id);
CREATE INDEX IF NOT EXISTS idx_insights_type ON insights(type);

-- Enable Row Level Security (RLS)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_contexts ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_messages
CREATE POLICY "Users can view own chat messages" ON chat_messages
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- RLS Policies for user_contexts
CREATE POLICY "Users can view own context" ON user_contexts
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own context" ON user_contexts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can upsert own context" ON user_contexts
  FOR UPDATE USING (auth.uid()::text = user_id);

-- RLS Policies for insights
CREATE POLICY "Users can view own insights" ON insights
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own insights" ON insights
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Knowledge base is readable by all authenticated users
CREATE POLICY "Authenticated users can read knowledge base" ON knowledge_base
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only the system can insert/update knowledge base entries
CREATE POLICY "System can manage knowledge base" ON knowledge_base
  FOR ALL USING (auth.role() = 'service_role');

-- Functions to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for knowledge_base updated_at
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_contexts last_updated
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_contexts_last_updated BEFORE UPDATE ON user_contexts
    FOR EACH ROW EXECUTE FUNCTION update_last_updated_column();