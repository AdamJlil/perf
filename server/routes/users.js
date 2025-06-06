const express = require("express");
const router = express.Router();
const User = require("../models/User");
const JWTUtil = require("../utils/jwt");

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = JWTUtil.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Get all PARTICULIER users
router.get("/particulier", async (req, res) => {
  try {
    const users = await User.getAllParticularUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching PARTICULIER users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Update user quiz data
router.post("/quiz", verifyToken, async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      gender,
      hasAllergies,
      allergiesDetails,
      hasMedicalConditions,
      medicalConditionsDetails,
    } = req.body;

    // Get user from JWT token
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ error: "You must be logged in to update your profile" });
    }

    // Update user in database using the User instance
    await User.updateUserQuiz(currentUser.id, {
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      gender,
      has_allergies: hasAllergies,
      allergies_details: allergiesDetails || null,
      has_medical_conditions: hasMedicalConditions,
      medical_conditions_details: medicalConditionsDetails || null,
    });

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user quiz:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Get establishment's customers
router.get("/customers", verifyToken, async (req, res) => {
  try {
    // Verify that the user is an establishment
    if (req.user.type !== "ESTABLISHEMENT") {
      return res.status(403).json({ error: "Only establishments can view their customers" });
    }

    const establishmentId = req.user.id;
    const customers = await User.getCustomers(establishmentId);
    res.json(customers);
  } catch (error) {
    console.error("Error getting customers:", error);
    res.status(500).json({ error: "Failed to get customers" });
  }
});

// Remove customer from establishment
router.delete("/customers/remove/:customerId", verifyToken, async (req, res) => {
  try {
    console.log("Remove customer request:", {
      customerId: req.params.customerId,
      establishmentId: req.user.id,
      userType: req.user.type,
    });

    // Verify that the user is an establishment
    if (req.user.type !== "ESTABLISHEMENT") {
      return res.status(403).json({ error: "Only establishments can remove customers" });
    }

    const { customerId } = req.params;
    const establishmentId = req.user.id;

    const customers = await User.removeCustomer(establishmentId, customerId);
    res.json({
      message: "Customer removed successfully",
      customers: JSON.stringify(customers), // Ensure customers are stringified
    });
  } catch (error) {
    console.error("Error removing customer:", error);
    res.status(500).json({ error: "Failed to remove customer" });
  }
});

// Delete user by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verify that the user has permission to delete
    if (req.user.type !== "ESTABLISHEMENT" && req.user.type !== "ADMIN") {
      return res.status(403).json({ error: "You do not have permission to delete users" });
    }

    await User.deleteUser(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Add customer to establishment
router.post("/customers/add/:customerId", verifyToken, async (req, res) => {
  try {
    console.log("Add customer request:", {
      customerId: req.params.customerId,
      establishmentId: req.user.id,
      userType: req.user.type,
      body: req.body,
    });

    // Verify that the user is an establishment
    if (req.user.type !== "ESTABLISHEMENT") {
      return res.status(403).json({ error: "Only establishments can add customers" });
    }

    const { customerId } = req.params;
    const establishmentId = req.user.id;
    const customerData = req.body;

    // The customer data should already be in the correct format
    const customer = {
      ...customerData,
      et_customer_id: customerId, // Ensure the ID is set correctly
    };

    console.log("Processed customer data:", customer);

    const customers = await User.addCustomer(establishmentId, customer);
    console.log("Response customers:", customers);

    res.json({ message: "Customer added successfully", customers });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ error: "Failed to add customer", details: error.message });
  }
});

