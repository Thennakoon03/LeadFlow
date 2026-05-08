import bcrypt from "bcryptjs";
import Lead from "../models/Lead.js";
import User from "../models/User.js";

const seedDefaultUser = async () => {
  const seedUsers = [
    {
      name: "Maya Thompson",
      email: "maya.thompson@leadflowcrm.com",
      password: "LeadFlow2026",
      legacyEmails: ["admin@example.com"],
      legacyNames: ["Admin User"],
    },
    {
      name: "Daniel Reyes",
      email: "daniel.reyes@leadflowcrm.com",
      password: "LeadFlow2026",
      legacyEmails: ["opsadmin@example.com"],
      legacyNames: ["Sarah Johnson"],
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
      await Lead.updateMany(
        {
          assignedSalesperson: {
            $in: [...(seedUser.legacyNames || []), seedUser.name],
          },
        },
        {
          $set: { assignedSalesperson: seedUser.name },
        }
      );
      console.log(`Seeded user updated: ${seedUser.email}`);
      continue;
    }

    await User.create({
      name: seedUser.name,
      email: seedUser.email,
      password: hashedPassword,
    });
    await Lead.updateMany(
      {
        assignedSalesperson: {
          $in: seedUser.legacyNames || [],
        },
      },
      {
        $set: { assignedSalesperson: seedUser.name },
      }
    );

    console.log(`Seeded user created: ${seedUser.email}`);
  }
};

export default seedDefaultUser;
