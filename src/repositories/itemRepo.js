import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } }
    ];
  }
  const items = await prisma.item.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return items;
}

export async function getById(id) {
  const item = await prisma.item.findUnique({ where: { id } });
  return item;
}

export function create(itemData) {
  const newItem = prisma.item.create({ data: itemData });
  return newItem;
}

export async function update(id, updatedData) {
  try {
    const updatedItem = await prisma.item.update({
      where: { id },
      data: updatedData,
    });
    return updatedItem;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedItem = await prisma.item.delete({
      where: { id },
    });
    return deletedItem;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
