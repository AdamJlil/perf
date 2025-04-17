/**
 * Database configuration for both local and Docker environments
 * When running in Docker on Windows, we need to use host.docker.internal
 * to connect to the host machine's MySQL (XAMPP)
 */

// Determine the database host based on environment
let dbHost = 'localhost'; // Default for local development

// In Docker environment, use host.docker.internal to connect to host machine
if (process.env.DOCKER_ENV === 'true') {
    dbHost = 'host.docker.internal';
    console.log('Running in Docker environment, using host.docker.internal to connect to XAMPP MySQL');
}

const config = {
    database: {
        host: process.env.DB_HOST || dbHost,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'perf_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
};

console.log('Database configuration:', {
    host: config.database.host,
    user: config.database.user,
    database: config.database.database
});

module.exports = config;
