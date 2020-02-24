require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true });

const main = (async () => {
  client.connect(async (err) => {
    if (err) { process.exit(0); }

    const members = await client.db('scouts').collection('members').aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'id',
          foreignField: 'member_id',
          as: 'roles',
        },
      }, {
        $match: {
          'roles.group': {
            $eq: '1st Haughton Green',
          },
        },
      }, {
        $lookup: {
          from: 'modules',
          localField: 'roles.role_id',
          foreignField: 'role_id',
          as: 'modules',
        },
      }, {
        $match: {
          'modules.name': {
            $eq: 'Tools for the Role (Section Leaders)',
          },
        },
      },
    ]).toArray();

    console.log(members);


    await client.close();
  });
});

main();
