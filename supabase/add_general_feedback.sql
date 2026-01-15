-- Migration: Add general_feedback table
-- This adds support for general feedback submissions from the homepage

-- General feedback table (for homepage feedback)
CREATE TABLE IF NOT EXISTS general_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX IF NOT EXISTS idx_general_feedback_created_at ON general_feedback(created_at);

-- Comments for documentation
COMMENT ON TABLE general_feedback IS 'Stores general feedback submitted from the homepage';
COMMENT ON COLUMN general_feedback.name IS 'Name of the person submitting feedback';
COMMENT ON COLUMN general_feedback.email IS 'Optional email address';
COMMENT ON COLUMN general_feedback.phone IS 'Optional phone number';
COMMENT ON COLUMN general_feedback.message IS 'Feedback message content';
COMMENT ON COLUMN general_feedback.rating IS 'Optional rating from 1 to 5 stars';
