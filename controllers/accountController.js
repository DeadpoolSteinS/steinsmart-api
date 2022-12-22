const { Account } = require("../models/accountModel");

exports.verifyLogin = async (req, res) => {
  try {
    const account = await Account.findOne({
      username: req.body.username,
      password: req.body.password,
    }).exec();

    if (account) {
      res.json({
        status: "sukses",
        message: "Akun dengan username dan password tersebut ada di database.",
      });
    } else {
      res.json({
        status: "gagal",
        message:
          "Akun dengan username dan password tersebut tidak ada di database.",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addAccount = async (req, res) => {
  const account = new Account({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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
};
