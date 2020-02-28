const roles = require('express').Router();
const db = require('../../utils/db');

roles.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members')
    .distinct('roles.name');
  res.status(200).json({ data });
});

module.exports = roles;
