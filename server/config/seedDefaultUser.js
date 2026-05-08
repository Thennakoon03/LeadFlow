import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedDefaultUser = async () => {
  const seedUsers = [
    {
      name: "Maya Thompson",
      email: "maya.thompson@leadflowcrm.com",
      password: "LeadFlow2026",
      legacyEmails: ["admin@example.com"],
    },
    {
      name: "Daniel Reyes",
      email: "daniel.reyes@leadflowcrm.com",
      password: "LeadFlow2026",
      legacyEmails: ["opsadmin@example.com"],
    },
  ];

  for (const seedUser of seedUsers) {
    const hashedPassword = await bcrypt.hash(seedUser.password, 10);
    const existingUser = await User.findOne({
      email: {
        $in: [seedUser.email, ...(seedUser.legacyEmails || [])],
      },
    });

    if (existingUser) {
      existingUser.name = seedUser.name;
      existingUser.email = seedUser.email;
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log(`Seeded user updated: ${seedUser.email}`);
      continue;
    }

    await User.create({
      name: seedUser.name,
      email: seedUser.email,
      password: hashedPassword,
    });

    console.log(`Seeded user created: ${seedUser.email}`);
  }
};

export default seedDefaultUser;
