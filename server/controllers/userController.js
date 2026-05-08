import User from "../models/User.js";

const getSalespeople = async (req, res) => {
  try {
    const users = await User.find().select("name email").sort({ name: 1 });

    return res.status(200).json(
      users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      }))
    );
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch salespeople.",
      error: error.message,
    });
  }
};

export { getSalespeople };
