import jwt from "jsonwebtoken";

export default function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).send("Token não enviado.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).send("Token inválido.");
  }
}
