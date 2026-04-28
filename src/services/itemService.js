import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/itemRepo.js';

export async function getAllItems(options) {
  return getAll(options);
}

export async function getItemById(id) {
  const item = await getById(id);
  if (item) return item;
  else {
    const error = new Error(`Item ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createItem(itemData) {
  return create(itemData);
}

export async function updateItem(id, updatedData) {
  const updatedItem = await update(id, updatedData);
  if (updatedItem) return updatedItem;
  else {
    const error = new Error(`Item ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteItem(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Item ${id} not found`);
    error.status = 404;
    throw error;
  }
}
