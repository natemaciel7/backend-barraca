import prisma from "../config/db.js";

export async function criarPedido(req, res) {
  const userId = res.locals.userId;
  const { cliente, email, itens, total } = req.body;

  if (!cliente || !email || !itens || !total) {
    return res.status(400).send("Dados incompletos.");
  }

  try {
    await prisma.order.create({
      data: {
        cliente,
        email,
        itens: JSON.stringify(itens),
        total,
      },
    });

    res.status(201).send("Pedido criado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function listarPedidos(req, res) {
  try {
    const pedidos = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.send(pedidos);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
