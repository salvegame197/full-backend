import User from '../models/user';

class UserController {
  async show(req, res) {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(401).json({ error: 'Failed on Authenticate' });
    }

    return res.json({ user: user.show() });
  }
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  }
  async store(req, res) {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json({
      user: user.show(),
    });
  }
  async update(req, res) {
    const user = await User.findById(req.user);
    const { name, email, password } = req.body;
    if (!user) {
      res.status(401).json({ error: 'Failed on Authenticate' });
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    await user.save();

    return res.json({
      user: user.show(),
    });
  }

  async deleted(req, res) {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(401).json({ error: 'Failed on Authenticate' });
    }

    user.deleted = true;

    await user.save();

    return res.status(204).send();
  }
}

export default new UserController();
