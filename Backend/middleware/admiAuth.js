import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    // 👇 same style as authUser
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not Authorized, login Again",
    });
  }
};

export default adminAuth;