// Upgrade user plan
router.put("/plan/upgrade", verifyToken, async (req, res) => {
  try {
    console.log("Plan upgrade request:", {
      userId: req.user.id,
      plan: req.body.plan,
    });

    if (!req.body.plan) {
      return res.status(400).json({ error: "Plan data is required" });
    }

    // Update the user's plan
    const updatedUser = await User.upgradePlan(req.user.id, req.body.plan);

    res.json({
      message: "Plan upgraded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error upgrading plan:", error);
    res.status(500).json({ error: "Failed to upgrade plan", details: error.message });
  }
});

// Check if user is in Admins table
router.get("/admin-check", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const admin = await User.isUserAdmin(email);
    if (admin) {
      // Return admin data including password for login verification
      return res.json({ isAdmin: true, admin });
    }

    res.json({ isAdmin: false });
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ error: "Failed to check admin status" });
  }
});

// Get user by email (for payment page)
router.get("/by-email", async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    
    console.log(`Fetching user data for email: ${email}`);
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Determine price based on plan
    let price = '';
    if (user.plan) {
      const planTitle = typeof user.plan === 'string' ? 
        (JSON.parse(user.plan).title || '') : 
        (user.plan.title || '');
      
      if (user.type === 'ESTABLISHEMENT') {
        if (planTitle === 'ESSENTIAL') price = '5500';
        else if (planTitle === 'PREMIUM') price = '9999';
        else if (planTitle === 'GROWTH') price = '500';
      } else {
        // PARTICULIER prices
        if (planTitle === 'ESSENTIAL') price = '5500';
        else if (planTitle === 'PREMIUM') price = '9999';
        else if (planTitle === 'GROWTH') price = '500';
      }
    }
    
    // Remove sensitive data
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: {
        ...userWithoutPassword,
        price
      }
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Update user by ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    // Verify that the user has permission to update
    // Allow users to update their own data, or admins to update any user
    if (req.user.id !== id && req.user.type !== "ADMIN") {
      return res.status(403).json({ error: "You do not have permission to update this user" });
    }

    console.log("Update user request:", {
      userId: id,
      userData: userData
    });

    console.log("Updating user in database... AAAAAAAAAAa");
    console.log(userData);
    
    // Update the user in the database
    const updatedUser = await User.updateUser(id, userData);

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user", details: error.message });
  }
});

// Direct payment update route - completely standalone
router.post("/:id/update-payment", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { address, city, phone, payment_type } = req.body;
    
    // Verify that the user has permission to update
    if (req.user.id !== id && req.user.type !== "ADMIN") {
      return res.status(403).json({ error: "You do not have permission to update this user" });
    }
    
    console.log("Direct payment update request received:", {
      userId: id,
      paymentData: { address, city, phone, payment_type }
    });
    
    // Use the User model's getConnection method to get a connection properly
    let connection;
    
    try {
      // Get a connection using the proper method
      connection = await User.getConnection();
      
      // Build SQL query directly
      const fields = [];
      const values = [];
      
      if (address !== undefined) {
        fields.push('address = ?');
        values.push(address);
      }
      
      if (city !== undefined) {
        fields.push('city = ?');
        values.push(city);
      }
      
      if (phone !== undefined) {
        fields.push('phone = ?');
        values.push(phone);
      }
      
      if (payment_type !== undefined) {
        fields.push('payment_type = ?');
        values.push(payment_type);
      }
      
      if (fields.length === 0) {
        return res.status(400).json({ error: "No payment fields provided to update" });
      }
      
      // Add WHERE clause parameter
      values.push(id);
      
      // Construct and execute direct SQL query
      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      console.log("DIRECT PAYMENT UPDATE QUERY:", query);
      console.log("VALUES:", values);
      
      const [result] = await connection.execute(query, values);
      console.log("DIRECT UPDATE RESULT:", result);
      
      // Get updated user data
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      
      const updatedUser = rows[0] || null;
      
      res.json({
        message: "Payment information updated successfully via direct update",
        user: updatedUser
      });
    } catch (dbError) {
      console.error("Database error in direct payment update:", dbError);
      throw dbError;
    } finally {
      if (connection) connection.release();
    }
  } catch (error) {
    console.error("Error in direct payment update:", error);
    res.status(500).json({ 
      error: "Failed to update payment information", 
      details: error.message 
    });
  }
});

module.exports = router;
