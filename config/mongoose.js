const mongoose = require("mongoose");

module.exports.connectToMongoDB = async function connectToMongoDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://vaibhavkumar458:AkBWhjGXqncJ7HGg@cluster0.gnk98jn.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
