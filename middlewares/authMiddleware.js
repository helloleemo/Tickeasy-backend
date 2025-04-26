const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "Tickeasy_SECRET";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: "failed", message: "請先登入" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("驗證失敗", error);
    res.status(401).json({ status: "failed", message: "請先登入" });
  }
};

module.exports = authMiddleware;
