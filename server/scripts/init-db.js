const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const config = require('../config/database');

async function initializeDatabase() {
  console.log('Starting database initialization...');
  
  // Create connection without database specified
  const connectionConfig = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    connectTimeout: 10000,
  };
  
  console.log('Connecting to MySQL server with config:', {
    ...connectionConfig,
    password: '[REDACTED]'
  });
  
  let connection;
  
  try {
    // Connect to MySQL server (without specifying a database)
    connection = await mysql.createConnection(connectionConfig);
    console.log('Connected to MySQL server successfully');
    
    // Read the schema.sql file
    const schemaPath = path.join(__dirname, '../config/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing schema.sql...');
    
    // Split the SQL file into individual statements
    const statements = schemaSql
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    // Execute each statement
    for (const statement of statements) {
      console.log(`Executing: ${statement.trim()}`);
      await connection.query(statement);
    }
    
    console.log('Schema applied successfully');
    
    // Verify the database exists
    const [rows] = await connection.query('SHOW DATABASES LIKE ?', [config.database.database]);
    if (rows.length > 0) {
      console.log(`Database '${config.database.database}' exists`);
      
      // Connect to the specific database
      await connection.query(`USE ${config.database.database}`);
      
      // Verify tables exist
      const [tables] = await connection.query('SHOW TABLES');
      console.log('Tables in database:', tables.map(t => Object.values(t)[0]));
    } else {
      console.error(`Database '${config.database.database}' does not exist after schema execution`);
    }
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
  } finally {
    if (connection) {
      console.log('Closing database connection');
      await connection.end();
    }
  }
}

// Run the initialization
initializeDatabase().catch(err => {
  console.error('Unhandled error in database initialization:', err);
  process.exit(1);
});
