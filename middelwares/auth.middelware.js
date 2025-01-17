import jwt from "jsonwebtoken";
import User from "../Models/users.models.js";

let auth = async (req, res, next) => {
  let token = req.cookies?.Token;

  try {
    if (!token) {
      return res
        .status(401)
        .send({ result: false, message: "User not authenticated " });
    } else {
      let { id } = jwt.verify(token, process.env.PRIVATE_KEY);
      let user = await User.findById(id);
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(400).send({ result: false, message: err.message });
  }
};

export default auth;
