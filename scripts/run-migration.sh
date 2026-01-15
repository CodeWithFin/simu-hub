#!/bin/bash

# Script to run the general feedback migration
# Usage: ./scripts/run-migration.sh

echo "Running general_feedback table migration..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    echo ""
    echo "Please set your database connection string:"
    echo "export DATABASE_URL='your-supabase-connection-string'"
    echo ""
    echo "Or run the SQL manually in Supabase Dashboard:"
    echo "1. Go to supabase.com"
    echo "2. Open SQL Editor"
    echo "3. Run: supabase/add_general_feedback.sql"
    exit 1
fi

# Run the migration
psql "$DATABASE_URL" -f supabase/add_general_feedback.sql

if [ $? -eq 0 ]; then
    echo "✓ Migration completed successfully!"
    echo "You can now submit feedback on the homepage."
else
    echo "✗ Migration failed. Please check the error message above."
    exit 1
fi
