import { deleteUser, getAllUsers, getCurrentUser, updateCurrentUser, updateUserRole, getAllUserPosts } from "../services/userService.js";

export async function getAllUsersHandler(req, res) {
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getCurrentUserHandler(req, res) {
    const user = await getCurrentUser(req.user.id);
    // res.status(200).json({ "id": user.id, "email": user.email, "role": user.role });
    res.status(200).json(user);
}

export async function updateCurrentUserHandler(req, res) {
  const id = parseInt(req.user.id);
  const { email, password } = req.body;
  const updatedUser = await updateCurrentUser(id, { email, password });
  res.status(200).json(updatedUser);
}

export async function deleteCurrentUserHandler(req, res) {
  const id = parseInt(req.user.id);
  await deleteUser(id);
  res.status(204).send();
}

export async function getAllUserPostsHandler(req, res) {
  let posts = await getAllUserPosts(req.user.id);
  res.status(200).json(posts);
}

export async function updateUserRoleHandler(req, res) {
  const id = parseInt(req.params.id);
  const role = req.body.role;
  const updatedUser = await updateUserRole(id, role);
  res.status(200).json(updatedUser);
}