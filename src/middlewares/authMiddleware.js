import jwt from "jsonwebtoken";

// Middleware verify auth
export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers || {};
  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
    // throw new Error("No token provided");
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
    // throw new Error("Invalid token");
  }
};
