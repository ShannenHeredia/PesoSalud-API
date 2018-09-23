const { db } = require('../db');

class UserCtrl {
  constructor() {
    // User data temporary hardcoded
    this.users = [
      {
        id: 1,
        name: 'felipe',
      },
      {
        id: 2,
        name: 'eduardo',
      },
      {
        id: 3,
        name: 'juan',
      },
    ];

    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  getAll(req, res) {
    return res.status(200).send({
      data: this.users,
    });
  }

  get(req, res) {
    const data = this.data.find(el => el.id === Number(req.params.userId));
    res.status(200).send(data);
  }

  create(req, res) {
    const lastId = this.data[this.data.length - 1].id;
    const data = {
      id: lastId + 1,
      name: req.body.name,
      email: req.body.email,
    };

    this.data.push(data);

    res.status(201).send(data);
  }

  edit(req, res) {
    const data = { message: 'item-updated' };
    res.status(201).send(data);
  }
}
module.exports = new UsersCtrl();
