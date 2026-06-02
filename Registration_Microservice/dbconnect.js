const mongoose = require('mongoose');

const uri = "mongodb+srv://narak_03:narak_04@cluster0.bvoeh7h.mongodb.net/aupp?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // commented out so connection stays open
    //await mongoose.disconnect();
  }
}
run().catch(console.dir);

module.exports = mongoose;
