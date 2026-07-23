import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

};

// ======================
// Register
// ======================

export const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    });

    return res.status(201).json({

      success: true,

      message: "Account created successfully",

      token: generateToken(user._id),

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

      },

    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};

// ======================
// Login
// ======================

export const login = async (req, res) => {

  try {

    const {

      email,

      password,

    } = req.body;

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message: "Email and password are required",

      });

    }

    const user = await User.findOne({

      email,

    });

    if (!user) {

      return res.status(401).json({

        success: false,

        message: "Invalid email or password",

      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message: "Invalid email or password",

      });

    }

    return res.json({

      success: true,

      message: "Login successful",

      token: generateToken(user._id),

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

      },

    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};