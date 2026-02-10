import Blog from "../Schemas/blog.mjs";
import User from "../Schemas/register.mjs";

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.session.user;

    const user = await User.findOne({ username }).select("username email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const blogCount = await Blog.countDocuments({ author: username });

    res.json({
      user,
      blogCount
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};
