const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

class User {
  constructor() {
    this.pool = null;
    this.initializePool();
  }

  async initializePool() {
    try {
      console.log("Initializing database pool with config:", {
        ...config.database,
        password: "[REDACTED]",
      });
      this.pool = mysql.createPool(config.database);
      // Test the connection
      const connection = await this.pool.getConnection();
      console.log("Database connection established successfully");
      connection.release();
    } catch (error) {
      console.error("Failed to establish database connection:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      // Don't throw here, let individual methods handle the null pool
    }
  }

  async getConnection() {
    if (!this.pool) {
      console.error("Attempted to get connection but pool is null");
      throw new Error("Database connection not established. Please ensure MySQL is running and configured correctly.");
    }
    return this.pool.getConnection();
  }

  async create(userData) {
    console.log("Creating user with data:", {
      ...userData,
      password: "[REDACTED]",
    });

    const { email, password, name, first_name, last_name, type, plan } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = `user_${Date.now()}`;
    const roles = JSON.stringify(["USER"]);

    let connection;
    try {
      connection = await this.getConnection();
      console.log("Executing insert query with values:", {
        id,
        email,
        name: name || null,
        first_name: first_name || null,
        last_name: last_name || null,
        type,
        roles,
        plan: plan || null,
      });

      const [result] = await connection.execute(
        "INSERT INTO users (id, email, password, name, first_name, last_name, type, roles, plan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, email, hashedPassword, name || null, first_name || null, last_name || null, type, roles, plan || null],
      );

      console.log("User created successfully:", {
        id,
        email,
        name,
        type,
        plan: plan || null,
      });

      return { id, email, name, first_name, last_name, type, plan };
    } catch (error) {
      console.error("Error creating user:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      if (error.code === "ER_NO_SUCH_TABLE") {
        throw new Error("Database table not found. Please ensure the database is properly set up.");
      }
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async findByEmail(email) {
    console.log("Finding user by email:", email);
    let connection;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
      console.log("Find by email result:", rows[0] ? "User found" : "User not found");
      return rows[0];
    } catch (error) {
      console.error("Error finding user:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      if (error.code === "ER_NO_SUCH_TABLE") {
        throw new Error("Database table not found. Please ensure the database is properly set up.");
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
    console.log("Fetching all PARTICULIER users");
    let connection;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.execute(
        "SELECT id, email, name, first_name, last_name, type FROM users WHERE type = ?",
        ["PARTICULIER"],
      );
      console.log(`Found ${rows.length} PARTICULIER users`);
      return rows;
    } catch (error) {
      console.error("Error fetching PARTICULIER users:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async deleteUser(id) {
    console.log("Attempting to delete user with ID:", id);
    let connection;
    try {
      connection = await this.getConnection();

      // Start transaction
      await connection.beginTransaction();

      try {
        // Delete user data
        const [result] = await connection.execute("DELETE FROM users WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
          throw new Error("User not found");
        }

        // Commit the transaction
        await connection.commit();
        console.log("User deleted successfully");
        return true;
      } catch (error) {
        // Rollback in case of error
        await connection.rollback();
        console.error("Error in delete transaction:", {
          code: error.code,
          errno: error.errno,
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
        });
        throw error;
      }
    } catch (error) {
      console.error("Error deleting user:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      throw new Error("Failed to delete user: " + (error.sqlMessage || error.message));
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async updateUserQuiz(userId, quizData) {
    console.log("Updating user quiz data for ID:", userId);
    let connection;
    try {
      connection = await this.getConnection();
      const [result] = await connection.execute(
        `UPDATE users SET 
                    age = ?,
                    height = ?,
                    weight = ?,
                    gender = ?,
                    has_allergies = ?,
                    allergies_details = ?,
                    has_medical_conditions = ?,
                    medical_conditions_details = ?
                WHERE id = ?`,
        [
          quizData.age,
          quizData.height,
          quizData.weight,
          quizData.gender,
          quizData.has_allergies,
          quizData.allergies_details,
          quizData.has_medical_conditions,
          quizData.medical_conditions_details,
          userId,
        ],
      );
      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }
      console.log("User quiz data updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating user quiz data:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async upgradePlan(userId, planData) {
    console.log("Upgrading plan for user:", userId);
    let connection;
    try {
      connection = await this.getConnection();

      // Start transaction
      await connection.beginTransaction();

      try {
        // Update user's plan
        const [result] = await connection.execute("UPDATE users SET plan = ? WHERE id = ?", [
          JSON.stringify(planData),
          userId,
        ]);

        if (result.affectedRows === 0) {
          throw new Error("User not found");
        }

        // Get updated user data
        const [rows] = await connection.execute(
          "SELECT id, email, name, first_name, last_name, type, plan, customers FROM users WHERE id = ?",
          [userId],
        );

        // Commit the transaction
        await connection.commit();

        const updatedUser = rows[0];
        console.log("Plan upgraded successfully for user:", userId);

        return updatedUser;
      } catch (error) {
        // Rollback in case of error
        await connection.rollback();
        console.error("Error in upgrade plan transaction:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error upgrading plan:", error);
      throw new Error("Failed to upgrade plan: " + (error.sqlMessage || error.message));
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async addCustomer(establishmentId, customerData) {
    console.log("Adding customer to establishment:", {
      establishmentId,
      customerData,
    });

    let connection;
    try {
      connection = await this.getConnection();

      // First, get current customers array
      const [rows] = await connection.execute('SELECT customers FROM users WHERE id = ? AND type = "ESTABLISHEMENT"', [
        establishmentId,
      ]);

      console.log("Current database row:", rows[0]);

      if (!rows.length) {
        throw new Error("Establishment not found");
      }

      let customers = [];
      if (rows[0].customers) {
        try {
          customers = JSON.parse(rows[0].customers);
          console.log("Existing customers:", customers);
        } catch (e) {
          console.error("Error parsing existing customers:", e);
          customers = [];
        }
      }

      // Check if customer already exists
      const existingIndex = customers.findIndex((c) => {
        if (typeof c === "string") {
          return c === customerData.et_customer_id;
        }
        return c.et_customer_id === customerData.et_customer_id;
      });

      if (existingIndex !== -1) {
        console.log("Updating existing customer at index:", existingIndex);
        customers[existingIndex] = customerData;
      } else {
        console.log("Adding new customer");
        customers.push(customerData);
      }

      console.log("Final customers array:", customers);

      // Update the customers array
      const customersJson = JSON.stringify(customers);
      console.log("Updating database with JSON:", customersJson);

      const [updateResult] = await connection.execute("UPDATE users SET customers = ? WHERE id = ?", [
        customersJson,
        establishmentId,
      ]);

      console.log("Database update result:", updateResult);

      // Return the customers in the format expected by the frontend
      const formattedCustomers = customers.map((customer) => {
        if (typeof customer === "string") {
          return {
            id: customer,
            email: "",
            first_name: "",
            last_name: "",
            video: 0,
            age_range: "",
            weight_range: "",
            burned_calories: { "Day 1": 0 },
          };
        }
        return {
          id: customer.et_customer_id,
          email: customer.email,
          first_name: customer.firstName,
          last_name: customer.lastName,
          // Additional fields from the customer object
          video: customer.video || 0,
          age_range: customer.ageRange || "",
          weight_range: customer.weightRange || "",
          burned_calories: customer.burnedCalories || { "Day 1": 0 },
        };
      });

      console.log("Returning formatted customers:", formattedCustomers);
      return formattedCustomers;
    } catch (error) {
      console.error("Error adding customer:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async removeCustomer(establishmentId, customerId) {
    console.log("Removing customer:", customerId, "from establishment:", establishmentId);
    let connection;
    try {
      connection = await this.getConnection();

      // Get current customers array
      const [rows] = await connection.execute('SELECT customers FROM users WHERE id = ? AND type = "ESTABLISHEMENT"', [
        establishmentId,
      ]);

      if (!rows.length) {
        throw new Error("Establishment not found");
      }

      let customers = [];
      if (rows[0].customers) {
        customers = JSON.parse(rows[0].customers);
      }

      // Remove the customer with matching et_customer_id
      customers = customers.filter((customer) => customer.et_customer_id !== customerId);

      // Update the customers array
      await connection.execute("UPDATE users SET customers = ? WHERE id = ?", [
        JSON.stringify(customers),
        establishmentId,
      ]);

      console.log("Customer removed successfully");
      return customers;
    } catch (error) {
      console.error("Error removing customer:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async getCustomers(establishmentId) {
    console.log("Fetching customers for establishment:", establishmentId);
    let connection;
    try {
      connection = await this.getConnection();

      console.log('------------------------')
      console.log(connection)

      // Get the establishment's customers array
      const query = 'SELECT customers FROM users WHERE id = ? AND type = "ESTABLISHEMENT"';
      console.log("Executing query:", query, "with values:", [establishmentId]);

      const [rows] = await connection.execute(query, [establishmentId]);
      console.log("Query result:", rows);

      if (!rows.length) {
        console.log("Establishment not found");
        return [];
      }

      // If no customers array or empty array, return empty list
      if (!rows[0].customers) {
        console.log("No customers found for establishment");
        return [];
      }

      try {
        const customers = JSON.parse(rows[0].customers);
        console.log("Parsed customers:", customers);

        if (!Array.isArray(customers) || !customers.length) {
          console.log("Customer array is empty");
          return [];
        }

        // Map the customer objects to the expected format
        const formattedCustomers = customers.map((customer) => ({
          id: customer.et_customer_id,
          email: customer.email,
          first_name: customer.firstName,
          last_name: customer.lastName,
          // Additional fields from the customer object
          video: customer.video,
          age_range: customer.ageRange,
          weight_range: customer.weightRange,
          burned_calories: customer.burnedCalories,
        }));

        console.log("Formatted customers:", formattedCustomers);
        return formattedCustomers;
      } catch (parseError) {
        console.error("Error parsing customers JSON:", parseError);
        console.log("Raw customers value:", rows[0].customers);
        return [];
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async getAllCustomersForAdmin() {
    console.log("Fetching all customers for admin dashboard");
    let connection;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.execute(
        `SELECT 
                    id, 
                    email, 
                    name, 
                    first_name, 
                    last_name, 
                    type, 
                    age, 
                    height, 
                    gender, 
                    has_allergies, 
                    allergies_details, 
                    has_medical_conditions, 
                    medical_conditions_details, 
                    created_at, 
                    plan,
                    paid
                FROM users`,
      );
      console.log(`Found ${rows.length} customers`);
      return rows;
    } catch (error) {
      console.error("Error fetching customers for admin dashboard:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async isUserAdmin(email) {
    console.log("Checking if user is in Admins table:", email);
    let connection;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.execute("SELECT * FROM Admins WHERE email = ?", [email]);
      console.log("Admin check result:", rows[0] ? "Admin found" : "Admin not found");
      return rows[0] || null;
    } catch (error) {
      console.error("Error checking admin status:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
      });
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async updateUser(userId, userData) {
    console.log("Updating user:", userId, userData);
    let connection;
    try {
      connection = await this.getConnection();
      
      // Build the SET part of the SQL query dynamically based on provided fields
      const updateFields = [];
      const updateValues = [];
      
      // Map frontend field names to database column names
      const fieldMappings = {
        email: 'email',
        name: 'name',
        firstName: 'first_name',
        lastName: 'last_name',
        first_name: 'first_name',
        last_name: 'last_name',
        age: 'age',
        height: 'height',
        weight: 'weight',
        gender: 'gender',
        allergies: 'allergies_details',
        allergies_details: 'allergies_details',
        medicalConditions: 'medical_conditions_details',
        medical_conditions_details: 'medical_conditions_details',
        has_allergies: 'has_allergies',
        has_medical_conditions: 'has_medical_conditions',
        plan: 'plan',
        paid: 'paid',
        address: 'address',
        city: 'city',
        phone: 'phone',
        payment_type: 'payment_type'
      };
      
      // Process each field in userData
      for (const [key, value] of Object.entries(userData)) {
        if (fieldMappings[key]) {
          // Special handling for boolean fields like 'paid'
          if (key === 'paid') {
            // Convert string 'true'/'false' to actual boolean if needed
            let boolValue = value;
            if (value === 'true') boolValue = true;
            if (value === 'false') boolValue = false;
            
            updateFields.push(`${fieldMappings[key]} = ?`);
            updateValues.push(boolValue);
            console.log(`Setting paid value to: ${boolValue} (${typeof boolValue})`);
          } 
          // Special handling for numeric fields
          else if (['age', 'height', 'weight'].includes(key)) {
            updateFields.push(`${fieldMappings[key]} = ?`);
            
            // Convert empty strings or invalid values to NULL
            // Convert valid values to integers
            if (value === '' || value === null || value === undefined) {
              updateValues.push(null);
              console.log(`Setting ${key} value to NULL`);
            } else {
              const numValue = Number(value);
              updateValues.push(isNaN(numValue) ? null : numValue);
              console.log(`Setting ${key} value to: ${isNaN(numValue) ? null : numValue}`);
            }
          }
          // Special handling for boolean fields like has_allergies and has_medical_conditions
          else if (['has_allergies', 'has_medical_conditions'].includes(key)) {
            let boolValue = value;
            if (value === 'true') boolValue = true;
            if (value === 'false') boolValue = false;
            
            updateFields.push(`${fieldMappings[key]} = ?`);
            updateValues.push(boolValue);
          }
          // Default handling for other fields
          else {
            updateFields.push(`${fieldMappings[key]} = ?`);
            updateValues.push(value);
          }
        }
      }
      
      // Add userId to values array for the WHERE clause
      updateValues.push(userId);
      
      // Execute the update query if there are fields to update
      if (updateFields.length > 0) {
        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        console.log('Update query:', query);
        await connection.execute(query, updateValues);
      }
      
      // Fetch and return the updated user
      const [rows] = await connection.execute(
        `SELECT * FROM users WHERE id = ?`,
        [userId]
      );
      
      return rows[0] || null;
    } catch (error) {
      console.error("Error updating user:", {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
        sql: error.sql
      });
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }
}

module.exports = new User();
