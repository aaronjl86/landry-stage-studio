-- Prevent direct manipulation of credit_transactions table
-- All credit operations MUST go through SECURITY DEFINER functions:
-- credits_consume(), credits_provision(), credits_refund()

-- Add explicit DENY policy for INSERT - only backend functions can create transactions
CREATE POLICY "Deny direct insert to credit_transactions"
ON public.credit_transactions
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Add explicit DENY policy for UPDATE - transactions are immutable
CREATE POLICY "Deny updates to credit_transactions"
ON public.credit_transactions
FOR UPDATE
TO authenticated
USING (false);

-- Add explicit DENY policy for DELETE - transaction history must be preserved
CREATE POLICY "Deny deletes from credit_transactions"
ON public.credit_transactions
FOR DELETE
TO authenticated
USING (false);

-- Also deny anonymous access to be extra safe
CREATE POLICY "Deny anonymous access to credit_transactions"
ON public.credit_transactions
FOR ALL
TO anon
USING (false);

-- Add comment explaining the security model
COMMENT ON TABLE public.credit_transactions IS 'Credit transaction ledger. READ-ONLY for users. All mutations must go through SECURITY DEFINER functions: credits_consume(), credits_provision(), credits_refund(). Direct INSERT/UPDATE/DELETE operations are blocked to prevent fraud.';