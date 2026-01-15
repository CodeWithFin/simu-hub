#!/usr/bin/env node

/**
 * Script to create an admin user in the database
 * Usage: node scripts/create-admin.js [username] [password]
 * Example: node scripts/create-admin.js admin mypassword123
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createAdmin(username, password) {
  const passwordHash = bcrypt.hashSync(password, 10);
  
  console.log('\n=== Admin User Creation ===\n');
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('\nSQL INSERT Statement:\n');
  console.log(`INSERT INTO admins (username, password_hash, role)`);
  console.log(`VALUES (`);
  console.log(`  '${username}',`);
  console.log(`  '${passwordHash}',`);
  console.log(`  'owner'`);
  console.log(`);\n`);
  console.log('Copy the SQL above and run it in your Supabase SQL Editor.\n');
}

// Get arguments from command line
const args = process.argv.slice(2);

if (args.length >= 2) {
  // Use command line arguments
  const username = args[0];
  const password = args[1];
  createAdmin(username, password);
  rl.close();
} else {
  // Interactive mode
  console.log('=== Create Admin User ===\n');
  
  rl.question('Enter username (default: admin): ', (username) => {
    const finalUsername = username || 'admin';
    
    rl.question('Enter password (default: admin123): ', (password) => {
      const finalPassword = password || 'admin123';
      
      createAdmin(finalUsername, finalPassword);
      rl.close();
    });
  });
}
