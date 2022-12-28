const { Account } = require("../models/accountModel");
const bcrypt = require("bcryptjs");

exports.verifyLogin = async (req, res) => {
  try {
    const account = await Account.findOne({
      username: req.body.username,
    }).exec();

    if (account) {
      bcrypt.compare(req.body.password, account.password, (err, result) => {
        if (result) {
          res.json({
            status: "sukses",
            message:
              "Akun dengan username dan password tersebut ada di database.",
            data: account
          });
        } else {
          res.json({
            status: "gagal",
            message: "Username atau password salah!",
          });
        }
      });
    } else {
      res.json({
        status: "gagal",
        message: "Username atau password salah!",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addAccount = async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    const account = new Account({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    try {
      await account.save();
      res.json({
        status: "sukses",
        message: "Account created",
        data: account,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
};
