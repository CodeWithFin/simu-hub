-- Seed Admin User
-- Default credentials: admin / admin123
-- IMPORTANT: Change these credentials after first login!

-- Password hash for 'admin123' (generated with bcrypt, rounds=10)
INSERT INTO admins (username, password_hash, role)
VALUES (
  'admin',
  '$2a$10$q345REiVlBI9PnDQKd3lDuaBVmOVVfRTSTCmsdl81xwaPdZkd4TS.',
  'owner'
)
ON CONFLICT (username) DO NOTHING;

-- To create a custom admin user, generate a password hash using Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = bcrypt.hashSync('your_password', 10);
-- console.log(hash);
-- Then replace the password_hash value above with your generated hash.
