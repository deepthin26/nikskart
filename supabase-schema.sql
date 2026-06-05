-- Run this in your Supabase dashboard: SQL Editor → New Query → Run

CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email       TEXT NOT NULL,
  user_name        TEXT NOT NULL,
  items            JSONB NOT NULL,
  total_price      NUMERIC(10,2) NOT NULL,
  shipping         NUMERIC(10,2) NOT NULL,
  grand_total      NUMERIC(10,2) NOT NULL,
  payment_method   TEXT NOT NULL DEFAULT 'Razorpay',
  address          JSONB NOT NULL,
  razorpay_order_id   TEXT,
  razorpay_payment_id TEXT,
  status           TEXT NOT NULL DEFAULT 'Processing',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS orders_user_email_idx ON orders(user_email);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);

-- Backend uses service role key which bypasses RLS, so no policies needed.
-- Enable RLS so the table is not accidentally exposed via anon key.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
