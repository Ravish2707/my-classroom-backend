const userService = require("../services/user-service");
const passwordService = require("../services/password-service");
const tokenService = require("../services/token-service");

class AuthController {
  createAccount = async (req, res) => {
    try {
      const { name, password, role } = req.body;

      if (!name || !password || !role) {
        res.status(400).json({ message: "Please fill the details" });
      }

      let user = await userService.findUser({ name });

      if (user) {
        return res
          .status(400)
          .json({ message: "User Name already exists" });
      }

      const hashedPassword = await passwordService.hashPassword(password);

      user = await userService.createUser(
        name,
        hashedPassword,
        role,
      );

      console.log(user);
      const accessToken = await tokenService.createToken({
        id: user._id,
        role,
      });

      res.status(201).json({
        message: "Account created successfully",
        accessToken,
        id: user._id,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  };

  login = async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.status(400).json({ message: "Please fill the details" });
      }

      const user = await userService.findUser({ name });
      if (!user) {
        return res.status(400).json({ message: "User Doesn't exist" });
      }

      const isPasswordCorrect = await passwordService.verifyPassword(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      const accessToken = await tokenService.createToken({
        id: user._id,
        role: user.role
      });
      res
        .status(200)
        .json({ message: "Login successful", accessToken, id: user._id });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  };
}

module.exports = new AuthController();
