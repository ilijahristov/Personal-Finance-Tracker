const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// TEMPORARY: delete this after testing
async function testConnection() {
    const { data, error } = await supabase.from('transactions').select('*').limit(1);
    if (error) {
      console.error(' Supabase connection failed:', error.message);
    } else {
      console.log(' Supabase connected successfully', data);
    }
  }
  
  testConnection();

module.exports = supabase;