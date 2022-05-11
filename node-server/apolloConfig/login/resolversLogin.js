const { loginUser } = require("../../query/userQuery");
const resolversLogin = {
  Query: {
    login: async (parent, args) => await loginUser(args),
  },
};
module.exports = resolversLogin;
