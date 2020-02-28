const districts = require('express').Router();
const db = require('../../utils/db');

districts.get('/', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members')
    .distinct('roles.district');
  res.status(200).json({ data });
});

districts.get('/:district', async (req, res) => {
  const data = await db.db('scouts')
    .collection('members')
    .aggregate([
      {
        $match: {
          'roles.district': req.params.district,
        },
      },
    ])
    .toArray();
  res.status(200).json({ data });
});

module.exports = districts;
