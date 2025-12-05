import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
