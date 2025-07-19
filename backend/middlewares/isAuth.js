// ✅ BACKEND: middlewares/isAuth.js
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "User does not have a token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    console.log("✅ Logged-in user:", req.userId);  // Add this for debugging
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
 export default isAuth
