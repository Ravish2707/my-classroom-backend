const User = require("../model/User");

class UserService {
  findUser = async (filter) => {
    return await User.findOne(filter);
  };
  findUserById = async (userId) => {
    return await User.findById({ _id: userId});
  };
  createUser = async (name, password, role) => {
    return await User.create({ name, password, role })
  }; 
}

module.exports = new UserService();
