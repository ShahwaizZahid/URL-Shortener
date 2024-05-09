const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser, deleteUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    res.json({ message: "Successfully signed up" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "An error occurred while signing up" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email, password });

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const sessionId = uuidv4();

    setUser(sessionId, foundUser);

    res.cookie("user", sessionId, {
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "Successfully logged in", user: foundUser });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
}

async function handleUser(req, res) {
  try {
    res.json(getUser(req.cookies.user));
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
}

async function handleUserLogout(req, res) {
  try {
    const sessionId = req.cookies.user;
    deleteUser(sessionId);

    res.clearCookie("user", {
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging out" });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
  handleUser,
};
