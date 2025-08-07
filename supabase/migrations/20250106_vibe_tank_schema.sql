-- Vibe Tank Knowledge Management System Schema

-- Knowledge sources table
CREATE TABLE IF NOT EXISTS knowledge_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT,
    type VARCHAR(50) NOT NULL, -- 'rss', 'api', 'manual', 'social', 'academic'
    category VARCHAR(100), -- 'llm_theory', 'ai_agent', 'business_model'
    is_active BOOLEAN DEFAULT true,
    last_fetched_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Main knowledge items table
CREATE TABLE IF NOT EXISTS knowledge_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    summary TEXT,
    url TEXT,
    source_id UUID REFERENCES knowledge_sources(id) ON DELETE SET NULL,
    category VARCHAR(100) NOT NULL, -- 'llm_theory', 'ai_agent', 'business_model'
    tags TEXT[],
    author VARCHAR(255),
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- AI evaluation scores (0-100)
    credibility_score INTEGER,
    innovation_score INTEGER,
    practical_value_score INTEGER,
    inspiration_score INTEGER,
    long_term_impact_score INTEGER,
    overall_score INTEGER GENERATED ALWAYS AS (
        (COALESCE(credibility_score, 0) + 
         COALESCE(innovation_score, 0) + 
         COALESCE(practical_value_score, 0) + 
         COALESCE(inspiration_score, 0) + 
         COALESCE(long_term_impact_score, 0)) / 5
    ) STORED,
    
    -- Metadata
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User perspectives configuration
CREATE TABLE IF NOT EXISTS user_perspectives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Weight for each evaluation dimension (0-100)
    credibility_weight INTEGER DEFAULT 20,
    innovation_weight INTEGER DEFAULT 20,
    practical_value_weight INTEGER DEFAULT 20,
    inspiration_weight INTEGER DEFAULT 20,
    long_term_impact_weight INTEGER DEFAULT 20,
    
    -- Focus areas
    preferred_categories TEXT[],
    preferred_tags TEXT[],
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, name)
);

-- Knowledge evaluations by users
CREATE TABLE IF NOT EXISTS knowledge_evaluations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    knowledge_item_id UUID NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    perspective_id UUID REFERENCES user_perspectives(id) ON DELETE SET NULL,
    
    -- User's evaluation scores
    credibility_score INTEGER CHECK (credibility_score >= 0 AND credibility_score <= 100),
    innovation_score INTEGER CHECK (innovation_score >= 0 AND innovation_score <= 100),
    practical_value_score INTEGER CHECK (practical_value_score >= 0 AND practical_value_score <= 100),
    inspiration_score INTEGER CHECK (inspiration_score >= 0 AND inspiration_score <= 100),
    long_term_impact_score INTEGER CHECK (long_term_impact_score >= 0 AND long_term_impact_score <= 100),
    
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(knowledge_item_id, user_id)
);

-- Discussions and comments
CREATE TABLE IF NOT EXISTS knowledge_discussions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    knowledge_item_id UUID NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES knowledge_discussions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    
    -- Reaction counts
    likes_count INTEGER DEFAULT 0,
    
    is_pinned BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge relationships (for knowledge graph)
CREATE TABLE IF NOT EXISTS knowledge_relations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_item_id UUID NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
    target_item_id UUID NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
    relation_type VARCHAR(50) NOT NULL, -- 'references', 'extends', 'contradicts', 'implements', 'inspired_by'
    strength INTEGER DEFAULT 50 CHECK (strength >= 0 AND strength <= 100),
    notes TEXT,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(source_item_id, target_item_id, relation_type)
);

-- Daily picks
CREATE TABLE IF NOT EXISTS daily_picks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    knowledge_item_id UUID NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
    pick_date DATE NOT NULL,
    pick_reason TEXT,
    curator_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(knowledge_item_id, pick_date)
);

-- User interactions tracking
CREATE TABLE IF NOT EXISTS knowledge_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    knowledge_item_id UUID NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    interaction_type VARCHAR(50) NOT NULL, -- 'view', 'bookmark', 'share', 'cite'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_knowledge_items_category ON knowledge_items(category);
CREATE INDEX idx_knowledge_items_overall_score ON knowledge_items(overall_score DESC);
CREATE INDEX idx_knowledge_items_published_at ON knowledge_items(published_at DESC);
CREATE INDEX idx_knowledge_items_created_at ON knowledge_items(created_at DESC);
CREATE INDEX idx_knowledge_evaluations_user ON knowledge_evaluations(user_id);
CREATE INDEX idx_knowledge_discussions_item ON knowledge_discussions(knowledge_item_id);
CREATE INDEX idx_knowledge_relations_source ON knowledge_relations(source_item_id);
CREATE INDEX idx_knowledge_relations_target ON knowledge_relations(target_item_id);
CREATE INDEX idx_daily_picks_date ON daily_picks(pick_date DESC);

-- Enable Row Level Security
ALTER TABLE knowledge_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_perspectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic read access for all, write access for authenticated users)
CREATE POLICY "Knowledge items are viewable by everyone" ON knowledge_items
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create knowledge items" ON knowledge_items
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "User perspectives belong to users" ON user_perspectives
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own evaluations" ON knowledge_evaluations
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Discussions are viewable by everyone" ON knowledge_discussions
    FOR SELECT USING (NOT is_deleted);

CREATE POLICY "Authenticated users can create discussions" ON knowledge_discussions
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);