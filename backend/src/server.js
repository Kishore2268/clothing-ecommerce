const { app } = require(".");
const { connectDb } = require("./config/db");
const User = require("./models/user.model.js");
const bcrypt = require("bcryptjs");

const PORT = 5454;

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    
    if (!adminExists) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      const adminUser = new User({
        firstName: "Admin",
        lastName: "User",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
        mobile: "1234567890"
      });
      
      await adminUser.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log("Database connected successfully");
    
    await createAdminUser();
    console.log("ecommerce api listening on port", PORT);
  } catch (error) {
    console.error("Error starting server:", error);
  }
});