import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMid = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user
      next();
    } else {
      return res.status(401).json({ message: "invalid token" });
    }
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "invalid token" });
  }
};

export default authMid;
