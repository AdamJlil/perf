const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

class User {
    constructor() {
        this.pool = null;
        this.initializePool();
    }

    async initializePool() {
        try {
            console.log('Initializing database pool with config:', {
                ...config.database,
                password: '[REDACTED]'
            });
            this.pool = mysql.createPool(config.database);
            // Test the connection
            const connection = await this.pool.getConnection();
            console.log('Database connection established successfully');
            connection.release();
        } catch (error) {
            console.error('Failed to establish database connection:', {
                code: error.code,
                errno: error.errno,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            });
            // Don't throw here, let individual methods handle the null pool
        }
    }

    async getConnection() {
        if (!this.pool) {
            console.error('Attempted to get connection but pool is null');
            throw new Error('Database connection not established. Please ensure MySQL is running and configured correctly.');
        }
        return this.pool.getConnection();
    }

    async create(userData) {
        console.log('Creating user with data:', {
            ...userData,
            password: '[REDACTED]'
        });

        const { email, password, name, first_name, last_name, type } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = `user_${Date.now()}`;
        const roles = JSON.stringify(['USER']);

        let connection;
        try {
            connection = await this.getConnection();
            console.log('Executing insert query with values:', {
                id,
                email,
                name: name || null,
                first_name: first_name || null,
                last_name: last_name || null,
                type,
                roles
            });

            const [result] = await connection.execute(
                'INSERT INTO users (id, email, password, name, first_name, last_name, type, roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id, email, hashedPassword, name || null, first_name || null, last_name || null, type, roles]
            );

            console.log('User created successfully:', {
                id,
                email,
                name,
                type
            });

            return { id, email, name, first_name, last_name, type };
        } catch (error) {
            console.error('Error creating user:', {
                code: error.code,
                errno: error.errno,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            });
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('Database table not found. Please ensure the database is properly set up.');
            }
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    async findByEmail(email) {
        console.log('Finding user by email:', email);
        let connection;
        try {
            connection = await this.getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            console.log('Find by email result:', rows[0] ? 'User found' : 'User not found');
            return rows[0];
        } catch (error) {
            console.error('Error finding user:', {
                code: error.code,
                errno: error.errno,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            });
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('Database table not found. Please ensure the database is properly set up.');
            }
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    async validatePassword(providedPassword, storedPassword) {
        return bcrypt.compare(providedPassword, storedPassword);
    }

    async getAllParticularUsers() {
        console.log('Fetching all PARTICULIER users');
        let connection;
        try {
            connection = await this.getConnection();
            const [rows] = await connection.execute(
                'SELECT id, email, name, first_name, last_name, type FROM users WHERE type = ?',
                ['PARTICULIER']
            );
            console.log(`Found ${rows.length} PARTICULIER users`);
            return rows;
        } catch (error) {
            console.error('Error fetching PARTICULIER users:', {
                code: error.code,
                errno: error.errno,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            });
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    async deleteUser(id) {
        console.log('Deleting user with ID:', id);
        let connection;
        try {
            connection = await this.getConnection();
            const [result] = await connection.execute(
                'DELETE FROM users WHERE id = ?',
                [id]
            );
            if (result.affectedRows === 0) {
                throw new Error('User not found');
            }
            console.log('User deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting user:', {
                code: error.code,
                errno: error.errno,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage
            });
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = new User();
