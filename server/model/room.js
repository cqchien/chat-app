const _ = require("lodash");

class Room {
  constructor() {
    this.users = [];
  }

  createUser({ id, name, room }) {
    const user = { id, name, room };
    this.users.push(user);
  }

  getUserById({ id }) {
    const userId = { id };
    // let user = this.users.filter((u) => u.id === userId)[0];
    //? Basic
    // const res = _.filter(this.users, user => user.id === userId)
    // const user = _.first(res)
    // return user;
    //? Higher
    return _.Chain(this.users)
      .filter((user) => user.id === userId)
      .first()
      .value();
  }

  removeUserById(id) {
    const user = this.getUserById(id);
    this.users = _.filter(this.users, (user) => user.id !== id);
    return user;
  }

  getUserByRoom(room) {
    return _.filter(this.users, (user) => user.room === room);
  }
}
module.exports = Room;
