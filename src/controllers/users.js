const User = require("../models/User");
const Task = require("../models/Task");

module.exports = {
  // GET /users — получить всех пользователей
  getAllUsers(req, res) {
    res.json(User.getAll());
  },

  // GET /users/:id — получить пользователя по ID
  getUserById(req, res) {
    const id = Number(req.params.id);
    const user = User.getById(id);
    if (!user) {
      return res.status(404).json({ error: `Пользователь с ID ${id} не найден` });
    }
    res.json(user);
  },

  // POST /users — создать нового пользователя
  createUser(req, res) {
    const { fullName, job, age, city } = req.body;
    if (!fullName || !job || age === undefined || !city) {
      return res.status(400).json({ error: "Все поля (fullName, job, age, city) обязательны" });
    }
    const newUser = User.create({ fullName, job, age, city });
    res.status(201).json(newUser);
  },

  // PUT /users/:id — обновить данные пользователя
  updateUser(req, res) {
    const id = Number(req.params.id);
    const updatedUser = User.update(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: `Пользователь с ID ${id} не найден` });
    }
    res.json(updatedUser);
  },

  // DELETE /users/:id — удалить пользователя и его задачи (каскадное удаление)
  deleteUser(req, res) {
    const id = Number(req.params.id);
    const user = User.getById(id);
    if (!user) {
      return res.status(404).json({ error: `Пользователь с ID ${id} не найден` });
    }
    // Каскадное удаление: сначала удаляем задачи пользователя
    Task.deleteAllByUserId(id);
    // Затем удаляем пользователя
    User.delete(id);
    res.status(204).send();
  },
};
