-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "itens" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
