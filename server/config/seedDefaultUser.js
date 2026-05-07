import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedDefaultUser = async () => {
  const defaultEmail = "admin@example.com";
  const existingUser = await User.findOne({ email: defaultEmail });

  if (existingUser) {
    return;
  }

  const hashedPassword = await bcrypt.hash("password123", 10);

  await User.create({
    name: "Admin User",
    email: defaultEmail,
    password: hashedPassword,
  });

  console.log("Default test user created: admin@example.com");
};

export default seedDefaultUser;
