const districts = require('express').Router();
const db = require('../../utils/db');

districts.get('/', async (req, res) => {
  const data = await db.db('scouts').collection('roles').distinct('district');
  res.status(200).json({ data });
});

districts.get('/:district', async (req, res) => {
  const data = await db.db('scouts').collection('members').aggregate([
    {
      $lookup: {
        from: 'roles',
        localField: 'member_id',
        foreignField: 'member_id',
        as: 'roles',
      },
    }, {
      $match: {
        'roles.district': {
          $eq: req.params.district,
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
  ]).toArray();
  res.status(200).json({ data });
});

module.exports = districts;
