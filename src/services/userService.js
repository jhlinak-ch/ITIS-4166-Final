import { findAllUsers, findUserById, getUserPosts, updateRole, updateUser, remove } from "../repositories/userRepo.js";

export async function getAllUsers() {
    return findAllUsers();
}

export async function getCurrentUser(id) {
    return findUserById(id);
}

export async function updateCurrentUser(id, updatedData) {
  const updatedUser = await updateUser(id, updatedData);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`User ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteUser(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`User ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function getAllUserPosts(id) {
    return getUserPosts(id);
}

export async function updateUserRole(id, updatedRole) {
  const updateduser = await updateRole(id, updatedRole);
  if (updateduser) return updateduser;
  else {
    const error = new Error(`User ${id} not found`);
    error.status = 404;
    throw error;
  }
}