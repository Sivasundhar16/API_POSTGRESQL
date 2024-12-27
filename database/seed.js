import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: "John Doe",
      phone: "1234567890",
      email: "john@example.com",
      address: "123 Main St",
    },
  });
  const customer2 = await prisma.customer.create({
    data: {
      name: "Jane Smith",
      phone: "0987654321",
      email: "jane@example.com",
      address: "456 Elm St",
    },
  });
  const customer3 = await prisma.customer.create({
    data: {
      name: "Alice Johnson",
      phone: "1122334455",
      email: "alice@example.com",
      address: "789 Oak Ave",
    },
  });

  // Products
  const product1 = await prisma.product.create({
    data: { name: "Laptop", price: 999.99 },
  });
  const product2 = await prisma.product.create({
    data: { name: "Smartphone", price: 599.99 },
  });
  const product3 = await prisma.product.create({
    data: { name: "Headphones", price: 149.99 },
  });
  const product4 = await prisma.product.create({
    data: { name: "Keyboard", price: 79.99 },
  });
  const product5 = await prisma.product.create({
    data: { name: "Mouse", price: 39.99 },
  });

  // Orders
  // Note: You'll need to handle the logic for totalPrice and orderDate according to your business logic
  for (let i = 0; i < 10; i++) {
    const order = await prisma.order.create({
      data: {
        userId: Math.floor(Math.random() * 3) + 1, // Random customer ID
        orderDate: new Date(),
        totalPrice: 0, // This should be calculated based on items
        orderItems: {
          create: [
            { productId: Math.floor(Math.random() * 5) + 1, quantity: 1 },
            { productId: Math.floor(Math.random() * 5) + 1, quantity: 1 },
          ],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
