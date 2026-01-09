import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ success: false, message: "Token not available" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  THIS IS THE KEY LINE
    req.userId = decoded.id;
    

    
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
