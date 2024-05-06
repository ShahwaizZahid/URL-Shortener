const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies.user;

  if (userUid) {
    const user = getUser(userUid);

    if (user) {
      req.user = user;
      next();
    } else {
      console.log("Session not found", user);

      return res.status(401).json({ message: "Session not found" });
    }
  } else {
    return res.status(401).json({ user: null });
  }
}

module.exports = { restrictToLoggedinUserOnly };
