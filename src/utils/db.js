
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });

client.connect(async (err) => {
  if (err) { process.exit(0); }
});

module.exports = client;
