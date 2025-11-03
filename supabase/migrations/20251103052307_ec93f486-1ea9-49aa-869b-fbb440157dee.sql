-- Enable realtime for user_payment_info table to support event-driven subscription updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_payment_info;