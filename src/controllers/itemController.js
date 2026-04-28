import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../services/itemService.js';

export async function getAllItemsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let items = await getAllItems(options);
  res.status(200).json(items);
}

export async function getItemByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const item = await getItemById(id);
  res.status(200).json(item);
}

export async function createItemHandler(req, res) {
  const { name, price } = req.body;
  const newItem = await createItem({ name, price });
  res.status(201).json(newItem);
}

export async function updateItemHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const udpatedItem = await updateItem(id, { name, price });
  res.status(200).json(udpatedItem);
}

export async function deleteItemHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteItem(id);
  res.status(204).send();
}
