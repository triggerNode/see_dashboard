-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Public read access for devex_rates" ON public.devex_rates;
DROP POLICY IF EXISTS "Service role can insert devex_rates" ON public.devex_rates;

-- Create policy to allow public read access (since this is public DevEx rate data)
CREATE POLICY "Public read access for devex_rates" 
ON public.devex_rates 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users and service role to insert data
CREATE POLICY "Allow insert for authenticated users" 
ON public.devex_rates 
FOR INSERT 
TO authenticated, anon, service_role
WITH CHECK (true);

-- Create policy to allow service role full access
CREATE POLICY "Service role full access" 
ON public.devex_rates 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);