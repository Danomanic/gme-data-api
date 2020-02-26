const roles = require('express').Router();
const db = require('../../utils/db');

roles.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('roles')
    .find(req.query)
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

roles.get('/:id', async (req, res) => {
  const data = await db.db('scouts')
    .collection('roles')
    .find({ role_id: req.params.id })
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

module.exports = roles;
