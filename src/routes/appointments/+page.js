import { supabase } from '$lib/supabaseClient';

/*  Supabase Connection */
export async function load() {
    const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', 
        { ascending: true });
return { appointments: data };
}