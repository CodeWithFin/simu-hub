// Script to generate a new admin password hash
// Usage: node scripts/change-admin-password.js

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Admin Password Hash Generator ===\n');

rl.question('Enter new password: ', (password) => {
  if (password.length < 6) {
    console.error('❌ Password must be at least 6 characters long');
    rl.close();
    return;
  }

  console.log('\nGenerating password hash...\n');
  const hash = bcrypt.hashSync(password, 10);
  
  console.log('✅ Password hash generated!\n');
  console.log('Run this SQL in Supabase to update the admin password:\n');
  console.log('```sql');
  console.log(`UPDATE admins SET password_hash = '${hash}' WHERE username = 'admin';`);
  console.log('```\n');
  
  rl.close();
});
