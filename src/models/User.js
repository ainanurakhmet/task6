let users = require("../../data/usersData");

let lastId = users.length ? Math.max(...users.map(user => user.id)) : 0;

module.exports = {
  // Возвращает всех пользователей
  getAll() {
    return users;
  },

  // Возвращает пользователя по ID
  getById(id) {
    return users.find(user => user.id === id) || null;
  },

  // Создает нового пользователя
  create(userData) {
    const newUser = {
      id: ++lastId,
      fullName: userData.fullName,
      job: userData.job,
      age: userData.age,
      city: userData.city,
    };
    users.push(newUser);
    return newUser;
  },

  // Обновляет данные пользователя по ID
  update(id, updateData) {
    const user = this.getById(id);
    if (!user) return null;
    if (updateData.fullName !== undefined) user.fullName = updateData.fullName;
    if (updateData.job !== undefined) user.job = updateData.job;
    if (updateData.age !== undefined) user.age = updateData.age;
    if (updateData.city !== undefined) user.city = updateData.city;
    return user;
  },

  // Удаляет пользователя по ID
  delete(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
};
