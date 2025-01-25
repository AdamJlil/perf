const bcrypt = require('bcryptjs');

const password = 'Test123!@#';
bcrypt.hash(password, 10).then(hash => {
    console.log('Use this SQL command to insert a test user:');
    console.log(`
INSERT INTO users (
    id,
    email,
    password,
    name,
    first_name,
    last_name,
    type,
    roles,
    is_finished_onboarding
) VALUES (
    'user_${Date.now()}',
    'test@example.com',
    '${hash}',
    'John Doe',
    'John',
    'Doe',
    'PARTICULIER',
    '["USER"]',
    false
);
    `);
});
