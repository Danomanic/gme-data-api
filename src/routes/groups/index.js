const groups = require('express').Router();
const db = require('../../utils/db');

groups.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members')
    .distinct('roles.group');
  res.status(200).json({ data });
});

groups.get('/:group', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members').aggregate([
      {
        $match: {
          'roles.group': req.params.group,
        },
      },
    ])
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

module.exports = groups;
