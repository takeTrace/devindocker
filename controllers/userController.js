const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.session);
  if (!username, !password) return res.status(400).json({
    status: 'fail',
    message: 'need username and password',
  })
  const user = await userModel.findOne({username});
  if (!user) {
    return res.status(403).json({
      status: 'fail',
      message: 'either username or password wrong'
    })
  }
  console.log(password);
  console.log(user);
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(403).json({
      status: 'fail',
      message: 'either username or password wrong'
    })
  }

  req.session.user = user;
  res.status(200).json({
    status: 'success',
    data: user,
  });
}

exports.signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 12);
    const newUser = await userModel.create({
      username,
      password: hashPassword,
    });
    console.log(`create new user: ${newUser}`);
    console.log(req.session);
    req.session.user = newUser;
    res.status(201).json({
      status: 'success',
      data: newUser,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}
