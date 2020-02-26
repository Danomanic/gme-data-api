const modules = require('express').Router();
const db = require('../../utils/db');

modules.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('modules')
    .find({})
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

modules.get('/:id', async (req, res) => {
  const data = await db.db('scouts')
    .collection('modules')
    .find({ module_id: req.params.id })
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

module.exports = modules;
