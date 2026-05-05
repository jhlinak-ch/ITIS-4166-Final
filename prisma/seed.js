import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

try {
  await prisma.$queryRaw`TRUNCATE items, users, orders, order_items, reviews RESTART IDENTITY CASCADE;`;

  const usersData = [
    { email: 'user@test.com', password: 'test1234' },
    { email: 'admin@test.com', password: 'test1234', role: 'ADMIN' },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });
    users.push(user);
  }

  const itemsData = [
    { name: "Television", price: 500 },
    { name: "Desk", price: 100 },
    { name: "Chair", price: 75},
    { name: "Laptop", price: 800}
  ]
  await prisma.item.createMany({ data: itemsData });

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}
