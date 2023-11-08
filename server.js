// TO-DO = make environment variable file

const app = require("./index.js");
const db = require("./config/mongoose.js");
const port = 3000;

db.connectToMongoDB();
app.listen(port, (err) => {
  console.log(`App is running on ${port}`);
});
