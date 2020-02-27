const members = require('express').Router();
const db = require('../../utils/db');

members.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members')
    .find(req.query)
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

members.get('/:id', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members')
    .find({ member_id: req.params.id })
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

module.exports = members;
