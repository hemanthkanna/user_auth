const { Op } = require("sequelize");
const User = require("../model/user.model");
const passport = require("passport");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      //   description: req.body.description,
      //   mobileNumber: req.body.mobileNumber,
      //   age: req.body.age,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: "Authentication Failed",
        user,
        err,
      });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      // Set cookies with expiration date upon successful authentication
      const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        httpOnly: true, // Cookie cannot be accessed via client-side JavaScript
      };
      res.cookie("userId", user.userId, cookieOptions);
      res.cookie("userName", user.userName, cookieOptions);

      return res.status(200).json({ message: "LogIn Successfull", user });
    });
  })(req, res, next);
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["userId", "userName", "email"],
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(200).json({
          message: err.message,
          stack: err.stack,
        });
      }
    });

    // Remove cookies upon logout
    res.clearCookie("userId");
    res.clearCookie("userName");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during logout", error: error.message });
  }
};

// exports.getSingleUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findByPk(userId);

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.update(req.body, {
      where: { userId: userId },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: `Cannot update user with userId ${userId}. Maybe user not found`,
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    await user.destroy(userId);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// find user based on condition
// exports.findOneUser = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         age: {
//           [Op.or]: [24, { [Op.eq]: null }],
//         },
//       },
//     });

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };

// //
// exports.findOrCreateUser = async (req, res) => {
//   try {
//     const user = await User.findOrCreate({ where: { userName: "anbu" } });

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };

// exports.findAndCountUser = async (req, res) => {
//   try {
//     const user = await User.findAndCountAll({
//       where: { userName: "raj" },
//     });

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// exports.restoreUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.restore({
//       where: {
//         userId: userId,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };
