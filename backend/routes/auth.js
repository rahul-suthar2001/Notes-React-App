const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "squidGameNetflix";
// sign up route
router.post(
  "/signup",
  body("email", "Enter valid email").isEmail(),
  body("name", "name length should be greater than 5 chaeracters").isLength({
    min: 5,
  }),
  body("password", "password length is greater than 5").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let sucess = false;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({sucess,error:"User already exist"});
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({sucess,authtoken});
    } catch (error) {
      console.log(error.message);
      sucess = false
      return res.status(400).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  body("email", "enter valid email").isEmail(),
  body("password", "password length is greater than 5").isLength({ min: 5 }),
  async (req, res) => {
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({sucess, error: "Wrong creditals" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({sucess, error: "Wrong creditals" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      //  console.log("logged in");
      sucess= true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({sucess,authtoken});
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    return res.json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
