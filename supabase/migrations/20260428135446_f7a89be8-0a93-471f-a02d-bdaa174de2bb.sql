ALTER TABLE public.consignments
  ADD COLUMN IF NOT EXISTS current_station text,
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'Unpaid';