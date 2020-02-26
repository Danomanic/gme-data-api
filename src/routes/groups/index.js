const groups = require('express').Router();
const db = require('../../utils/db');

groups.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('roles')
    .distinct('group');
  res.status(200).json({ data });
});

groups.get('/:group', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members').aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'member_id',
          foreignField: 'member_id',
          as: 'roles',
        },
      }, {
        $match: {
          'roles.group': {
            $eq: req.params.group,
          },
        },
      }, {
        $lookup: {
          from: 'modules',
          localField: 'roles.role_id',
          foreignField: 'role_id',
          as: 'modules',
        },
      },
    ])
    .project({ _id: 0 })
    .toArray();
  res.status(200).json({ data });
});

module.exports = groups;
