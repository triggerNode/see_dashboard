-- Create devex_rates table
CREATE TABLE IF NOT EXISTS public.devex_rates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    rate numeric(10,6) NOT NULL,
    fetched_at timestamptz NOT NULL DEFAULT now(),
    source_url text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_devex_rates_fetched_at ON public.devex_rates (fetched_at DESC);

-- Enable Row Level Security
ALTER TABLE public.devex_rates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is public DevEx rate data)
CREATE POLICY "Public read access for devex_rates" 
ON public.devex_rates 
FOR SELECT 
USING (true);

-- Create policy to allow service role to insert data
CREATE POLICY "Service role can insert devex_rates" 
ON public.devex_rates 
FOR INSERT 
WITH CHECK (true);

-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the cron job to run scrapeDevexRate function daily at 3 AM UTC
SELECT cron.schedule(
    'daily-devex-rate-scrape',
    '0 3 * * *',
    $$
    SELECT net.http_post(
        url := 'https://htykqrmczqcokvmrsfui.supabase.co/functions/v1/scrapeDevexRate',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0eWtxcm1jenFjb2t2bXJzZnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTI3NDYsImV4cCI6MjA2NzAyODc0Nn0.LZLU8uQbQPv60ia05vtReIjJFiJGXFm-UJF2LQblbaI"}'::jsonb,
        body := '{}'::jsonb
    ) AS request_id;
    $$
);