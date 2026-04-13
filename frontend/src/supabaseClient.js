import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL 값이 없습니다.");
}

if (!supabaseKey) {
  throw new Error("VITE_SUPABASE_PUBLISHABLE_KEY 값이 없습니다.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);