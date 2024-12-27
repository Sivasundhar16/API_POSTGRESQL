import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const orderToday = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error fetching today's orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
};
