import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const orders = await prisma.order.findMany({
    where: { orderDate: { gte: today, lt: tomorrow } },
    include: {
      customer: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const formattedOrders = orders.map((order) => ({
    orderId: order.id,
    userId: order.userId,
    customerName: order.customer.name,
    customerMobile: order.customer.phone,
    totalPrice: order.totalPrice,
    orderDate: order.orderDate,
    products: order.orderItems.map((item) => item.product.name).join(", "),
  }));

  res.json(formattedOrders);
};

export const postUser = async (req, res) => {};
export const updateUser = async (req, res) => {};
export const deletUser = async (req, res) => {};
