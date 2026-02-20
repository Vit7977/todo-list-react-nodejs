import jwt from "jsonwebtoken";
import "dotenv/config";

const authToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    const parts = authHeader.split(" ");

    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.sendStatus(401);
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Erro na autenticação",
      error: error.message,
    });
  }
};

export default authToken;
