let tasks = require("../../data/tasksData");
let lastId = tasks.length ? Math.max(...tasks.map(t => t.id)) : 0;

module.exports = {
  getAll() {
    return tasks;
  },

  getById(id) {
    return tasks.find(task => task.id === id) || null;
  },

  create(data) {
    const newTask = {
      id: ++lastId,
      completed: data.completed || false,
      title: data.title,
      // Если создаёте задачу для пользователя, передавайте userId через data.authorId или data.userId
      authorId: data.authorId || null,
    };
    tasks.push(newTask);
    return newTask;
  },

  update(id, updates) {
    const task = this.getById(id);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
  },

  delete(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    return tasks.length !== initialLength;
  },

  // Метод для удаления всех задач, принадлежащих пользователю с заданным ID
  deleteAllByUserId(userId) {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.authorId !== userId);
    return tasks.length !== initialLength;
  },
};
