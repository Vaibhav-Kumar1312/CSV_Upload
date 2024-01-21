const dotenv = require("dotenv");
dotenv.config();
const app = require("./index.js");
const db = require("./config/mongoose.js");
const port = process.env.PORT || 3000;

db.connectToMongoDB();
app.listen(port, (err) => {
  console.log(`App is running on ${port}`);
});
