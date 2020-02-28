const modules = require('express').Router();
const db = require('../../utils/db');

modules.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members')
    .distinct('roles.modules.name');
  res.status(200).json({ data });
});

module.exports = modules;
