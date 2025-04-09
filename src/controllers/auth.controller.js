import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export async function cadastro(req, res) {
  const { email, password } = req.body;

  try {
    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) return res.status(409).send("E-mail já cadastrado.");

    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, password: hash } });

    res.status(201).send("Usuário criado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).send("Usuário não encontrado.");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send("Senha incorreta.");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token, email: user.email });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
