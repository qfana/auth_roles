const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");

class authConroller {

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error with registration", errors });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: "You alredy registred" });
      };

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "user" });
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });

      await user.save();
      return res.json({ massage: "Successfully registered!" });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: "Login or password" });
      };


    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      const userRole = new Role();
      const adminRole = new Role({ value: "admin" });

      await userRole.save();
      await adminRole.save();

      res.json("server work");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authConroller;